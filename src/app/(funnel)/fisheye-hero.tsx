"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/** Full-bleed hero image rendered through a WebGL barrel ("fisheye") lens.
 *  The bulge center and a small parallax offset chase the pointer with easing,
 *  so the photo subtly swims as the mouse moves. On top of that, an imperative
 *  `setZoom` handle drives a scroll-linked "camera push" (scale 1 → ~1.55
 *  around a fixed near-top anchor) for the pinned zoom-to-mission scene — kept
 *  off React state so a 60fps scroll-scrub callback never triggers a
 *  re-render. An optional `overlaySrc` (a transparent-PNG cutout) layers on
 *  top outside the lens. Falls back to a plain cover-fit <img> when WebGL is
 *  unavailable, and renders a single static frame under reduced motion. */

export interface FisheyeHeroHandle {
  setZoom: (zoom: number) => void;
}

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_img;
uniform vec2 u_mouse;
uniform float u_bulge;
uniform float u_zoom;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  // Gaussian lens around a center that drifts gently toward the pointer.
  // f < 1 near the center pulls samples inward — magnifying the middle like a
  // fisheye — and decays to 1 at the edges, so samples never leave the texture.
  vec2 c = vec2(0.5) + u_mouse * vec2(0.045, 0.035);
  vec2 d = uv - c;
  vec2 da = d * vec2(u_res.x / u_res.y, 1.0);
  float r = length(da);
  uv = c + d * (1.0 - u_bulge * exp(-r * r * 2.0));

  // Overscan for the parallax slide.
  uv = (uv - 0.5) / 1.08 + 0.5;
  uv += u_mouse * vec2(-0.022, -0.016);

  // Scroll-driven camera push: zooms in around a fixed point near the top of
  // frame, so distant scenery leaves first and the subject fills the screen.
  vec2 origin = vec2(0.5, 0.86);
  uv = origin + (uv - origin) / u_zoom;

  // background-size: cover
  float ca = u_res.x / u_res.y;
  float ia = u_img.x / u_img.y;
  vec2 s = (ca > ia) ? vec2(1.0, ia / ca) : vec2(ca / ia, 1.0);
  vec2 tuv = (uv - 0.5) * s + 0.5;

  gl_FragColor = texture2D(u_tex, vec2(tuv.x, 1.0 - tuv.y));
}`;

export const FisheyeHero = forwardRef<FisheyeHeroHandle, { src: string; alt: string; overlaySrc?: string }>(
  function FisheyeHero({ src, alt, overlaySrc }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLImageElement>(null);
    const zoomRef = useRef(1);
    const drawRef = useRef<(() => void) | null>(null);
    const [fallback, setFallback] = useState(false);

    useImperativeHandle(ref, () => ({
      setZoom: (z: number) => {
        zoomRef.current = z;
        drawRef.current?.();
      },
    }), []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const gl = canvas.getContext("webgl", { antialias: false });
      if (!gl) {
        setFallback(true);
        return;
      }

      const compile = (type: number, source: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, source);
        gl.compileShader(sh);
        return sh;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        setFallback(true);
        return;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(prog, "a_pos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(prog, "u_res");
      const uImg = gl.getUniformLocation(prog, "u_img");
      const uMouse = gl.getUniformLocation(prog, "u_mouse");
      const uBulge = gl.getUniformLocation(prog, "u_bulge");
      const uZoom = gl.getUniformLocation(prog, "u_zoom");
      gl.uniform1f(uBulge, 0.22);
      gl.uniform1f(uZoom, 1);

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let ready = false;
      let raf = 0;
      const target = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(canvas.clientWidth * dpr);
        const h = Math.round(canvas.clientHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
        gl.uniform2f(uRes, w, h);
      };

      const draw = () => {
        resize();
        gl.uniform2f(uMouse, eased.x, eased.y);
        gl.uniform1f(uZoom, zoomRef.current);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      drawRef.current = draw;

      const loop = () => {
        eased.x += (target.x - eased.x) * 0.055;
        eased.y += (target.y - eased.y) * 0.055;
        draw();
        // The cutout drifts a touch against the background, deepening the parallax.
        // Base scale/offset here must mirror the .sf-overlay CSS default (the
        // frame shown before this loop's first tick, and under reduced motion).
        const overlay = overlayRef.current;
        if (overlay) {
          overlay.style.transform = `scale(1.18) translate3d(${eased.x * -9}px, ${240 + eased.y * -6}px, 0)`;
        }
        raf = requestAnimationFrame(loop);
      };

      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = (e.clientY / window.innerHeight) * 2 - 1;
      };

      const img = new Image();
      img.src = src;
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform2f(uImg, img.naturalWidth, img.naturalHeight);
        ready = true;
        if (reduced) {
          draw();
        } else {
          window.addEventListener("pointermove", onMove);
          loop();
        }
      };
      img.onerror = () => setFallback(true);

      const ro = new ResizeObserver(() => {
        if (ready && reduced) draw();
      });
      ro.observe(canvas);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
        drawRef.current = null;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }, [src]);

    /* eslint-disable @next/next/no-img-element */
    return (
      <>
        {fallback ? (
          <img src={src} alt={alt} className="sf-canvas" style={{ objectFit: "cover" }} />
        ) : (
          <canvas ref={canvasRef} className="sf-canvas" aria-label={alt} role="img" />
        )}
        {overlaySrc && (
          <img src={overlaySrc} alt="" aria-hidden ref={overlayRef} className="sf-canvas sf-overlay" />
        )}
      </>
    );
    /* eslint-enable @next/next/no-img-element */
  }
);

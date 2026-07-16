import { Compass } from "lucide-react";

export function Brand({ size = "md" }: { size?: "md" | "lg" }) {
  const px = size === "lg" ? 34 : 28;
  const fs = size === "lg" ? 19 : 16;
  return (
    <div className="brand" style={{ fontSize: fs }}>
      <span
        className="brand-mark"
        style={{ width: px, height: px, borderRadius: px * 0.29 }}
      >
        <Compass size={px * 0.62} strokeWidth={2.2} />
      </span>
      <span>Waypoint</span>
    </div>
  );
}

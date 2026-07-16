/* @ds-bundle: {"format":3,"namespace":"ObraShadcnUiDesignSystem_acd6ac","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"ButtonGroup","sourcePath":"components/buttons/ButtonGroup.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"LinkButton","sourcePath":"components/buttons/LinkButton.jsx"},{"name":"LoadingButton","sourcePath":"components/buttons/LoadingButton.jsx"},{"name":"Toggle","sourcePath":"components/buttons/Toggle.jsx"},{"name":"AspectRatio","sourcePath":"components/data-display/AspectRatio.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"CardHeader","sourcePath":"components/data-display/Card.jsx"},{"name":"CardTitle","sourcePath":"components/data-display/Card.jsx"},{"name":"CardDescription","sourcePath":"components/data-display/Card.jsx"},{"name":"CardContent","sourcePath":"components/data-display/Card.jsx"},{"name":"CardFooter","sourcePath":"components/data-display/Card.jsx"},{"name":"Empty","sourcePath":"components/data-display/Empty.jsx"},{"name":"Kbd","sourcePath":"components/data-display/Kbd.jsx"},{"name":"Progress","sourcePath":"components/data-display/Progress.jsx"},{"name":"Separator","sourcePath":"components/data-display/Separator.jsx"},{"name":"Skeleton","sourcePath":"components/data-display/Skeleton.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"TableHeader","sourcePath":"components/data/Table.jsx"},{"name":"TableBody","sourcePath":"components/data/Table.jsx"},{"name":"TableFooter","sourcePath":"components/data/Table.jsx"},{"name":"TableRow","sourcePath":"components/data/Table.jsx"},{"name":"TableHead","sourcePath":"components/data/Table.jsx"},{"name":"TableCell","sourcePath":"components/data/Table.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Toaster","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Field","sourcePath":"components/inputs/Field.jsx"},{"name":"Input","sourcePath":"components/inputs/Input.jsx"},{"name":"InputOTP","sourcePath":"components/inputs/InputOTP.jsx"},{"name":"Label","sourcePath":"components/inputs/Label.jsx"},{"name":"Textarea","sourcePath":"components/inputs/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"NavigationMenu","sourcePath":"components/navigation/NavigationMenu.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Command","sourcePath":"components/overlays/Command.jsx"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"AlertDialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Popover","sourcePath":"components/overlays/Popover.jsx"},{"name":"HoverCard","sourcePath":"components/overlays/Popover.jsx"},{"name":"Sheet","sourcePath":"components/overlays/Sheet.jsx"},{"name":"Drawer","sourcePath":"components/overlays/Sheet.jsx"},{"name":"Checkbox","sourcePath":"components/selection/Checkbox.jsx"},{"name":"RadioGroup","sourcePath":"components/selection/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/selection/Select.jsx"},{"name":"Slider","sourcePath":"components/selection/Slider.jsx"},{"name":"Switch","sourcePath":"components/selection/Switch.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"60ac83b40a11","components/buttons/ButtonGroup.jsx":"18d9c0c093be","components/buttons/IconButton.jsx":"ca52f9f4e8e1","components/buttons/LinkButton.jsx":"a9e0d3c002fc","components/buttons/LoadingButton.jsx":"25e48bfabe0d","components/buttons/Toggle.jsx":"cfd93e2d6018","components/data-display/AspectRatio.jsx":"28b847fadd4b","components/data-display/Avatar.jsx":"eec5c293ac7e","components/data-display/Badge.jsx":"709240c9e496","components/data-display/Card.jsx":"ad41c0508f79","components/data-display/Empty.jsx":"4d611a0c069f","components/data-display/Kbd.jsx":"52f274a85574","components/data-display/Progress.jsx":"35d592f0569a","components/data-display/Separator.jsx":"99c4cc629644","components/data-display/Skeleton.jsx":"b0189a747040","components/data/Table.jsx":"1d6c99fa1596","components/feedback/Alert.jsx":"43bac5cf7176","components/feedback/Spinner.jsx":"c92b3952adca","components/feedback/Toast.jsx":"12006a4dcae2","components/feedback/Tooltip.jsx":"0f438ff07c2a","components/inputs/Field.jsx":"719cdc609c81","components/inputs/Input.jsx":"c78632815777","components/inputs/InputOTP.jsx":"ea8ee1de4e9e","components/inputs/Label.jsx":"4b82ef50797a","components/inputs/Textarea.jsx":"48ff70a25a78","components/navigation/Accordion.jsx":"c5a77505537f","components/navigation/Breadcrumb.jsx":"ff13f75684c5","components/navigation/NavigationMenu.jsx":"38cf0349624f","components/navigation/Pagination.jsx":"0a70c57c62ee","components/navigation/Tabs.jsx":"fa440ef82053","components/overlays/Command.jsx":"f7fb2198ffc4","components/overlays/Dialog.jsx":"62498e251bd9","components/overlays/Popover.jsx":"07eb8cd312c0","components/overlays/Sheet.jsx":"d1e132fc32c1","components/selection/Checkbox.jsx":"bd2464b2f494","components/selection/RadioGroup.jsx":"a4725cce8183","components/selection/Select.jsx":"e63f25d55955","components/selection/Slider.jsx":"1605603c7556","components/selection/Switch.jsx":"eeddbe69cdad"},"inlinedExternals":[],"unexposedExports":[{"name":"injectButtonStyles","sourcePath":"components/buttons/Button.jsx"},{"name":"injectInputStyles","sourcePath":"components/inputs/Input.jsx"}]} */

(() => {

const __ds_ns = (window.ObraShadcnUiDesignSystem_acd6ac = window.ObraShadcnUiDesignSystem_acd6ac || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared button styling for the whole buttons group. Injected once.
   Exported so IconButton / LinkButton / LoadingButton reuse the same rules. */
const CSS = `
.ds-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--font-sans);font-weight:500;white-space:nowrap;
  border:1px solid transparent;cursor:pointer;user-select:none;
  transition:background-color .15s ease,color .15s ease,box-shadow .15s ease,border-color .15s ease,opacity .15s ease,filter .15s ease;
  outline:none;text-decoration:none;box-sizing:border-box;
}
.ds-btn:focus-visible{box-shadow:0 0 0 3px var(--ring);}
.ds-btn:disabled,.ds-btn[aria-disabled="true"]{opacity:.5;pointer-events:none;}
.ds-btn>svg{width:1em;height:1em;flex:none;}

.ds-btn--xs{height:28px;padding:0 10px;font-size:12px;border-radius:var(--radius-md);gap:6px;}
.ds-btn--sm{height:32px;padding:0 12px;font-size:14px;border-radius:var(--radius-md);}
.ds-btn--md{height:36px;padding:0 16px;font-size:14px;border-radius:var(--radius-lg);}
.ds-btn--lg{height:40px;padding:0 24px;font-size:16px;border-radius:var(--radius-lg);}
.ds-btn--full{border-radius:var(--radius-full)!important;}

.ds-ibtn--xs{width:28px;height:28px;padding:0;font-size:14px;border-radius:var(--radius-md);}
.ds-ibtn--sm{width:32px;height:32px;padding:0;font-size:16px;border-radius:var(--radius-md);}
.ds-ibtn--md{width:36px;height:36px;padding:0;font-size:16px;border-radius:var(--radius-lg);}
.ds-ibtn--lg{width:40px;height:40px;padding:0;font-size:18px;border-radius:var(--radius-lg);}

.ds-btn--primary{background:var(--primary);color:var(--primary-foreground);}
.ds-btn--primary:hover{background:var(--primary-hover);}
.ds-btn--secondary{background:var(--secondary);color:var(--secondary-foreground);border-color:var(--border);}
.ds-btn--secondary:hover{background:var(--secondary-hover);}
.ds-btn--destructive{background:var(--destructive);color:var(--destructive-foreground);}
.ds-btn--destructive:hover{filter:brightness(.92);}
.ds-btn--destructive:focus-visible{box-shadow:0 0 0 3px var(--ring-error);}
.ds-btn--outline{background:var(--background);color:var(--foreground);border-color:var(--border);}
.ds-btn--outline:hover{background:var(--ghost-hover);}
.ds-btn--ghost{background:transparent;color:var(--foreground);}
.ds-btn--ghost:hover{background:var(--ghost-hover);}
.ds-btn--link{background:transparent;color:var(--foreground);height:auto;padding:0;border:none;text-underline-offset:4px;}
.ds-btn--link:hover{text-decoration:underline;}

@keyframes ds-spin{to{transform:rotate(360deg);}}
.ds-btn-spinner{width:1em;height:1em;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;animation:ds-spin .6s linear infinite;flex:none;}
`;
let injected = false;
function injectButtonStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "buttons");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Button — the kit's primary action control.
 */
function Button({
  variant = "primary",
  size = "md",
  rounded = "default",
  type = "button",
  className = "",
  children,
  ...props
}) {
  injectButtonStyles();
  const cls = ["ds-btn", `ds-btn--${variant}`, `ds-btn--${size}`, rounded === "full" ? "ds-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { injectButtonStyles, Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/ButtonGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-btngroup{display:inline-flex;align-items:stretch;}
.ds-btngroup.ds-btngroup--v{flex-direction:column;}
.ds-btngroup>*{border-radius:0!important;margin-left:-1px;}
.ds-btngroup>*:first-child{margin-left:0;border-top-left-radius:var(--radius-lg)!important;border-bottom-left-radius:var(--radius-lg)!important;}
.ds-btngroup>*:last-child{border-top-right-radius:var(--radius-lg)!important;border-bottom-right-radius:var(--radius-lg)!important;}
.ds-btngroup.ds-btngroup--v>*{margin-left:0;margin-top:-1px;}
.ds-btngroup.ds-btngroup--v>*:first-child{margin-top:0;border-radius:var(--radius-lg) var(--radius-lg) 0 0!important;}
.ds-btngroup.ds-btngroup--v>*:last-child{border-radius:0 0 var(--radius-lg) var(--radius-lg)!important;}
.ds-btngroup>*:hover{z-index:1;}
.ds-btngroup>*:focus-visible{z-index:2;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "button-group");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * ButtonGroup — joins adjacent buttons into a single segmented control.
 */
function ButtonGroup({
  orientation = "horizontal",
  className = "",
  children,
  ...props
}) {
  inject();
  const cls = ["ds-btngroup", orientation === "vertical" ? "ds-btngroup--v" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { ButtonGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/ButtonGroup.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — a square button that holds a single icon.
 */
function IconButton({
  variant = "ghost",
  size = "md",
  rounded = "default",
  type = "button",
  className = "",
  "aria-label": ariaLabel,
  children,
  ...props
}) {
  __ds_scope.injectButtonStyles();
  const cls = ["ds-btn", `ds-btn--${variant}`, `ds-ibtn--${size}`, rounded === "full" ? "ds-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    "aria-label": ariaLabel
  }, props), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/LinkButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LinkButton — a text-only button styled as an inline link.
 */
function LinkButton({
  size = "md",
  className = "",
  children,
  ...props
}) {
  __ds_scope.injectButtonStyles();
  const fs = {
    xs: 12,
    sm: 14,
    md: 14,
    lg: 16
  }[size] || 14;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ["ds-btn", "ds-btn--link", className].filter(Boolean).join(" "),
    style: {
      fontSize: fs
    }
  }, props), children);
}
Object.assign(__ds_scope, { LinkButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/LinkButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/LoadingButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LoadingButton — a button that shows a spinner and disables while loading.
 */
function LoadingButton({
  variant = "primary",
  size = "md",
  loading = false,
  type = "button",
  className = "",
  children,
  ...props
}) {
  __ds_scope.injectButtonStyles();
  const cls = ["ds-btn", `ds-btn--${variant}`, `ds-btn--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: loading || props.disabled
  }, props), loading && /*#__PURE__*/React.createElement("span", {
    className: "ds-btn-spinner",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { LoadingButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/LoadingButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-toggle{
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
  height:36px;min-width:36px;padding:0 10px;font-family:var(--font-sans);font-size:14px;font-weight:500;
  background:transparent;color:var(--foreground);border:1px solid transparent;border-radius:var(--radius-md);
  cursor:pointer;transition:background-color .15s ease,color .15s ease,box-shadow .15s ease;outline:none;box-sizing:border-box;
}
.ds-toggle>svg{width:16px;height:16px;flex:none;}
.ds-toggle:hover{background:var(--ghost-hover);}
.ds-toggle:focus-visible{box-shadow:0 0 0 3px var(--ring);}
.ds-toggle[data-state="on"]{background:var(--accent);color:var(--accent-foreground);}
.ds-toggle--outline{border-color:var(--border);}
.ds-toggle--sm{height:32px;min-width:32px;padding:0 8px;}
.ds-toggle--lg{height:40px;min-width:40px;padding:0 14px;}
.ds-toggle:disabled{opacity:.5;pointer-events:none;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "toggle");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Toggle — a two-state pressable button (on/off).
 */
function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  variant = "ghost",
  size = "md",
  className = "",
  children,
  ...props
}) {
  inject();
  const isControlled = pressed !== undefined;
  const [internal, setInternal] = React.useState(defaultPressed);
  const on = isControlled ? pressed : internal;
  const toggle = () => {
    const next = !on;
    if (!isControlled) setInternal(next);
    onPressedChange && onPressedChange(next);
  };
  const cls = ["ds-toggle", variant === "outline" ? "ds-toggle--outline" : "", size !== "md" ? `ds-toggle--${size}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "data-state": on ? "on" : "off",
    "aria-pressed": on,
    onClick: toggle
  }, props), children);
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/data-display/AspectRatio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** AspectRatio — constrains children to a fixed width:height ratio. */
function AspectRatio({
  ratio = 16 / 9,
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: String(ratio),
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0
    }
  }, children));
}
Object.assign(__ds_scope, { AspectRatio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/AspectRatio.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-avatar{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;flex:none;background:var(--muted);color:var(--muted-foreground);font-family:var(--font-sans);font-weight:500;user-select:none;}
.ds-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
.ds-avatar--round{border-radius:50%;}
.ds-avatar--square{border-radius:var(--radius-lg);}
.ds-avatar--xs{width:24px;height:24px;font-size:10px;}
.ds-avatar--sm{width:32px;height:32px;font-size:12px;}
.ds-avatar--md{width:40px;height:40px;font-size:14px;}
.ds-avatar--lg{width:48px;height:48px;font-size:16px;}
.ds-avatar--xl{width:64px;height:64px;font-size:20px;}
.ds-avatarstack{display:inline-flex;}
.ds-avatarstack>.ds-avatar{margin-left:-8px;box-shadow:0 0 0 2px var(--background);}
.ds-avatarstack>.ds-avatar:first-child{margin-left:0;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "avatar");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Avatar — a user image with text-initials fallback. */
function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "round",
  className = "",
  ...props
}) {
  inject();
  const cls = ["ds-avatar", `ds-avatar--${size}`, `ds-avatar--${shape}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("span", null, initials));
}

/** AvatarStack — overlapping avatars with a ring against the background. */
function AvatarStack({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ds-avatarstack", className].filter(Boolean).join(" ")
  }, props), children);
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-badge{
  display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans);font-size:12px;font-weight:600;line-height:1;
  padding:3px 8px;border:1px solid transparent;border-radius:var(--radius-md);white-space:nowrap;
}
.ds-badge--rounded{border-radius:var(--radius-full);}
.ds-badge>svg{width:12px;height:12px;}
.ds-badge--primary{background:var(--primary);color:var(--primary-foreground);}
.ds-badge--secondary{background:var(--secondary);color:var(--secondary-foreground);}
.ds-badge--destructive{background:var(--destructive);color:var(--destructive-foreground);}
.ds-badge--outline{background:transparent;color:var(--foreground);border-color:var(--border);}
.ds-badge--success{background:var(--green-100,rgb(220,252,231));color:var(--green-700,rgb(21,128,61));}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "badge");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Badge — a small status / category label. */
function Badge({
  variant = "primary",
  rounded = false,
  className = "",
  children,
  ...props
}) {
  inject();
  const cls = ["ds-badge", `ds-badge--${variant}`, rounded ? "ds-badge--rounded" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-card{background:var(--card);color:var(--card-foreground);border:1px solid var(--border);border-radius:var(--radius-xl);box-shadow:var(--shadow-xs);display:flex;flex-direction:column;font-family:var(--font-sans);}
.ds-card__header{display:flex;flex-direction:column;gap:6px;padding:24px 24px 0;}
.ds-card__title{font-size:16px;font-weight:600;line-height:1.4;letter-spacing:-.01em;margin:0;color:var(--card-foreground);}
.ds-card__desc{font-size:14px;line-height:1.45;color:var(--muted-foreground);margin:0;}
.ds-card__content{padding:24px;display:flex;flex-direction:column;gap:16px;}
.ds-card__footer{padding:0 24px 24px;display:flex;align-items:center;gap:12px;}
.ds-card__header + .ds-card__content{padding-top:16px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "card");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Card — a bordered surface that groups related content. */
function Card({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-card", className].filter(Boolean).join(" ")
  }, props), children);
}
/** Header region of a Card (holds title + description). */
function CardHeader({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-card__header", className].filter(Boolean).join(" ")
  }, props), children);
}
/** Card title heading. */
function CardTitle({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("h3", _extends({
    className: ["ds-card__title", className].filter(Boolean).join(" ")
  }, props), children);
}
/** Muted descriptive text under a CardTitle. */
function CardDescription({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("p", _extends({
    className: ["ds-card__desc", className].filter(Boolean).join(" ")
  }, props), children);
}
/** Main body region of a Card. */
function CardContent({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-card__content", className].filter(Boolean).join(" ")
  }, props), children);
}
/** Footer region of a Card (actions). */
function CardFooter({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-card__footer", className].filter(Boolean).join(" ")
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Empty.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:40px 24px;font-family:var(--font-sans);}
.ds-empty__icon{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--radius-xl);background:var(--muted);color:var(--muted-foreground);margin-bottom:8px;}
.ds-empty__icon svg{width:22px;height:22px;}
.ds-empty__title{font-size:16px;font-weight:600;color:var(--foreground);margin:0;}
.ds-empty__desc{font-size:14px;line-height:1.5;color:var(--muted-foreground);margin:0;max-width:320px;}
.ds-empty__actions{display:flex;gap:8px;margin-top:12px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "empty");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Empty — an empty-state placeholder with icon, title, description and actions. */
function Empty({
  icon,
  title,
  description,
  actions,
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-empty", className].filter(Boolean).join(" ")
  }, props), icon && /*#__PURE__*/React.createElement("div", {
    className: "ds-empty__icon"
  }, icon), title && /*#__PURE__*/React.createElement("p", {
    className: "ds-empty__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ds-empty__desc"
  }, description), children, actions && /*#__PURE__*/React.createElement("div", {
    className: "ds-empty__actions"
  }, actions));
}
Object.assign(__ds_scope, { Empty });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Empty.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Kbd.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-kbd{
  display:inline-flex;align-items:center;justify-content:center;gap:2px;min-width:20px;height:20px;padding:0 6px;
  font-family:var(--font-mono);font-size:11px;font-weight:500;color:var(--muted-foreground);
  background:var(--muted);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:var(--shadow-2xs);line-height:1;
}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "kbd");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Kbd — a keyboard-key chip. */
function Kbd({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("kbd", _extends({
    className: ["ds-kbd", className].filter(Boolean).join(" ")
  }, props), children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Progress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-progress{position:relative;width:100%;height:8px;background:var(--secondary);border-radius:var(--radius-full);overflow:hidden;}
.ds-progress__bar{height:100%;background:var(--primary);border-radius:var(--radius-full);transition:width .3s ease;}
.ds-progress--indeterminate .ds-progress__bar{width:40%!important;animation:ds-progress-slide 1.3s ease-in-out infinite;}
@keyframes ds-progress-slide{0%{transform:translateX(-100%);}100%{transform:translateX(350%);}}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "progress");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Progress — a horizontal completion bar. */
function Progress({
  value = 0,
  indeterminate = false,
  className = "",
  ...props
}) {
  inject();
  const cls = ["ds-progress", indeterminate ? "ds-progress--indeterminate" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "progressbar",
    "aria-valuenow": indeterminate ? undefined : value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ds-progress__bar",
    style: {
      width: Math.max(0, Math.min(100, value)) + "%"
    }
  }));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Progress.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Separator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-separator{background:var(--border);border:none;flex:none;}
.ds-separator--h{height:1px;width:100%;margin:0;}
.ds-separator--v{width:1px;align-self:stretch;min-height:16px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "separator");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Separator — a thin dividing rule. */
function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}) {
  inject();
  const cls = ["ds-separator", orientation === "vertical" ? "ds-separator--v" : "ds-separator--h", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": orientation,
    className: cls
  }, props));
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Separator.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
@keyframes ds-skeleton-pulse{0%,100%{opacity:1;}50%{opacity:.5;}}
.ds-skeleton{display:block;background:var(--muted);border-radius:var(--radius-md);animation:ds-skeleton-pulse 1.6s ease-in-out infinite;}
.ds-skeleton--circle{border-radius:50%;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "skeleton");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Skeleton — a pulsing placeholder shown while content loads. */
function Skeleton({
  width,
  height = 16,
  circle = false,
  className = "",
  style = {},
  ...props
}) {
  inject();
  const cls = ["ds-skeleton", circle ? "ds-skeleton--circle" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      width: width ?? "100%",
      height,
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-table-wrap{width:100%;overflow:auto;border:1px solid var(--border);border-radius:var(--radius-xl);}
.ds-table{width:100%;border-collapse:collapse;font-family:var(--font-sans);font-size:14px;color:var(--foreground);}
.ds-table thead th{
  text-align:left;font-weight:500;color:var(--muted-foreground);height:44px;padding:0 16px;
  border-bottom:1px solid var(--border);white-space:nowrap;background:var(--card);
}
.ds-table tbody td{height:52px;padding:0 16px;border-bottom:1px solid var(--border);vertical-align:middle;}
.ds-table tbody tr:last-child td{border-bottom:none;}
.ds-table tbody tr{transition:background-color .12s ease;}
.ds-table--hover tbody tr:hover{background:var(--muted);}
.ds-table td.ds-num,.ds-table th.ds-num{text-align:right;font-variant-numeric:tabular-nums;}
.ds-table tfoot td{height:48px;padding:0 16px;border-top:1px solid var(--border);font-weight:500;background:var(--card);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "table");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Table — a bordered data table. Compose with the sub-parts, or use TableSimple. */
function Table({
  hover = true,
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-table-wrap"
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: ["ds-table", hover ? "ds-table--hover" : "", className].filter(Boolean).join(" ")
  }, props), children));
}
function TableHeader({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("thead", props, children);
}
function TableBody({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("tbody", props, children);
}
function TableFooter({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("tfoot", props, children);
}
function TableRow({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("tr", props, children);
}
function TableHead({
  numeric = false,
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("th", _extends({
    className: [numeric ? "ds-num" : "", className].filter(Boolean).join(" ")
  }, props), children);
}
function TableCell({
  numeric = false,
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("td", _extends({
    className: [numeric ? "ds-num" : "", className].filter(Boolean).join(" ")
  }, props), children);
}
Object.assign(__ds_scope, { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-alert{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;padding:14px 16px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--card);color:var(--card-foreground);font-family:var(--font-sans);}
.ds-alert__icon{grid-row:span 2;display:flex;align-items:flex-start;color:var(--foreground);padding-top:1px;}
.ds-alert__icon svg{width:18px;height:18px;}
.ds-alert--no-desc .ds-alert__icon{grid-row:span 1;align-items:center;padding-top:0;}
.ds-alert__title{font-size:14px;font-weight:600;line-height:1.4;margin:0;}
.ds-alert__desc{font-size:14px;line-height:1.5;color:var(--muted-foreground);margin:0;}
.ds-alert--destructive{border-color:color-mix(in srgb,var(--destructive) 40%,transparent);background:var(--destructive-subtle);}
.ds-alert--destructive .ds-alert__icon,.ds-alert--destructive .ds-alert__title{color:var(--destructive-text);}
.ds-alert--destructive .ds-alert__desc{color:color-mix(in srgb,var(--destructive-text) 85%,transparent);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "alert");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Alert — a callout for important inline messages. */
function Alert({
  variant = "default",
  icon,
  title,
  children,
  className = "",
  ...props
}) {
  inject();
  const cls = ["ds-alert", `ds-alert--${variant}`, !children ? "ds-alert--no-desc" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "alert",
    className: cls
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: "ds-alert__icon"
  }, icon), title && /*#__PURE__*/React.createElement("p", {
    className: "ds-alert__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "ds-alert__desc"
  }, children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
@keyframes ds-spinner-rot{to{transform:rotate(360deg);}}
.ds-spinner{display:inline-block;border-radius:50%;border-style:solid;border-color:currentColor;border-right-color:transparent;animation:ds-spinner-rot .6s linear infinite;color:var(--muted-foreground);vertical-align:middle;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "spinner");
  el.textContent = CSS;
  document.head.appendChild(el);
}
const SIZES = {
  sm: [16, 2],
  md: [20, 2],
  lg: [28, 3],
  xl: [40, 4]
};

/** Spinner — an indeterminate loading indicator. */
function Spinner({
  size = "md",
  className = "",
  style = {},
  ...props
}) {
  inject();
  const [d, b] = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ds-spinner", className].filter(Boolean).join(" "),
    role: "status",
    "aria-label": "Loading",
    style: {
      width: d,
      height: d,
      borderWidth: b,
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-toaster{position:fixed;z-index:9999;bottom:20px;right:20px;display:flex;flex-direction:column;gap:10px;width:360px;max-width:calc(100vw - 40px);}
.ds-toast{
  display:grid;grid-template-columns:auto 1fr auto;gap:2px 12px;align-items:start;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-lg);padding:14px 16px;font-family:var(--font-sans);
  animation:ds-toast-in .22s cubic-bezier(.21,1.02,.73,1);
}
@keyframes ds-toast-in{from{opacity:0;transform:translateY(12px) scale(.98);}to{opacity:1;transform:none;}}
.ds-toast__icon{grid-row:span 2;display:flex;padding-top:1px;}
.ds-toast__icon svg{width:18px;height:18px;}
.ds-toast--success .ds-toast__icon{color:var(--success);}
.ds-toast--error .ds-toast__icon{color:var(--destructive);}
.ds-toast--info .ds-toast__icon{color:var(--info);}
.ds-toast__title{font-size:14px;font-weight:600;margin:0;line-height:1.4;}
.ds-toast__desc{font-size:13px;color:var(--muted-foreground);margin:0;line-height:1.45;}
.ds-toast__close{grid-row:span 2;background:none;border:none;color:var(--muted-foreground);cursor:pointer;padding:2px;border-radius:var(--radius-sm);display:flex;}
.ds-toast__close:hover{background:var(--ghost-hover);color:var(--foreground);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "toast");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function CloseIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}

/** Toast — a single transient notification. Compose inside <Toaster>. */
function Toast({
  variant = "default",
  icon,
  title,
  description,
  onClose,
  className = "",
  ...props
}) {
  inject();
  const cls = ["ds-toast", `ds-toast--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "status"
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: "ds-toast__icon"
  }, icon), title && /*#__PURE__*/React.createElement("p", {
    className: "ds-toast__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ds-toast__desc"
  }, description), onClose && /*#__PURE__*/React.createElement("button", {
    className: "ds-toast__close",
    "aria-label": "Dismiss",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseIcon, null)));
}

/** Toaster — fixed bottom-right stack that holds Toast children. */
function Toaster({
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-toaster", className].filter(Boolean).join(" ")
  }, props), children);
}
Object.assign(__ds_scope, { Toast, Toaster });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-tooltip{position:relative;display:inline-flex;}
.ds-tooltip__pop{
  position:absolute;z-index:60;left:50%;transform:translateX(-50%) translateY(-6px);bottom:100%;
  background:var(--tooltip);color:var(--tooltip-foreground);font-family:var(--font-sans);font-size:12px;font-weight:500;line-height:1.3;
  padding:5px 9px;border-radius:var(--radius-md);white-space:nowrap;box-shadow:var(--shadow-md);
  opacity:0;pointer-events:none;transition:opacity .12s ease,transform .12s ease;
}
.ds-tooltip:hover .ds-tooltip__pop,.ds-tooltip:focus-within .ds-tooltip__pop{opacity:1;transform:translateX(-50%) translateY(-10px);}
.ds-tooltip__pop::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--tooltip);}
.ds-tooltip__pop--bottom{bottom:auto;top:100%;transform:translateX(-50%) translateY(6px);}
.ds-tooltip:hover .ds-tooltip__pop--bottom,.ds-tooltip:focus-within .ds-tooltip__pop--bottom{transform:translateX(-50%) translateY(10px);}
.ds-tooltip__pop--bottom::after{top:auto;bottom:100%;border-top-color:transparent;border-bottom-color:var(--tooltip);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "tooltip");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Tooltip — a hover/focus hint. Wrap the trigger element. */
function Tooltip({
  content,
  side = "top",
  className = "",
  children,
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ds-tooltip", className].filter(Boolean).join(" ")
  }, props), children, /*#__PURE__*/React.createElement("span", {
    className: "ds-tooltip__pop" + (side === "bottom" ? " ds-tooltip__pop--bottom" : ""),
    role: "tooltip"
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/inputs/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-field{display:flex;flex-direction:column;gap:6px;}
.ds-field__desc{font-family:var(--font-sans);font-size:13px;line-height:1.45;color:var(--muted-foreground);margin:0;}
.ds-field__error{font-family:var(--font-sans);font-size:13px;line-height:1.45;color:var(--destructive-text);margin:0;}
.ds-field--horizontal{flex-direction:row;align-items:flex-start;gap:16px;}
.ds-field--horizontal>.ds-field__control{flex:1;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "field");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Field — composes a Label, control, helper/description text and an error message.
 */
function Field({
  label,
  description,
  error,
  htmlFor,
  required,
  className = "",
  children,
  ...props
}) {
  inject();
  const cls = ["ds-field", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    className: "ds-label",
    style: {
      fontWeight: 500,
      fontSize: 14,
      fontFamily: "var(--font-sans)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--destructive)"
    },
    "aria-hidden": "true"
  }, " *")), /*#__PURE__*/React.createElement("div", {
    className: "ds-field__control"
  }, children), description && !error && /*#__PURE__*/React.createElement("p", {
    className: "ds-field__desc"
  }, description), error && /*#__PURE__*/React.createElement("p", {
    className: "ds-field__error"
  }, error));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/Field.jsx", error: String((e && e.message) || e) }); }

// components/inputs/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared field styling for text inputs. Exported for Textarea/InputOTP/InputGroup reuse. */
const CSS = `
.ds-input{
  display:flex;align-items:center;width:100%;box-sizing:border-box;
  font-family:var(--font-sans);font-size:14px;color:var(--foreground);
  background:var(--background);border:1px solid var(--input);border-radius:var(--radius-lg);
  transition:border-color .15s ease,box-shadow .15s ease;outline:none;
}
.ds-input::placeholder{color:var(--muted-foreground);}
.ds-input:focus,.ds-input:focus-within{border-color:var(--ring);box-shadow:0 0 0 3px var(--ring);}
.ds-input:disabled{opacity:.5;cursor:not-allowed;background:var(--muted);}
.ds-input[aria-invalid="true"]{border-color:var(--destructive-border);}
.ds-input[aria-invalid="true"]:focus{box-shadow:0 0 0 3px var(--ring-error);}

.ds-input--sm{height:32px;padding:0 10px;font-size:13px;border-radius:var(--radius-md);}
.ds-input--md{height:36px;padding:0 12px;}
.ds-input--lg{height:40px;padding:0 14px;font-size:15px;}
`;
let injected = false;
function injectInputStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "input");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Input — single-line text field.
 */
function Input({
  size = "md",
  invalid = false,
  className = "",
  type = "text",
  ...props
}) {
  injectInputStyles();
  const cls = ["ds-input", `ds-input--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    className: cls,
    "aria-invalid": invalid || undefined
  }, props));
}
Object.assign(__ds_scope, { injectInputStyles, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/Input.jsx", error: String((e && e.message) || e) }); }

// components/inputs/InputOTP.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-otp{display:inline-flex;align-items:center;gap:8px;}
.ds-otp__group{display:inline-flex;}
.ds-otp__slot{
  width:40px;height:40px;display:flex;align-items:center;justify-content:center;
  font-family:var(--font-mono);font-size:16px;color:var(--foreground);
  background:var(--background);border:1px solid var(--input);border-left-width:0;box-sizing:border-box;
  transition:border-color .15s ease,box-shadow .15s ease;
}
.ds-otp__slot:first-child{border-left-width:1px;border-radius:var(--radius-lg) 0 0 var(--radius-lg);}
.ds-otp__slot:last-child{border-radius:0 var(--radius-lg) var(--radius-lg) 0;}
.ds-otp__slot--active{border-color:var(--ring);box-shadow:0 0 0 3px var(--ring);z-index:1;position:relative;}
.ds-otp__sep{color:var(--muted-foreground);}
.ds-otp__caret{width:1px;height:18px;background:var(--foreground);animation:ds-otp-blink 1s step-end infinite;}
@keyframes ds-otp-blink{50%{opacity:0;}}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "otp");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * InputOTP — segmented one-time-code input.
 */
function InputOTP({
  length = 6,
  value = "",
  onChange,
  groupSize = 3,
  className = "",
  ...props
}) {
  inject();
  const handleKey = e => {
    if (!onChange) return;
    if (e.key === "Backspace") {
      onChange(value.slice(0, -1));
    } else if (/^[0-9]$/.test(e.key) && value.length < length) {
      onChange(value + e.key);
    }
  };
  const cells = Array.from({
    length
  });
  const groups = [];
  for (let i = 0; i < length; i += groupSize) groups.push(cells.slice(i, i + groupSize).map((_, j) => i + j));
  const active = value.length;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-otp", className].filter(Boolean).join(" "),
    tabIndex: 0,
    onKeyDown: handleKey,
    role: "group"
  }, props), groups.map((g, gi) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: gi
  }, gi > 0 && /*#__PURE__*/React.createElement("span", {
    className: "ds-otp__sep"
  }, "\u2013"), /*#__PURE__*/React.createElement("div", {
    className: "ds-otp__group"
  }, g.map(idx => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "ds-otp__slot" + (idx === active ? " ds-otp__slot--active" : "")
  }, value[idx] || (idx === active ? /*#__PURE__*/React.createElement("span", {
    className: "ds-otp__caret"
  }) : "")))))));
}
Object.assign(__ds_scope, { InputOTP });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/InputOTP.jsx", error: String((e && e.message) || e) }); }

// components/inputs/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-label{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-sans);font-size:14px;font-weight:500;color:var(--foreground);line-height:1.4;}
.ds-label--disabled{opacity:.5;}
.ds-label__req{color:var(--destructive);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "label");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Label — caption for a form control.
 */
function Label({
  required = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  inject();
  const cls = ["ds-label", disabled ? "ds-label--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", _extends({
    className: cls
  }, props), children, required && /*#__PURE__*/React.createElement("span", {
    className: "ds-label__req",
    "aria-hidden": "true"
  }, "*"));
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/Label.jsx", error: String((e && e.message) || e) }); }

// components/inputs/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — multi-line text field.
 */
function Textarea({
  invalid = false,
  rows = 4,
  className = "",
  ...props
}) {
  __ds_scope.injectInputStyles();
  const cls = ["ds-input", "ds-input--md", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    className: cls,
    "aria-invalid": invalid || undefined,
    style: {
      height: "auto",
      minHeight: 72,
      padding: "8px 12px",
      lineHeight: 1.5,
      resize: "vertical"
    }
  }, props));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-accordion{display:flex;flex-direction:column;font-family:var(--font-sans);width:100%;}
.ds-accordion__item{border-bottom:1px solid var(--border);}
.ds-accordion__trigger{
  display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:16px 2px;
  background:none;border:none;cursor:pointer;font-family:var(--font-sans);font-size:14px;font-weight:500;color:var(--foreground);text-align:left;
}
.ds-accordion__trigger:hover{text-decoration:underline;}
.ds-accordion__chev{width:16px;height:16px;flex:none;color:var(--muted-foreground);transition:transform .2s ease;}
.ds-accordion__trigger[data-open="true"] .ds-accordion__chev{transform:rotate(180deg);}
.ds-accordion__panel{overflow:hidden;display:grid;grid-template-rows:0fr;transition:grid-template-rows .22s ease;}
.ds-accordion__panel[data-open="true"]{grid-template-rows:1fr;}
.ds-accordion__panel-inner{overflow:hidden;}
.ds-accordion__content{padding:0 2px 16px;font-size:14px;line-height:1.6;color:var(--muted-foreground);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "accordion");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Accordion — vertically stacked expandable sections.
 * `items` is [{ value, trigger, content }].
 */
function Accordion({
  items = [],
  type = "single",
  defaultValue,
  className = "",
  ...props
}) {
  inject();
  const initial = defaultValue !== undefined ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];
  const [open, setOpen] = React.useState(initial);
  const toggle = v => {
    setOpen(cur => {
      const isOpen = cur.includes(v);
      if (type === "multiple") return isOpen ? cur.filter(x => x !== v) : [...cur, v];
      return isOpen ? [] : [v];
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-accordion", className].filter(Boolean).join(" ")
  }, props), items.map(it => {
    const isOpen = open.includes(it.value);
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-accordion__item",
      key: it.value
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ds-accordion__trigger",
      "data-open": isOpen,
      "aria-expanded": isOpen,
      onClick: () => toggle(it.value)
    }, /*#__PURE__*/React.createElement("span", null, it.trigger), /*#__PURE__*/React.createElement("svg", {
      className: "ds-accordion__chev",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ds-accordion__panel",
      "data-open": isOpen
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-accordion__panel-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-accordion__content"
    }, it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-breadcrumb{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-family:var(--font-sans);font-size:14px;color:var(--muted-foreground);}
.ds-breadcrumb__link{color:var(--muted-foreground);text-decoration:none;border-radius:var(--radius-sm);transition:color .15s ease;}
.ds-breadcrumb__link:hover{color:var(--foreground);}
.ds-breadcrumb__current{color:var(--foreground);font-weight:500;}
.ds-breadcrumb__sep{color:var(--muted-foreground);display:flex;}
.ds-breadcrumb__sep svg{width:14px;height:14px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "breadcrumb");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Breadcrumb — hierarchical page trail.
 * `items` is [{ label, href }]; the last item renders as the current page.
 */
function Breadcrumb({
  items = [],
  className = "",
  ...props
}) {
  inject();
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb",
    className: ["ds-breadcrumb", className].filter(Boolean).join(" ")
  }, props), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      className: "ds-breadcrumb__current",
      "aria-current": "page"
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      className: "ds-breadcrumb__link",
      href: it.href || "#"
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      className: "ds-breadcrumb__sep",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }))));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavigationMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-navmenu{display:flex;align-items:center;gap:4px;font-family:var(--font-sans);position:relative;}
.ds-navmenu__item{position:relative;}
.ds-navmenu__trigger{
  display:inline-flex;align-items:center;gap:4px;height:36px;padding:0 12px;border:none;background:transparent;cursor:pointer;
  font-family:var(--font-sans);font-size:14px;font-weight:500;color:var(--foreground);border-radius:var(--radius-md);text-decoration:none;
  transition:background-color .15s ease;
}
.ds-navmenu__trigger:hover,.ds-navmenu__trigger[data-open="true"]{background:var(--accent);}
.ds-navmenu__chev{width:14px;height:14px;color:var(--muted-foreground);transition:transform .15s ease;}
.ds-navmenu__trigger[data-open="true"] .ds-navmenu__chev{transform:rotate(180deg);}
.ds-navmenu__panel{
  position:absolute;z-index:70;top:calc(100% + 6px);left:0;min-width:240px;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);padding:6px;animation:ds-pop-in .14s ease;
}
.ds-navmenu__link{display:flex;flex-direction:column;gap:2px;padding:8px 10px;border-radius:var(--radius-md);text-decoration:none;color:var(--popover-foreground);}
.ds-navmenu__link:hover{background:var(--accent);}
.ds-navmenu__link-title{font-size:14px;font-weight:500;}
.ds-navmenu__link-desc{font-size:13px;color:var(--muted-foreground);line-height:1.4;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "navmenu");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * NavigationMenu — a horizontal menu bar with optional dropdown panels.
 * `items` is [{ label, href, links?: [{ title, description, href }] }].
 */
function NavigationMenu({
  items = [],
  className = "",
  ...props
}) {
  inject();
  const [open, setOpen] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ["ds-navmenu", className].filter(Boolean).join(" "),
    ref: ref
  }, props), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "ds-navmenu__item",
    key: i
  }, it.links ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ds-navmenu__trigger",
    "data-open": open === i,
    onClick: () => setOpen(open === i ? null : i)
  }, it.label, /*#__PURE__*/React.createElement("svg", {
    className: "ds-navmenu__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))) : /*#__PURE__*/React.createElement("a", {
    className: "ds-navmenu__trigger",
    href: it.href || "#"
  }, it.label), it.links && open === i && /*#__PURE__*/React.createElement("div", {
    className: "ds-navmenu__panel"
  }, it.links.map((l, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    className: "ds-navmenu__link",
    href: l.href || "#",
    onClick: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-navmenu__link-title"
  }, l.title), l.description && /*#__PURE__*/React.createElement("span", {
    className: "ds-navmenu__link-desc"
  }, l.description)))))));
}
Object.assign(__ds_scope, { NavigationMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavigationMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-pagination{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans);}
.ds-pagination__btn{
  min-width:36px;height:36px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;gap:4px;
  background:transparent;border:1px solid transparent;border-radius:var(--radius-md);color:var(--foreground);font-size:14px;font-weight:500;cursor:pointer;
  transition:background-color .15s ease,border-color .15s ease;
}
.ds-pagination__btn svg{width:16px;height:16px;}
.ds-pagination__btn:hover{background:var(--ghost-hover);}
.ds-pagination__btn[data-active="true"]{border-color:var(--border);background:var(--background);box-shadow:var(--shadow-xs);}
.ds-pagination__btn:disabled{opacity:.5;pointer-events:none;}
.ds-pagination__ellipsis{min-width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;color:var(--muted-foreground);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "pagination");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function pages(current, total) {
  if (total <= 7) return Array.from({
    length: total
  }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

/** Pagination — page navigation control. */
function Pagination({
  page = 1,
  total = 1,
  onPageChange,
  className = "",
  ...props
}) {
  inject();
  const go = p => onPageChange && p >= 1 && p <= total && onPageChange(p);
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ["ds-pagination", className].filter(Boolean).join(" "),
    "aria-label": "Pagination"
  }, props), /*#__PURE__*/React.createElement("button", {
    className: "ds-pagination__btn",
    disabled: page <= 1,
    onClick: () => go(page - 1),
    "aria-label": "Previous"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })), /*#__PURE__*/React.createElement("span", null, "Prev")), pages(page, total).map((p, i) => p === "…" ? /*#__PURE__*/React.createElement("span", {
    key: "e" + i,
    className: "ds-pagination__ellipsis"
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    className: "ds-pagination__btn",
    "data-active": p === page,
    "aria-current": p === page ? "page" : undefined,
    onClick: () => go(p)
  }, p)), /*#__PURE__*/React.createElement("button", {
    className: "ds-pagination__btn",
    disabled: page >= total,
    onClick: () => go(page + 1),
    "aria-label": "Next"
  }, /*#__PURE__*/React.createElement("span", null, "Next"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-tabs{display:flex;flex-direction:column;gap:14px;font-family:var(--font-sans);}
.ds-tabs__list{display:inline-flex;gap:2px;background:var(--muted);padding:4px;border-radius:var(--radius-lg);width:max-content;max-width:100%;overflow:auto;}
.ds-tabs__trigger{
  appearance:none;border:none;background:transparent;cursor:pointer;font-family:var(--font-sans);font-size:14px;font-weight:500;
  color:var(--muted-foreground);padding:5px 12px;border-radius:var(--radius-md);white-space:nowrap;transition:color .15s ease,background-color .15s ease,box-shadow .15s ease;
}
.ds-tabs__trigger:hover{color:var(--foreground);}
.ds-tabs__trigger[data-active="true"]{background:var(--background);color:var(--foreground);box-shadow:var(--shadow-xs);}
.ds-tabs__trigger:disabled{opacity:.5;cursor:not-allowed;}
.ds-tabs--underline .ds-tabs__list{background:transparent;padding:0;gap:0;border-bottom:1px solid var(--border);border-radius:0;width:100%;}
.ds-tabs--underline .ds-tabs__trigger{border-radius:0;padding:8px 14px;margin-bottom:-1px;border-bottom:2px solid transparent;}
.ds-tabs--underline .ds-tabs__trigger[data-active="true"]{background:transparent;box-shadow:none;border-bottom-color:var(--primary);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "tabs");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Tabs — switch between panels.
 * `items` is [{ value, label, disabled, content }].
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onValueChange,
  variant = "pill",
  className = "",
  ...props
}) {
  inject();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };
  const current = items.find(it => it.value === active);
  const cls = ["ds-tabs", variant === "underline" ? "ds-tabs--underline" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ds-tabs__list",
    role: "tablist"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    type: "button",
    role: "tab",
    className: "ds-tabs__trigger",
    "data-active": it.value === active,
    disabled: it.disabled,
    "aria-selected": it.value === active,
    onClick: () => select(it.value)
  }, it.label))), current && current.content !== undefined && /*#__PURE__*/React.createElement("div", {
    role: "tabpanel"
  }, current.content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Command.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-command{display:flex;flex-direction:column;width:100%;max-width:520px;background:var(--popover);color:var(--popover-foreground);
  border:1px solid var(--border);border-radius:var(--radius-xl);box-shadow:var(--shadow-md);overflow:hidden;font-family:var(--font-sans);}
.ds-command__search{display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--border);}
.ds-command__search svg{width:16px;height:16px;color:var(--muted-foreground);flex:none;}
.ds-command__input{flex:1;height:46px;border:none;outline:none;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--foreground);}
.ds-command__input::placeholder{color:var(--muted-foreground);}
.ds-command__list{max-height:300px;overflow:auto;padding:6px;}
.ds-command__group-label{font-size:11px;font-weight:500;color:var(--muted-foreground);padding:8px 8px 4px;}
.ds-command__item{display:flex;align-items:center;gap:10px;height:36px;padding:0 8px;border-radius:var(--radius-md);font-size:14px;cursor:pointer;color:var(--popover-foreground);}
.ds-command__item svg{width:16px;height:16px;color:var(--muted-foreground);}
.ds-command__item[data-active="true"],.ds-command__item:hover{background:var(--accent);color:var(--accent-foreground);}
.ds-command__shortcut{margin-left:auto;font-size:12px;color:var(--muted-foreground);}
.ds-command__empty{padding:28px 8px;text-align:center;font-size:14px;color:var(--muted-foreground);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "command");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Command — a searchable command palette / menu.
 * `groups` is [{ label, items: [{ label, icon, shortcut, onSelect }] }].
 */
function Command({
  placeholder = "Type a command or search…",
  groups = [],
  emptyText = "No results found.",
  className = "",
  ...props
}) {
  inject();
  const [q, setQ] = React.useState("");
  const filtered = groups.map(g => ({
    ...g,
    items: g.items.filter(it => it.label.toLowerCase().includes(q.toLowerCase()))
  })).filter(g => g.items.length);
  const hasResults = filtered.some(g => g.items.length);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-command", className].filter(Boolean).join(" ")
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ds-command__search"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    className: "ds-command__input",
    placeholder: placeholder,
    value: q,
    onChange: e => setQ(e.target.value),
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-command__list"
  }, !hasResults && /*#__PURE__*/React.createElement("div", {
    className: "ds-command__empty"
  }, emptyText), filtered.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi
  }, g.label && /*#__PURE__*/React.createElement("div", {
    className: "ds-command__group-label"
  }, g.label), g.items.map((it, ii) => /*#__PURE__*/React.createElement("div", {
    key: ii,
    className: "ds-command__item",
    onClick: it.onSelect
  }, it.icon, /*#__PURE__*/React.createElement("span", null, it.label), it.shortcut && /*#__PURE__*/React.createElement("span", {
    className: "ds-command__shortcut"
  }, it.shortcut)))))));
}
Object.assign(__ds_scope, { Command });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Command.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-overlay{position:fixed;inset:0;z-index:100;background:var(--unofficial-backdrop,rgba(0,0,0,.6));animation:ds-overlay-in .15s ease;}
@keyframes ds-overlay-in{from{opacity:0;}to{opacity:1;}}
.ds-dialog-wrap{position:fixed;inset:0;z-index:101;display:flex;align-items:center;justify-content:center;padding:20px;}
.ds-dialog{
  position:relative;width:100%;max-width:460px;max-height:calc(100vh - 40px);overflow:auto;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-xl);
  box-shadow:var(--shadow-lg);padding:24px;font-family:var(--font-sans);
  animation:ds-dialog-in .18s cubic-bezier(.21,1.02,.73,1);
}
@keyframes ds-dialog-in{from{opacity:0;transform:scale(.96) translateY(8px);}to{opacity:1;transform:none;}}
.ds-dialog__close{position:absolute;top:16px;right:16px;background:none;border:none;color:var(--muted-foreground);cursor:pointer;padding:4px;border-radius:var(--radius-sm);display:flex;}
.ds-dialog__close:hover{background:var(--ghost-hover);color:var(--foreground);}
.ds-dialog__header{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;padding-right:24px;}
.ds-dialog__title{font-size:18px;font-weight:600;letter-spacing:-.01em;margin:0;}
.ds-dialog__desc{font-size:14px;line-height:1.5;color:var(--muted-foreground);margin:0;}
.ds-dialog__footer{display:flex;justify-content:flex-end;gap:8px;margin-top:24px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "dialog");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Close() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}

/** Dialog — a centered modal overlay. Renders nothing when open is false. */
function Dialog({
  open = true,
  onClose,
  title,
  description,
  footer,
  showClose = true,
  className = "",
  children,
  ...props
}) {
  inject();
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ds-overlay",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog-wrap",
    onClick: e => e.target === e.currentTarget && onClose && onClose()
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-dialog", className].filter(Boolean).join(" "),
    role: "dialog",
    "aria-modal": "true"
  }, props), showClose && onClose && /*#__PURE__*/React.createElement("button", {
    className: "ds-dialog__close",
    "aria-label": "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Close, null)), (title || description) && /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog__header"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "ds-dialog__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ds-dialog__desc"
  }, description)), children, footer && /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog__footer"
  }, footer))));
}

/** AlertDialog — a confirm/cancel modal that is not dismissible by backdrop click. */
function AlertDialog({
  open = true,
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
  children
}) {
  inject();
  if (!open) return null;
  const {
    Button
  } = typeof window !== "undefined" && window.ObraShadcnUiDesignSystem_acd6ac || {};
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ds-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog",
    role: "alertdialog",
    "aria-modal": "true",
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog__header"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "ds-dialog__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ds-dialog__desc"
  }, description)), children, /*#__PURE__*/React.createElement("div", {
    className: "ds-dialog__footer"
  }, Button ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(Button, {
    variant: destructive ? "destructive" : "primary",
    onClick: onConfirm
  }, confirmLabel)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm
  }, confirmLabel))))));
}
Object.assign(__ds_scope, { Dialog, AlertDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Popover.jsx
try { (() => {
const CSS = `
.ds-popover{position:relative;display:inline-block;}
.ds-popover__panel{
  position:absolute;z-index:70;top:calc(100% + 6px);left:0;min-width:200px;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);padding:16px;font-family:var(--font-sans);
  animation:ds-pop-in .14s ease;
}
.ds-popover__panel--end{left:auto;right:0;}
@keyframes ds-pop-in{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:none;}}
.ds-hovercard{position:relative;display:inline-block;}
.ds-hovercard__panel{
  position:absolute;z-index:70;top:calc(100% + 8px);left:0;width:280px;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);padding:16px;font-family:var(--font-sans);
  opacity:0;pointer-events:none;transform:translateY(-4px);transition:opacity .15s ease,transform .15s ease;
}
.ds-hovercard:hover .ds-hovercard__panel,.ds-hovercard:focus-within .ds-hovercard__panel{opacity:1;pointer-events:auto;transform:none;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "popover");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/** Popover — click-triggered floating panel anchored to its trigger. */
function Popover({
  trigger,
  align = "start",
  defaultOpen = false,
  open: controlled,
  onOpenChange,
  className = "",
  children
}) {
  inject();
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const open = isControlled ? controlled : internal;
  const ref = React.useRef(null);
  const set = v => {
    if (!isControlled) setInternal(v);
    onOpenChange && onOpenChange(v);
  };
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) set(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: ["ds-popover", className].filter(Boolean).join(" "),
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => set(!open)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    className: "ds-popover__panel" + (align === "end" ? " ds-popover__panel--end" : "")
  }, children));
}

/** HoverCard — a rich preview that appears on hover/focus of its trigger. */
function HoverCard({
  trigger,
  className = "",
  children
}) {
  inject();
  return /*#__PURE__*/React.createElement("div", {
    className: ["ds-hovercard", className].filter(Boolean).join(" "),
    tabIndex: 0
  }, trigger, /*#__PURE__*/React.createElement("div", {
    className: "ds-hovercard__panel"
  }, children));
}
Object.assign(__ds_scope, { Popover, HoverCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Popover.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Sheet.jsx
try { (() => {
const CSS = `
.ds-sheet-overlay{position:fixed;inset:0;z-index:100;background:var(--unofficial-backdrop,rgba(0,0,0,.6));animation:ds-overlay-in .15s ease;}
.ds-sheet{
  position:fixed;z-index:101;background:var(--popover);color:var(--popover-foreground);font-family:var(--font-sans);
  box-shadow:var(--shadow-xl);display:flex;flex-direction:column;
}
.ds-sheet--right{top:0;right:0;height:100%;width:380px;max-width:90vw;border-left:1px solid var(--border);animation:ds-sheet-r .25s cubic-bezier(.32,.72,0,1);}
.ds-sheet--left{top:0;left:0;height:100%;width:380px;max-width:90vw;border-right:1px solid var(--border);animation:ds-sheet-l .25s cubic-bezier(.32,.72,0,1);}
.ds-sheet--top{top:0;left:0;width:100%;max-height:90vh;border-bottom:1px solid var(--border);animation:ds-sheet-t .25s cubic-bezier(.32,.72,0,1);}
.ds-sheet--bottom{bottom:0;left:0;width:100%;max-height:90vh;border-top:1px solid var(--border);border-radius:var(--radius-xl) var(--radius-xl) 0 0;animation:ds-sheet-b .25s cubic-bezier(.32,.72,0,1);}
@keyframes ds-sheet-r{from{transform:translateX(100%);}}
@keyframes ds-sheet-l{from{transform:translateX(-100%);}}
@keyframes ds-sheet-t{from{transform:translateY(-100%);}}
@keyframes ds-sheet-b{from{transform:translateY(100%);}}
.ds-sheet__head{display:flex;flex-direction:column;gap:6px;padding:24px 24px 0;position:relative;}
.ds-sheet__grab{width:48px;height:5px;border-radius:99px;background:var(--border);margin:10px auto 0;}
.ds-sheet__title{font-size:18px;font-weight:600;letter-spacing:-.01em;margin:0;}
.ds-sheet__desc{font-size:14px;line-height:1.5;color:var(--muted-foreground);margin:0;}
.ds-sheet__body{padding:24px;overflow:auto;flex:1;}
.ds-sheet__close{position:absolute;top:0;right:24px;background:none;border:none;color:var(--muted-foreground);cursor:pointer;padding:4px;border-radius:var(--radius-sm);display:flex;}
.ds-sheet__close:hover{background:var(--ghost-hover);color:var(--foreground);}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "sheet");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Close() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}
function Panel({
  variant,
  open,
  onClose,
  side,
  drawer,
  title,
  description,
  className,
  children
}) {
  inject();
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const realSide = drawer ? "bottom" : side;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ds-sheet-overlay",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: ["ds-sheet", `ds-sheet--${realSide}`, className].filter(Boolean).join(" "),
    role: "dialog",
    "aria-modal": "true"
  }, drawer && /*#__PURE__*/React.createElement("div", {
    className: "ds-sheet__grab"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-sheet__head"
  }, onClose && !drawer && /*#__PURE__*/React.createElement("button", {
    className: "ds-sheet__close",
    "aria-label": "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Close, null)), title && /*#__PURE__*/React.createElement("h2", {
    className: "ds-sheet__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ds-sheet__desc"
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: "ds-sheet__body"
  }, children)));
}

/** Sheet — a panel that slides in from any edge. */
function Sheet({
  open = true,
  onClose,
  side = "right",
  title,
  description,
  className = "",
  children
}) {
  return /*#__PURE__*/React.createElement(Panel, {
    open: open,
    onClose: onClose,
    side: side,
    title: title,
    description: description,
    className: className
  }, children);
}

/** Drawer — a bottom sheet with a grab handle (mobile-style). */
function Drawer({
  open = true,
  onClose,
  title,
  description,
  className = "",
  children
}) {
  return /*#__PURE__*/React.createElement(Panel, {
    open: open,
    onClose: onClose,
    drawer: true,
    title: title,
    description: description,
    className: className
  }, children);
}
Object.assign(__ds_scope, { Sheet, Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/selection/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-checkbox{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:14px;color:var(--foreground);cursor:pointer;user-select:none;}
.ds-checkbox input{position:absolute;opacity:0;width:0;height:0;}
.ds-checkbox__box{
  width:16px;height:16px;flex:none;border:1px solid var(--input);border-radius:var(--radius-sm);
  background:var(--background);display:flex;align-items:center;justify-content:center;color:var(--primary-foreground);
  transition:background-color .12s ease,border-color .12s ease,box-shadow .12s ease;box-sizing:border-box;
}
.ds-checkbox__box svg{width:12px;height:12px;stroke-width:3;opacity:0;transform:scale(.6);transition:opacity .12s ease,transform .12s ease;}
.ds-checkbox input:checked + .ds-checkbox__box,
.ds-checkbox input:indeterminate + .ds-checkbox__box{background:var(--primary);border-color:var(--primary);}
.ds-checkbox input:checked + .ds-checkbox__box svg,
.ds-checkbox input:indeterminate + .ds-checkbox__box svg{opacity:1;transform:scale(1);}
.ds-checkbox input:focus-visible + .ds-checkbox__box{box-shadow:0 0 0 3px var(--ring);}
.ds-checkbox--disabled{opacity:.5;cursor:not-allowed;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "checkbox");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Checkbox — a single boolean control with optional inline label.
 */
function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  label,
  className = "",
  ...props
}) {
  inject();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const on = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onCheckedChange && onCheckedChange(e.target.checked);
  };
  const cls = ["ds-checkbox", disabled ? "ds-checkbox--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: handle
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "ds-checkbox__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, indeterminate ? /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }) : /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/selection/RadioGroup.jsx
try { (() => {
const CSS = `
.ds-radiogroup{display:flex;flex-direction:column;gap:10px;}
.ds-radiogroup--horizontal{flex-direction:row;gap:20px;}
.ds-radio{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:14px;color:var(--foreground);cursor:pointer;user-select:none;}
.ds-radio input{position:absolute;opacity:0;width:0;height:0;}
.ds-radio__dot{
  width:16px;height:16px;flex:none;border:1px solid var(--input);border-radius:50%;background:var(--background);
  display:flex;align-items:center;justify-content:center;transition:border-color .12s ease,box-shadow .12s ease;box-sizing:border-box;
}
.ds-radio__dot::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--primary);transform:scale(0);transition:transform .12s ease;}
.ds-radio input:checked + .ds-radio__dot{border-color:var(--primary);}
.ds-radio input:checked + .ds-radio__dot::after{transform:scale(1);}
.ds-radio input:focus-visible + .ds-radio__dot{box-shadow:0 0 0 3px var(--ring);}
.ds-radio--disabled{opacity:.5;cursor:not-allowed;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "radio");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * RadioGroup — a set of mutually-exclusive options.
 */
function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  options = [],
  name,
  className = "",
  children
}) {
  inject();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const groupName = name || React.useId();
  const select = v => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };
  const cls = ["ds-radiogroup", orientation === "horizontal" ? "ds-radiogroup--horizontal" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    role: "radiogroup"
  }, options.map(opt => {
    const o = typeof opt === "string" ? {
      value: opt,
      label: opt
    } : opt;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      className: "ds-radio" + (o.disabled ? " ds-radio--disabled" : "")
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      value: o.value,
      checked: current === o.value,
      disabled: o.disabled,
      onChange: () => select(o.value)
    }), /*#__PURE__*/React.createElement("span", {
      className: "ds-radio__dot"
    }), /*#__PURE__*/React.createElement("span", null, o.label));
  }), children);
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/selection/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-select{position:relative;display:inline-block;font-family:var(--font-sans);width:100%;}
.ds-select__trigger{
  display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;height:36px;padding:0 12px;
  font-size:14px;color:var(--foreground);background:var(--background);border:1px solid var(--input);
  border-radius:var(--radius-lg);cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease;box-sizing:border-box;outline:none;
}
.ds-select__trigger[data-placeholder="true"]{color:var(--muted-foreground);}
.ds-select__trigger:focus-visible,.ds-select__trigger[data-open="true"]{border-color:var(--ring);box-shadow:0 0 0 3px var(--ring);}
.ds-select__trigger:disabled{opacity:.5;cursor:not-allowed;}
.ds-select__chev{width:16px;height:16px;flex:none;color:var(--muted-foreground);transition:transform .15s ease;}
.ds-select__trigger[data-open="true"] .ds-select__chev{transform:rotate(180deg);}
.ds-select__menu{
  position:absolute;z-index:50;top:calc(100% + 4px);left:0;min-width:100%;max-height:280px;overflow:auto;
  background:var(--popover);color:var(--popover-foreground);border:1px solid var(--border);border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);padding:4px;box-sizing:border-box;
}
.ds-select__item{
  display:flex;align-items:center;gap:8px;height:34px;padding:0 8px 0 30px;font-size:14px;border-radius:var(--radius-md);
  cursor:pointer;position:relative;color:var(--popover-foreground);white-space:nowrap;
}
.ds-select__item:hover,.ds-select__item[data-active="true"]{background:var(--accent);color:var(--accent-foreground);}
.ds-select__item[aria-disabled="true"]{opacity:.5;pointer-events:none;}
.ds-select__check{position:absolute;left:8px;width:16px;height:16px;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "select");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Select — a dropdown for choosing a single option.
 */
function Select({
  value,
  defaultValue,
  onValueChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  className = "",
  ...props
}) {
  inject();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const selected = norm.find(o => o.value === current);
  const pick = v => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ds-select", className].filter(Boolean).join(" "),
    ref: ref
  }, props), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ds-select__trigger",
    "data-open": open,
    "data-placeholder": !selected,
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    "aria-haspopup": "listbox",
    "aria-expanded": open
  }, /*#__PURE__*/React.createElement("span", null, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("svg", {
    className: "ds-select__chev",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "ds-select__menu",
    role: "listbox"
  }, norm.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.value,
    className: "ds-select__item",
    role: "option",
    "aria-selected": o.value === current,
    "aria-disabled": o.disabled || undefined,
    "data-active": o.value === current,
    onClick: () => !o.disabled && pick(o.value)
  }, o.value === current && /*#__PURE__*/React.createElement("svg", {
    className: "ds-select__check",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Select.jsx", error: String((e && e.message) || e) }); }

// components/selection/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-slider{position:relative;height:20px;display:flex;align-items:center;width:100%;cursor:pointer;touch-action:none;}
.ds-slider__track{position:relative;height:6px;width:100%;border-radius:var(--radius-full);background:var(--secondary);overflow:hidden;}
.ds-slider__range{position:absolute;height:100%;background:var(--primary);border-radius:var(--radius-full);}
.ds-slider__thumb{
  position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:var(--background);
  border:1px solid var(--primary);box-shadow:var(--shadow-xs);transform:translate(-50%,-50%);transition:box-shadow .12s ease;
}
.ds-slider:focus-within .ds-slider__thumb{box-shadow:0 0 0 3px var(--ring);}
.ds-slider--disabled{opacity:.5;pointer-events:none;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "slider");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Slider — a single-value range control.
 */
function Slider({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  className = "",
  ...props
}) {
  inject();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const v = isControlled ? value : internal;
  const pct = (v - min) / (max - min) * 100;
  const handle = e => {
    const nv = Number(e.target.value);
    if (!isControlled) setInternal(nv);
    onValueChange && onValueChange(nv);
  };
  const cls = ["ds-slider", disabled ? "ds-slider--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: v,
    disabled: disabled,
    onChange: handle,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
      margin: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-slider__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-slider__range",
    style: {
      width: pct + "%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-slider__thumb",
    style: {
      left: pct + "%"
    }
  }));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Slider.jsx", error: String((e && e.message) || e) }); }

// components/selection/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ds-switch{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-sans);font-size:14px;color:var(--foreground);cursor:pointer;user-select:none;}
.ds-switch input{position:absolute;opacity:0;width:0;height:0;}
.ds-switch__track{
  width:36px;height:20px;flex:none;border-radius:var(--radius-full);background:var(--neutral-300);
  padding:2px;box-sizing:border-box;transition:background-color .15s ease,box-shadow .15s ease;
}
.ds-switch__thumb{width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:var(--shadow-xs);transform:translateX(0);transition:transform .15s ease;}
.ds-switch input:checked + .ds-switch__track{background:var(--primary);}
.ds-switch input:checked + .ds-switch__track .ds-switch__thumb{transform:translateX(16px);}
.ds-switch input:focus-visible + .ds-switch__track{box-shadow:0 0 0 3px var(--ring);}
.ds-switch--disabled{opacity:.5;cursor:not-allowed;}
`;
let injected = false;
function inject() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-ds", "switch");
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Switch — an on/off toggle.
 */
function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  label,
  className = "",
  ...props
}) {
  inject();
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const on = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onCheckedChange && onCheckedChange(e.target.checked);
  };
  const cls = ["ds-switch", disabled ? "ds-switch--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: on,
    disabled: disabled,
    onChange: handle
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "ds-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Switch.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonGroup = __ds_scope.ButtonGroup;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.LinkButton = __ds_scope.LinkButton;

__ds_ns.LoadingButton = __ds_scope.LoadingButton;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.AspectRatio = __ds_scope.AspectRatio;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Empty = __ds_scope.Empty;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.TableHeader = __ds_scope.TableHeader;

__ds_ns.TableBody = __ds_scope.TableBody;

__ds_ns.TableFooter = __ds_scope.TableFooter;

__ds_ns.TableRow = __ds_scope.TableRow;

__ds_ns.TableHead = __ds_scope.TableHead;

__ds_ns.TableCell = __ds_scope.TableCell;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Toaster = __ds_scope.Toaster;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.InputOTP = __ds_scope.InputOTP;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.NavigationMenu = __ds_scope.NavigationMenu;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Command = __ds_scope.Command;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.AlertDialog = __ds_scope.AlertDialog;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.HoverCard = __ds_scope.HoverCard;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

})();

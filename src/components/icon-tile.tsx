import { Icon, type IconName } from "@/components/icon";

export function IconTile({
  icon,
  tone = "var(--ac)",
  size = 44,
  r = 12,
}: {
  icon: IconName;
  tone?: string;
  size?: number;
  r?: number;
}) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: r, flex: "none",
        display: "grid", placeItems: "center", color: tone,
        background: `color-mix(in srgb, ${tone} 11%, var(--card))`,
        border: `1px solid color-mix(in srgb, ${tone} 22%, var(--card))`,
      }}
    >
      <Icon name={icon} size={size * 0.46} strokeWidth={2} />
    </div>
  );
}

import lockupDark from "@/assets/zero-kiosk-lockup-dark.png.asset.json";
import lockupLight from "@/assets/zero-kiosk-lockup-light.png.asset.json";
import cartMark from "@/assets/zero-kiosk-cart-mark.png.asset.json";
import markTeal from "@/assets/zero-kiosk-mark-teal.png.asset.json";

/** Official Zero Kiosk brand assets (CDN-hosted). */
export const brandAssets = {
  /** Full lockup on deep brand teal. */
  lockupOnTeal: lockupDark.url,
  /** Full lockup on light neutral background. */
  lockupOnLight: lockupLight.url,
  /** Square app mark: coral cart on brand teal. */
  markTeal: markTeal.url,
  /** Bare cart glyph on a light background. */
  cartMark: cartMark.url,
};

const markSizes = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-10 h-10 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
} as const;

/** Square brand mark: the official coral cart on the deep brand teal container. */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: keyof typeof markSizes;
  className?: string;
}) {
  return (
    <span
      className={`overflow-hidden bg-brand grid place-items-center shadow-soft shrink-0 ${markSizes[size]} ${className}`}
    >
      <img src={brandAssets.markTeal} alt="زيرو كشك" className="w-full h-full object-cover" />
    </span>
  );
}

/** Full horizontal lockup (Arabic wordmark + cart). */
export function BrandLockup({
  variant = "light",
  className = "",
  height = 36,
}: {
  variant?: "light" | "teal";
  className?: string;
  height?: number;
}) {
  return (
    <img
      src={variant === "teal" ? brandAssets.lockupOnTeal : brandAssets.lockupOnLight}
      alt="زيرو كشك"
      style={{ height }}
      className={`w-auto object-contain ${className}`}
    />
  );
}

/** Sidebar / drawer identity block: mark + Arabic name + tagline. */
export function BrandIdentity({
  tagline = "نظام تشغيل السوبرماركت",
  size = "md",
}: {
  tagline?: string;
  size?: keyof typeof markSizes;
}) {
  return (
    <>
      <BrandMark size={size} />
      <div className="leading-tight min-w-0">
        <div className="font-display font-semibold text-[15px] truncate">زيرو كشك</div>
        <div className="text-[11px] text-muted-foreground truncate">{tagline}</div>
      </div>
    </>
  );
}

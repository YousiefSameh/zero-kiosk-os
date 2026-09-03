import lockupDark from "@/assets/zero-kiosk-lockup-dark.png.asset.json";
import lockupLight from "@/assets/zero-kiosk-lockup-light.png.asset.json";
import cartMark from "@/assets/zero-kiosk-cart-mark.png.asset.json";

/** Official Zero Kiosk brand assets (CDN-hosted). */
export const brandAssets = {
  lockupOnTeal: lockupDark.url,
  lockupOnLight: lockupLight.url,
  cartMark: cartMark.url,
};

const markSizes = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-10 h-10 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
} as const;

/**
 * Square brand mark: the coral cart on the deep brand teal container.
 * Uses the official cart glyph, cropped so only the cart is visible.
 */
export function BrandMark({
  size = "md",
  className = "",
}: {
  size?: keyof typeof markSizes;
  className?: string;
}) {
  return (
    <span
      className={`relative overflow-hidden bg-brand grid place-items-center shadow-soft shrink-0 ${markSizes[size]} ${className}`}
      aria-hidden
    >
      <img
        src={brandAssets.cartMark}
        alt=""
        className="w-[132%] h-[132%] object-cover mix-blend-multiply"
        style={{ filter: "contrast(1.02)" }}
      />
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

/** Sidebar / header identity block: mark + Arabic name + tagline. */
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
      <div className="leading-tight">
        <div className="font-display font-semibold text-[15px]">زيرو كشك</div>
        <div className="text-[11px] text-muted-foreground">{tagline}</div>
      </div>
    </>
  );
}

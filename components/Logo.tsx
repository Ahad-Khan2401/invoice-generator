/* Brand logo — recreated as crisp inline SVG + wordmark so it scales
   sharply at any size and adds zero image-load cost (fast on slow nets).
   Colours match the brand: red "PDF", navy "Invoice", blue "Builder". */

const RED  = "#E5252B";
const NAVY = "#17243F";
const BLUE = "#1F6FE6";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* document */}
      <path d="M11 3.5h16.5L39 15v25.5a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V7.5a4 4 0 0 1 4-4z"
        fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
      {/* folded corner */}
      <path d="M27.5 3.5L39 15h-9.5a2 2 0 0 1-2-2V3.5z" fill={RED} />
      {/* PDF badge */}
      <rect x="9.5" y="13.5" width="20" height="9" rx="2.5" fill={RED} />
      <text x="19.5" y="20.4" textAnchor="middle" fontSize="6.6" fontWeight="800"
        fill="#fff" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.3">PDF</text>
      {/* table lines */}
      <rect x="11" y="27"   width="19" height="3"   rx="1.2" fill={BLUE} />
      <rect x="11" y="32"   width="19" height="2"   rx="1"   fill="#CBD5E1" />
      <rect x="11" y="36"   width="12" height="2"   rx="1"   fill="#CBD5E1" />
      {/* check badge */}
      <circle cx="35" cy="35" r="8" fill={BLUE} stroke="#fff" strokeWidth="2" />
      <path d="M31.4 35.2l2.3 2.3 4.1-4.7" stroke="#fff" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({
  size = 32,
  withText = true,
  className = "",
}: {
  size?: number;
  withText?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withText && (
        <span
          className="font-extrabold tracking-tight whitespace-nowrap leading-none"
          style={{ fontSize: Math.round(size * 0.52) }}
        >
          <span style={{ color: RED }}>PDF</span>
          <span style={{ color: NAVY }}> Invoice</span>
          <span style={{ color: BLUE }}> Builder</span>
        </span>
      )}
    </span>
  );
}

interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function WheelSvg({ className, style, 'aria-hidden': ariaHidden }: SvgProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden={ariaHidden as boolean}>
      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.6"/>
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.6"/>
      <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="0.4"/>
      <circle cx="100" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="0.4"/>
      <g stroke="currentColor" strokeWidth="0.5">
        <line x1="100" y1="5" x2="100" y2="22"/>
        <line x1="148" y1="17" x2="139" y2="32"/>
        <line x1="183" y1="52" x2="168" y2="61"/>
        <line x1="195" y1="100" x2="178" y2="100"/>
        <line x1="183" y1="148" x2="168" y2="139"/>
        <line x1="148" y1="183" x2="139" y2="168"/>
        <line x1="100" y1="195" x2="100" y2="178"/>
        <line x1="52" y1="183" x2="61" y2="168"/>
        <line x1="17" y1="148" x2="32" y2="139"/>
        <line x1="5" y1="100" x2="22" y2="100"/>
        <line x1="17" y1="52" x2="32" y2="61"/>
        <line x1="52" y1="17" x2="61" y2="32"/>
      </g>
      <g fontFamily="EB Garamond, serif" fontSize="11" fill="currentColor" textAnchor="middle">
        <text x="100" y="18">♈</text>
        <text x="148" y="32">♉</text>
        <text x="172" y="58">♊</text>
        <text x="184" y="104">♋</text>
        <text x="172" y="150">♌</text>
        <text x="148" y="174">♍</text>
        <text x="100" y="190">♎</text>
        <text x="52" y="174">♏</text>
        <text x="28" y="150">♐</text>
        <text x="16" y="104">♑</text>
        <text x="28" y="58">♒</text>
        <text x="52" y="32">♓</text>
      </g>
      <g transform="translate(100 100)">
        <path d="M0,-10 L2.5,-3 L10,-3 L4,2 L6,10 L0,5 L-6,10 L-4,2 L-10,-3 L-2.5,-3 Z" fill="currentColor"/>
      </g>
    </svg>
  );
}

export function SunSvg({ className, style, 'aria-hidden': ariaHidden }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden={ariaHidden as boolean}>
      <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="50" cy="50" r="3" fill="currentColor"/>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <line x1="50" y1="8" x2="50" y2="22"/>
        <line x1="50" y1="78" x2="50" y2="92"/>
        <line x1="8" y1="50" x2="22" y2="50"/>
        <line x1="78" y1="50" x2="92" y2="50"/>
        <line x1="20" y1="20" x2="30" y2="30"/>
        <line x1="80" y1="20" x2="70" y2="30"/>
        <line x1="20" y1="80" x2="30" y2="70"/>
        <line x1="80" y1="80" x2="70" y2="70"/>
      </g>
    </svg>
  );
}

export function MoonSvg({ className, style, 'aria-hidden': ariaHidden }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden={ariaHidden as boolean}>
      <path d="M 60 20 A 35 35 0 1 0 60 80 A 28 28 0 1 1 60 20 Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="32" cy="38" r="1.5" fill="currentColor"/>
      <circle cx="42" cy="62" r="1" fill="currentColor"/>
    </svg>
  );
}

export function StarSvg({ className, style, 'aria-hidden': ariaHidden }: SvgProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden={ariaHidden as boolean}>
      <g transform="translate(30 30)">
        <path d="M0,-25 L6,-7 L25,-7 L10,4 L16,25 L0,12 L-16,25 L-10,4 L-25,-7 L-6,-7 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle r="2" fill="currentColor"/>
      </g>
    </svg>
  );
}

export function OrnamentSvg({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 120 20" className={className} style={style}>
      <line x1="0" y1="10" x2="48" y2="10" stroke="currentColor" strokeWidth="0.6"/>
      <line x1="72" y1="10" x2="120" y2="10" stroke="currentColor" strokeWidth="0.6"/>
      <g transform="translate(60 10)">
        <circle r="1.5" fill="currentColor"/>
        <circle r="6" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}

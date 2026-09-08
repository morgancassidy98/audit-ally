type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  /** Pixel diameter of the avatar. */
  size?: number;
  className?: string;
};

// Deterministic palette so each user gets a stable color derived from their
// name/email, without needing a stored image. Hues chosen to read well on
// both light and dark surfaces.
const PALETTE: Array<{ bg: string; fg: string }> = [
  { bg: '#dbeafe', fg: '#1e40af' }, // blue
  { bg: '#dcfce7', fg: '#166534' }, // green
  { bg: '#fef3c7', fg: '#92400e' }, // amber
  { bg: '#fce7f3', fg: '#9d174d' }, // pink
  { bg: '#ede9fe', fg: '#5b21b6' }, // violet
  { bg: '#cffafe', fg: '#155e75' }, // cyan
  { bg: '#fee2e2', fg: '#991b1b' }, // red
  { bg: '#ecfccb', fg: '#3f6212' }, // lime
];

function initialsFor(name?: string | null, email?: string | null): string {
  const source = (name ?? '').trim();
  if (source) {
    const parts = source.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || 'U';
  }
  const emailLocal = (email ?? '').split('@')[0] ?? '';
  return (emailLocal[0] ?? 'U').toUpperCase();
}

function colorIndex(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % PALETTE.length;
}

/**
 * Avatar that renders the user's image when present, otherwise a colored
 * initials circle so email/demo accounts (which have no image) still get a
 * recognizable, accessible profile marker.
 */
export function UserAvatar({ name, email, image, size = 80, className }: Props) {
  const label = name ?? email ?? 'User';

  if (image) {
    return (
      <img
        className={className}
        src={image}
        alt={label}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    );
  }

  const { bg, fg } = PALETTE[colorIndex((name ?? email ?? 'user').toLowerCase())];
  const initials = initialsFor(name, email);

  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: fg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: Math.round(size * 0.42),
        lineHeight: 1,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </span>
  );
}

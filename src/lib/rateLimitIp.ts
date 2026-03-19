const ipHits = new Map<string, { count: number; ts: number }>();

export function isRateLimited(
  ip: string,
  windowMs: number,
  maxReqs: number,
): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now - rec.ts > windowMs) {
    ipHits.set(ip, { count: 1, ts: now });
    return false;
  }
  if (rec.count >= maxReqs) return true;
  rec.count += 1;

  // Purge stale entries to prevent unbounded memory growth
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (now - v.ts > windowMs) ipHits.delete(k);
    }
  }

  return false;
}

/**
 * Returns the real client IP.
 * On Vercel, x-real-ip is set by the platform to the actual client IP and cannot be spoofed.
 * Falls back to the *last* value in x-forwarded-for (set by the trusted edge proxy),
 * never the first (which is attacker-controlled).
 */
export function getClientIp(req: { headers: Headers }): string {
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((s) => s.trim()).filter(Boolean);
    const last = ips[ips.length - 1];
    if (last) return last;
  }

  return 'unknown';
}

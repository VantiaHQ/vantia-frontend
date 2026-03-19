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
  return false;
}

export function getClientIp(req: { headers: Headers }): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

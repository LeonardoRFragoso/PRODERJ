import type { VercelRequest } from '@vercel/node';
import crypto from 'crypto';

// === CONFIG ===

const LIMITS = {
  IP: {
    perHour: 20,
    perDay: 50,
  },
  TOKEN: {
    perHour: 30,
    perDay: 100,
  },
};

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// === IN-MEMORY STORE ===

interface RequestRecord {
  timestamp: number;
}

const ipStore = new Map<string, RequestRecord[]>();
const tokenStore = new Map<string, RequestRecord[]>();

function pruneOldEntries(entries: RequestRecord[], now: number): RequestRecord[] {
  return entries.filter(e => now - e.timestamp < DAY_MS);
}

function countInWindow(entries: RequestRecord[], now: number, windowMs: number): number {
  return entries.filter(e => now - e.timestamp < windowMs).length;
}

// === IP HASHING ===

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'] as string | undefined;
  if (realIp) return realIp;
  return req.socket?.remoteAddress || 'unknown';
}

// === RATE LIMIT CHECK ===

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  ipHash: string;
  ipHourCount: number;
  ipDayCount: number;
  tokenHourCount: number;
  tokenDayCount: number;
}

export function checkRateLimit(req: VercelRequest): RateLimitResult {
  const now = Date.now();
  const ip = getClientIp(req);
  const ipKey = hashIp(ip);
  const token = req.headers['x-ai-admin-token'] as string | undefined;
  const tokenKey = token ? hashIp(token) : 'none';

  // Prune and count IP
  const ipEntries = pruneOldEntries(ipStore.get(ipKey) || [], now);
  const ipHourCount = countInWindow(ipEntries, now, HOUR_MS);
  const ipDayCount = ipEntries.length;

  // Prune and count token
  const tokenEntries = pruneOldEntries(tokenStore.get(tokenKey) || [], now);
  const tokenHourCount = countInWindow(tokenEntries, now, HOUR_MS);
  const tokenDayCount = tokenEntries.length;

  // Check IP limits
  if (ipHourCount >= LIMITS.IP.perHour) {
    return {
      allowed: false,
      reason: 'Limite de geração atingido por IP (hora). Tente novamente mais tarde.',
      ipHash: ipKey,
      ipHourCount,
      ipDayCount,
      tokenHourCount,
      tokenDayCount,
    };
  }

  if (ipDayCount >= LIMITS.IP.perDay) {
    return {
      allowed: false,
      reason: 'Limite de geração atingido por IP (dia). Tente novamente amanhã.',
      ipHash: ipKey,
      ipHourCount,
      ipDayCount,
      tokenHourCount,
      tokenDayCount,
    };
  }

  // Check token limits
  if (tokenHourCount >= LIMITS.TOKEN.perHour) {
    return {
      allowed: false,
      reason: 'Limite de geração atingido (hora). Tente novamente mais tarde.',
      ipHash: ipKey,
      ipHourCount,
      ipDayCount,
      tokenHourCount,
      tokenDayCount,
    };
  }

  if (tokenDayCount >= LIMITS.TOKEN.perDay) {
    return {
      allowed: false,
      reason: 'Limite de geração atingido (dia). Tente novamente amanhã.',
      ipHash: ipKey,
      ipHourCount,
      ipDayCount,
      tokenHourCount,
      tokenDayCount,
    };
  }

  // Record this request
  ipEntries.push({ timestamp: now });
  ipStore.set(ipKey, ipEntries);

  tokenEntries.push({ timestamp: now });
  tokenStore.set(tokenKey, tokenEntries);

  return {
    allowed: true,
    ipHash: ipKey,
    ipHourCount: ipHourCount + 1,
    ipDayCount: ipDayCount + 1,
    tokenHourCount: tokenHourCount + 1,
    tokenDayCount: tokenDayCount + 1,
  };
}

// === SECURE LOGGING ===

export interface LogEntry {
  timestamp: string;
  endpoint: string;
  status: number;
  quantity?: number;
  ipHash: string;
  model: string;
  success: boolean;
  errorType?: string;
}

export function secureLog(entry: LogEntry): void {
  const safe = {
    timestamp: entry.timestamp,
    endpoint: entry.endpoint,
    status: entry.status,
    quantity: entry.quantity,
    ipHash: entry.ipHash,
    model: entry.model,
    success: entry.success,
    errorType: entry.errorType,
  };
  console.log(JSON.stringify(safe));
}

// === ADMIN TOKEN CHECK ===

export function checkAdminToken(req: VercelRequest): boolean {
  const expected = process.env.AI_ADMIN_TOKEN;
  if (!expected) return false;
  const provided = req.headers['x-ai-admin-token'] as string | undefined;
  if (!provided) return false;
  return provided === expected;
}

// === EXPORT LIMITS FOR HEALTH CHECK ===

export function getRateLimitConfig() {
  return {
    enabled: true,
    ipHourly: LIMITS.IP.perHour,
    ipDaily: LIMITS.IP.perDay,
    tokenHourly: LIMITS.TOKEN.perHour,
    tokenDaily: LIMITS.TOKEN.perDay,
  };
}

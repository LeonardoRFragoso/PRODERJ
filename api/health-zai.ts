import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRateLimitConfig, getModelConfig } from './_lib/rateLimiter.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKeyConfigured = !!process.env.ZAI_API_KEY;
  const baseUrlConfigured = !!process.env.ZAI_BASE_URL;
  const adminProtectionConfigured = !!process.env.AI_ADMIN_TOKEN;
  const rateLimitConfig = getRateLimitConfig();
  const modelConfig = getModelConfig();

  return res.status(200).json({
    configured: apiKeyConfigured && baseUrlConfigured,
    apiKeyConfigured,
    adminProtectionConfigured,
    baseUrlConfigured,
    model: modelConfig.model,
    fallbackModel: modelConfig.fallbackModel,
    freeModelMode: modelConfig.freeModelMode,
    rateLimitEnabled: rateLimitConfig.enabled,
    rateLimits: {
      ipHourly: rateLimitConfig.ipHourly,
      ipDaily: rateLimitConfig.ipDaily,
      tokenHourly: rateLimitConfig.tokenHourly,
      tokenDaily: rateLimitConfig.tokenDaily,
    },
  });
}

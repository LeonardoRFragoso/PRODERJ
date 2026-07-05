import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKeyConfigured = !!process.env.ZAI_API_KEY;
  const baseUrlConfigured = !!process.env.ZAI_BASE_URL;
  const model = process.env.ZAI_MODEL || 'glm-5.2';

  return res.status(200).json({
    configured: apiKeyConfigured && baseUrlConfigured,
    model,
    baseUrlConfigured,
    apiKeyConfigured,
  });
}

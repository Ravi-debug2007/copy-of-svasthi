import { GoogleGenAI } from '@google/genai';

const crisisPattern = /\b(suicide|kill myself|end my life|self[- ]?harm|hurt myself|want to die)\b/i;

const systemInstruction = `You are Dawn, a warm and concise mental-wellness companion.
Offer empathetic reflection, gentle grounding ideas, and practical next steps.
Do not diagnose conditions, prescribe treatment, or claim to replace a licensed professional.
If someone mentions immediate danger, suicide, self-harm, or harming others, encourage urgent local emergency help and, for India, Tele-MANAS at 14416. Keep answers under 180 words.`;

type VercelRequest = { method?: string; body?: unknown };
type VercelResponse = { status: (code: number) => VercelResponse; json: (body: unknown) => void };

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { message } = (request.body || {}) as { message?: unknown };
  if (typeof message !== 'string' || !message.trim()) {
    return response.status(400).json({ error: 'Please share a message first.' });
  }

  if (crisisPattern.test(message)) {
    return response.status(200).json({
      crisis: true,
      phone: '14416',
      reply: 'I’m really glad you told me. You deserve immediate, human support. If you may act on these thoughts or are in immediate danger, please call local emergency services now or contact Tele-MANAS in India at 14416. If possible, stay with someone you trust while you reach out.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'Dawn is not configured yet. Add GEMINI_API_KEY in Vercel to enable secure AI conversations.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: message.trim(),
      config: { systemInstruction, maxOutputTokens: 300, temperature: 0.7 },
    });
    return response.status(200).json({ reply: result.text || 'I’m here with you. Would you like to share a little more about what feels most present right now?', crisis: false });
  } catch {
    return response.status(502).json({ error: 'Dawn could not respond right now. Please try again in a moment.' });
  }
}

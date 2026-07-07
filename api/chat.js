/**
 * Vercel 서버리스 함수 — Upstage Chat Completions 프록시
 * 요청 body의 messages 배열을 Upstage에 전달하고 응답 JSON을 그대로 반환
 */

const UPSTAGE_API_URL = 'https://api.upstage.ai/v1/chat/completions';
const UPSTAGE_MODEL = 'solar-pro3';

module.exports = async function handler(req, res) {
  /* POST만 허용 */
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  const apiKey = process.env.UPSTAGE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: { message: 'Server configuration error: UPSTAGE_API_KEY is not set.' }
    });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({
      error: { message: 'Request body must include a messages array.' }
    });
  }

  try {
    const upstageResponse = await fetch(UPSTAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: UPSTAGE_MODEL,
        messages: messages
      })
    });

    const text = await upstageResponse.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      return res.status(502).json({
        error: { message: 'Invalid response from Upstage API.' }
      });
    }

    return res.status(upstageResponse.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: { message: 'Failed to reach Upstage API.' }
    });
  }
};

const apiBaseUrl = (import.meta.env.VITE_SVASTHI_API_URL || "http://localhost:3001").replace(/\/$/, "");
const sessionStorageKey = "svasthi-session-id";

function sessionId() {
  const existing = window.localStorage.getItem(sessionStorageKey);
  if (existing) return existing;
  const created = crypto.randomUUID();
  window.localStorage.setItem(sessionStorageKey, created);
  return created;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: { "content-type": "application/json", "x-svasthi-session": sessionId(), ...init.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Svasthi could not complete that request.");
  return body as T;
}

export function saveCheckIn(input: { mood: number; stress: number; energy: number; sleepHours: number; contexts: string[] }) {
  return request<{ checkIn: { id: string } }>("/api/check-ins", { method: "POST", body: JSON.stringify(input) });
}

export function sendChatMessage(message: string) {
  return request<{ reply: string; crisis: boolean; phone?: string }>("/api/chat", { method: "POST", body: JSON.stringify({ message }) });
}

export function saveJournal(transcript: string) {
  return request<{ journal: { id: string } }>("/api/journals", { method: "POST", body: JSON.stringify({ transcript, consent: true, features: { durationSeconds: 0, pauseRatio: 0, speakingRateWpm: 0 } }) });
}

export function createInsight(checkInId: string, journalId: string) {
  return request<{ insight: { title: string; suggestion: string; evidence: string[]; crisis: boolean; phone?: string } }>("/api/insights", { method: "POST", body: JSON.stringify({ checkInId, journalId }) });
}

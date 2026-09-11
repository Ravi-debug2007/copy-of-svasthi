// In production this resolves to Vercel's same-origin API route. Set the variable
// only when using a separate local Svasthi API during development.
const apiBaseUrl = (import.meta.env.VITE_SVASTHI_API_URL || "").replace(/\/$/, "");
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

export type Habit = { id: string; title: string; time: string; done: boolean; icon: string };
export type Dashboard = { stats: { streakDays: number; avgSleepHours: number; wellnessScore: number; completedHabits: number; habitCount: number }; currentCheckIn: { mood: number; stress: number; sleepHours: number } | null };

export function getDashboard() {
  return request<Dashboard>("/api/dashboard");
}

export function getHabits() {
  return request<{ habits: Habit[] }>("/api/habits");
}

export function toggleHabit(id: string) {
  return request<{ habit: Habit }>("/api/habits", { method: "PATCH", body: JSON.stringify({ id }) });
}

export function saveScreening(input: { title: string; score: number; maxScore: number; statusLabel: string }) {
  return request<{ screening: { id: string } }>("/api/screenings", { method: "POST", body: JSON.stringify(input) });
}

export function logActivity(type: string) {
  return request<{ activity: { id: string } }>("/api/activities", { method: "POST", body: JSON.stringify({ type }) });
}

export const SESSIONS_KEY = "ai_chat_sessions_v1";
export const ACTIVE_KEY = "ai_chat_active_session_v1";

export function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadSessions", e);
    return [];
  }
}

export function saveSessions(sessions) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function loadActiveSessionId() {
  return localStorage.getItem(ACTIVE_KEY);
}

export function saveActiveSessionId(id) {
  localStorage.setItem(ACTIVE_KEY, id);
}

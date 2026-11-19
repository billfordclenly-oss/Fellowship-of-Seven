const SAVE_VERSION = 1;
const SAVE_KEY = 'fellowship_save_v1';
const SOUND_KEY = 'fellowship_sound';

const DEFAULT_SAVE = {
  version: SAVE_VERSION,
  unlockedCheckpoints: [0],
  completedCheckpoints: [],
  collectedTokens: [],
  bestScores: {},
  totalStartTime: null,
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    const data = JSON.parse(raw);
    if (data.version !== SAVE_VERSION) return { ...DEFAULT_SAVE };
    return { ...DEFAULT_SAVE, ...data };
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...data, version: SAVE_VERSION }));
  } catch {}
}

export function resetProgress() {
  try { localStorage.removeItem(SAVE_KEY); } catch {}
}

export function getSoundEnabled() {
  try {
    const v = localStorage.getItem(SOUND_KEY);
    return v === null ? true : v === 'true';
  } catch { return true; }
}

export function setSoundEnabled(val) {
  try { localStorage.setItem(SOUND_KEY, String(val)); } catch {}
}

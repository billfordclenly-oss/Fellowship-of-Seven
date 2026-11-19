import { useState, useCallback } from 'react';
import { loadProgress, saveProgress, resetProgress } from '../utils/storage';
import { CHECKPOINTS } from '../data/checkpoints';

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress());

  const updateProgress = useCallback((updater) => {
    setProgress(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeCheckpoint = useCallback((id) => {
    updateProgress(prev => {
      const completedCheckpoints = prev.completedCheckpoints.includes(id)
        ? prev.completedCheckpoints
        : [...prev.completedCheckpoints, id];
      const nextId = id + 1;
      const unlockedCheckpoints = (nextId < CHECKPOINTS.length && !prev.unlockedCheckpoints.includes(nextId))
        ? [...prev.unlockedCheckpoints, nextId]
        : prev.unlockedCheckpoints;
      const token = CHECKPOINTS[id]?.token;
      const collectedTokens = (token && !prev.collectedTokens.includes(token))
        ? [...prev.collectedTokens, token]
        : prev.collectedTokens;
      return { ...prev, completedCheckpoints, unlockedCheckpoints, collectedTokens };
    });
  }, [updateProgress]);

  const isUnlocked = useCallback((id) => progress.unlockedCheckpoints.includes(id), [progress]);
  const isCompleted = useCallback((id) => progress.completedCheckpoints.includes(id), [progress]);
  const isAllCompleted = progress.completedCheckpoints.length === CHECKPOINTS.length;

  const resetAll = useCallback(() => {
    resetProgress();
    setProgress(loadProgress());
  }, []);

  const setBestScore = useCallback((gameId, score) => {
    updateProgress(prev => ({
      ...prev,
      bestScores: {
        ...prev.bestScores,
        [gameId]: Math.max(prev.bestScores[gameId] || 0, score)
      }
    }));
  }, [updateProgress]);

  return { progress, completeCheckpoint, isUnlocked, isCompleted, isAllCompleted, resetAll, reset: resetAll, setBestScore };
}

import React, { useState, useEffect } from 'react';
import { ExerciseItem } from '../types';
import { playSingingBowlChime, toggleDrone432Hz } from '../utils/audio';

interface MediaModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ exercise, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (exercise) {
      setIsPlaying(true);
      setSecondsElapsed(0);
      playSingingBowlChime(432);
      toggleDrone432Hz(true);
    }
    return () => {
      toggleDrone432Hz(false);
    };
  }, [exercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && exercise) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, exercise]);

  if (!exercise) return null;

  const togglePlayback = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    toggleDrone432Hz(next);
    if (next) playSingingBowlChime(432);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md md:max-w-lg bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-primary/10 animate-scaleUp">
        {/* Cover / Visualizer */}
        <div
          className="relative w-full h-56 md:h-64 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url('${exercise.imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => {
              toggleDrone432Hz(false);
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Center Play/Pause button */}
          <button
            onClick={togglePlayback}
            className="relative z-10 w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[32px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Live resonance indicator */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span>432Hz Restorative Acoustic Soundscape Active</span>
          </div>
        </div>

        {/* Content & Controls */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                {exercise.author}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {formatTime(secondsElapsed)} / {exercise.duration}
              </span>
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mt-0.5">
              {exercise.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {exercise.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (secondsElapsed / 180) * 100)}%` }}
            ></div>
          </div>

          {/* Audio Chime Prompt */}
          <div className="bg-surface-container p-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                graphic_eq
              </span>
              <span className="text-xs font-semibold text-primary">Tibetan Singing Bowl Bell</span>
            </div>
            <button
              onClick={() => playSingingBowlChime(432)}
              className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold shadow-xs active:scale-95 cursor-pointer hover:bg-primary-container transition-colors"
            >
              Ring Bell
            </button>
          </div>

          <button
            onClick={() => {
              toggleDrone432Hz(false);
              onClose();
            }}
            className="w-full py-3 rounded-full bg-surface-container-high text-primary font-bold text-xs hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            Finished Session
          </button>
        </div>
      </div>
    </div>
  );
};

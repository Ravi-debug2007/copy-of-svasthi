import React, { useState, useEffect, useRef } from 'react';
import { ASSETS, INITIAL_EXERCISES } from '../../data/mockData';
import { ScreenType, ExerciseItem } from '../../types';
import { playSingingBowlChime, toggleDrone432Hz } from '../../utils/audio';
import { BreathLeavesArt, BotanicalBranch } from '../illustrations/IndieIllustrations';

interface ExercisesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onPlayExercise?: (exercise: ExerciseItem) => void;
}

export const ExercisesScreen: React.FC<ExercisesScreenProps> = ({ onNavigate, onPlayExercise }) => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'grounding' | 'meditation'>('breathing');

  // Breathing state
  const [pattern, setPattern] = useState<'box' | 'relax'>('box');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(3);
  const maxCycles = 6;
  const [chimeEnabled, setChimeEnabled] = useState<boolean>(true);

  // Grounding items checked state
  const [groundingState, setGroundingState] = useState<Record<number, boolean>>({
    5: true,
    4: true,
    3: false,
    2: false,
    1: false
  });

  const boxSteps = [
    { label: 'Inhale', duration: 4, scale: 1.2 },
    { label: 'Hold', duration: 4, scale: 1.2 },
    { label: 'Exhale', duration: 4, scale: 0.9 },
    { label: 'Hold', duration: 4, scale: 0.9 }
  ];

  const relaxSteps = [
    { label: 'Inhale', duration: 4, scale: 1.25 },
    { label: 'Hold', duration: 7, scale: 1.25 },
    { label: 'Exhale', duration: 8, scale: 0.88 }
  ];

  const currentSteps = pattern === 'box' ? boxSteps : relaxSteps;
  const currentStep = currentSteps[stepIndex] || currentSteps[0];

  const breathingRef = useRef<HTMLDivElement>(null);
  const groundingRef = useRef<HTMLDivElement>(null);
  const meditationRef = useRef<HTMLDivElement>(null);

  // Breathwork cadence timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setStepIndex((sIdx) => {
              const nextIdx = (sIdx + 1) % currentSteps.length;
              if (nextIdx === 0) {
                setCycleCount((c) => (c >= maxCycles ? 1 : c + 1));
              }
              if (chimeEnabled) {
                playSingingBowlChime(nextIdx === 0 ? 432 : 528);
              }
              return nextIdx;
            });
            return currentSteps[(stepIndex + 1) % currentSteps.length]?.duration || 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSteps, stepIndex, chimeEnabled]);

  const handleSelectPattern = (newPattern: 'box' | 'relax') => {
    setPattern(newPattern);
    setStepIndex(0);
    setTimer(newPattern === 'box' ? 4 : 4);
    if (chimeEnabled) playSingingBowlChime(432);
  };

  const toggleChime = () => {
    const next = !chimeEnabled;
    setChimeEnabled(next);
    if (next) playSingingBowlChime(432);
  };

  const handleTabClick = (tab: 'breathing' | 'grounding' | 'meditation') => {
    setActiveTab(tab);
    if (tab === 'breathing') {
      breathingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'grounding') {
      groundingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'meditation') {
      meditationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleGroundingItem = (num: number) => {
    setGroundingState((prev) => ({ ...prev, [num]: !prev[num] }));
    if (!groundingState[num] && chimeEnabled) {
      playSingingBowlChime(528);
    }
  };

  const cyclePercent = Math.round((cycleCount / maxCycles) * 100);

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Screen Intro / Gentle Warm Pastel Header with Hand-drawn Art */}
      <section className="w-full bg-[#E7F0E8] rounded-3xl p-5 sm:p-6 shadow-xs border border-[#D0E2D3] flex items-center justify-between relative overflow-hidden">
        <div className="flex flex-col gap-1.5 relative z-10 max-w-md">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/80 text-[#25462D] text-xs font-bold shadow-2xs">
            <span className="material-symbols-outlined text-[16px] text-[#3B6346]">spa</span>
            <span>Daily Somatic Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-[#1E3E26] tracking-tight">
            Interactive Somatic Exercises
          </h1>
          <p className="text-xs sm:text-sm text-[#385B41] leading-relaxed">
            Box breathing (4-4-4-4), deep parasympathetic resets & 5-4-3-2-1 sensory grounding.
          </p>
        </div>
        <div className="flex-shrink-0 relative z-10 hidden sm:block">
          <BreathLeavesArt className="w-20 h-20" />
        </div>
      </section>

      {/* Mode Selector Tabs (Soft Pill Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist">
        <button
          onClick={() => handleTabClick('breathing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
            activeTab === 'breathing'
              ? 'bg-[#2C2533] text-white shadow-xs'
              : 'bg-[#F4EFE6] text-primary hover:bg-[#EAE2D3]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">air</span>
          <span>Guided Breathing</span>
        </button>
        <button
          onClick={() => handleTabClick('grounding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
            activeTab === 'grounding'
              ? 'bg-[#2C2533] text-white shadow-xs'
              : 'bg-[#F4EFE6] text-primary hover:bg-[#EAE2D3]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">nature_people</span>
          <span>5-4-3-2-1 Grounding</span>
        </button>
        <button
          onClick={() => handleTabClick('meditation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
            activeTab === 'meditation'
              ? 'bg-[#2C2533] text-white shadow-xs'
              : 'bg-[#F4EFE6] text-primary hover:bg-[#EAE2D3]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">self_improvement</span>
          <span>Yoga & Meditation</span>
        </button>
      </div>

      {/* Interactive Somatic Tools Container (1-col mobile, 2-cols desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* SECTION 1: Active Breathing Widget (Live Pulse Circle) */}
        <section
          ref={breathingRef}
          className="flex flex-col gap-3.5 bg-[#F5EFEB] p-5 sm:p-6 rounded-3xl shadow-sm border border-[#E8DFC8] h-full"
        >
          {/* Breathing Mode Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full text-xs font-semibold text-primary">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>
                {pattern === 'box' ? 'Box Breathing (4-4-4-4)' : 'Relaxing Breath (4-7-8)'}
              </span>
            </div>
            <button
              onClick={toggleChime}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-medium hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">
                {chimeEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span className="truncate max-w-[130px]">
                {chimeEnabled ? 'Singing bowl active' : 'Muted'}
              </span>
            </button>
          </div>

          {/* Breath Cycle Visualizer Canvas / Concentric Orb */}
          <div className="relative w-full aspect-square max-h-[290px] flex items-center justify-center my-2 overflow-hidden rounded-2xl bg-surface-container/50 border border-primary/5">
            {/* Outer soft ambient ring */}
            <div
              className="absolute w-64 h-64 rounded-full bg-surface-variant/40 transition-all duration-1000 ease-in-out"
              style={{
                transform: `scale(${currentStep.label === 'Inhale' ? 1.15 : currentStep.label === 'Exhale' ? 0.85 : 1.0})`
              }}
            ></div>

            {/* Mid blush ring */}
            <div
              className="absolute w-48 h-48 rounded-full bg-secondary-fixed/50 transition-all duration-1000 ease-in-out shadow-[0_0_30px_rgba(253,193,117,0.3)]"
              style={{
                transform: `scale(${currentStep.label === 'Inhale' ? 1.2 : currentStep.label === 'Exhale' ? 0.9 : 1.0})`
              }}
            ></div>

            {/* Core plum/lilac interactive sphere */}
            <div
              className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-primary via-primary-container to-surface-tint flex flex-col items-center justify-center text-center p-3 text-on-primary shadow-[0_12px_28px_-4px_rgba(49,15,40,0.35)] transition-all duration-1000 ease-in-out"
              style={{
                transform: `scale(${currentStep.label === 'Inhale' ? 1.22 : currentStep.label === 'Exhale' ? 0.92 : 1.0})`
              }}
            >
              <span className="font-headline text-lg font-bold tracking-wide leading-tight drop-shadow-sm">
                {currentStep.label}
              </span>
              <span className="font-headline text-3xl font-bold leading-none mt-1">
                {timer}s
              </span>
              <span className="text-[9px] font-bold text-primary-fixed-dim/90 mt-1 uppercase tracking-widest">
                SOMA FOCUS
              </span>
            </div>

            {/* Orbiting guidance dots */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div
                className="w-60 h-60 rounded-full border border-dashed border-outline-variant/30 flex items-start justify-center animate-spin"
                style={{ animationDuration: '24s' }}
              >
                <div className="w-3 h-3 rounded-full bg-secondary -mt-1.5 shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Cycle Completion Tracker & Status Bar */}
          <div className="flex flex-col gap-1.5 bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">autorenew</span>
                <span>Cycle {cycleCount} of {maxCycles} completed</span>
              </span>
              <span className="font-bold text-primary">{cyclePercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary-container via-secondary to-primary rounded-full transition-all duration-500"
                style={{ width: `${cyclePercent}%` }}
              ></div>
            </div>
          </div>

          {/* Breathing Pattern Selectors */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => handleSelectPattern('box')}
              className={`flex flex-col items-start p-3 rounded-xl shadow-sm transition-all duration-200 text-left cursor-pointer border ${
                pattern === 'box'
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high border-primary/5'
              }`}
            >
              <span className="text-xs font-bold">Box Breathing</span>
              <span className={`text-[11px] mt-0.5 ${pattern === 'box' ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                4-4-4-4 Cadence
              </span>
            </button>

            <button
              onClick={() => handleSelectPattern('relax')}
              className={`flex flex-col items-start p-3 rounded-xl shadow-sm transition-all duration-200 text-left cursor-pointer border ${
                pattern === 'relax'
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high border-primary/5'
              }`}
            >
              <span className="text-xs font-bold">Relaxing Breath</span>
              <span className={`text-[11px] mt-0.5 ${pattern === 'relax' ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                4-7-8 Parasympathetic
              </span>
            </button>
          </div>

          {/* Primary Control Action Button */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-on-primary font-semibold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'Pause Breathwork' : 'Resume Breathwork'}</span>
            </button>
            <button
              onClick={() => {
                setStepIndex(0);
                setTimer(currentSteps[0].duration);
                setCycleCount(1);
                if (chimeEnabled) playSingingBowlChime(432);
              }}
              className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors flex-shrink-0 cursor-pointer"
              title="Reset Cycle"
            >
              <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: 5-4-3-2-1 Sensory Grounding Tool Card */}
        <section
          ref={groundingRef}
          className="flex flex-col gap-3.5 bg-surface-container-low p-5 rounded-2xl shadow-[0_8px_24px_-4px_rgba(73,36,62,0.08)] border border-primary/5 h-full"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                Somatic Anchor
              </span>
              <h2 className="font-headline text-lg font-bold text-primary">
                5-4-3-2-1 Sensory Grounding
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Reconnect with the physical here-and-now when thoughts feel turbulent.
          </p>

          {/* Checklist Items */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Item 5: See */}
            <div
              onClick={() => toggleGroundingItem(5)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                groundingState[5]
                  ? 'bg-surface-container border-primary/10'
                  : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center flex-shrink-0 text-lg">
                  👁️
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary">5 things you can see</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Look around and quietly name them
                  </span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  groundingState[5] ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>

            {/* Item 4: Touch */}
            <div
              onClick={() => toggleGroundingItem(4)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                groundingState[4]
                  ? 'bg-surface-container border-primary/10'
                  : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center flex-shrink-0 text-lg">
                  ✋
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary">4 things you can touch</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Feel your chair, ring, or clothing
                  </span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  groundingState[4] ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>

            {/* Item 3: Hear */}
            <div
              onClick={() => toggleGroundingItem(3)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                groundingState[3]
                  ? 'bg-secondary-fixed/50 border-secondary/20 shadow-xs'
                  : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 text-lg">
                  👂
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary">3 things you can hear</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Distant traffic, subtle breeze, breathing
                  </span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  groundingState[3] ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>

            {/* Item 2: Smell */}
            <div
              onClick={() => toggleGroundingItem(2)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                groundingState[2]
                  ? 'bg-surface-container border-primary/10'
                  : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-surface-variant text-primary flex items-center justify-center flex-shrink-0 text-lg">
                  👃
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary">2 things you can smell</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Coffee, rain, skin, or fresh air
                  </span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  groundingState[2] ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>

            {/* Item 1: Taste */}
            <div
              onClick={() => toggleGroundingItem(1)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                groundingState[1]
                  ? 'bg-surface-container border-primary/10'
                  : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-surface-variant text-primary flex items-center justify-center flex-shrink-0 text-lg">
                  👅
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary">1 thing you can taste</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Cool water, mint, or the present moment
                  </span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  groundingState[1] ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 3: Video Exercise Library (Multi-Column Grid on Tablet/Desktop) */}
      <section ref={meditationRef} className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <h2 className="font-headline text-base md:text-lg font-bold text-primary">
              Curated Wellness Library
            </h2>
            <p className="text-xs text-on-surface-variant">
              Somatic sequences & guided restorative soundscapes
            </p>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">
            smart_display
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_EXERCISES.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl bg-surface-container-low overflow-hidden shadow-[0_8px_24px_-4px_rgba(73,36,62,0.08)] border border-primary/5 hover:shadow-md transition-shadow"
            >
              <div
                className="relative w-full h-44 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
                <div className="absolute top-3 left-3 bg-primary/90 text-on-primary px-3 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-md">
                  <span className="material-symbols-outlined text-[14px]">
                    {item.category === 'Yoga' ? 'verified' : item.category === 'Meditation' ? 'nightlight' : 'graphic_eq'}
                  </span>
                  <span>{item.author}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">
                  {item.duration}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onPlayExercise) onPlayExercise(item);
                    else {
                      playSingingBowlChime(432);
                      toggleDrone432Hz(true);
                      alert(`Now playing "${item.title}". Enjoy the soothing 432Hz acoustic ambiance.`);
                    }
                  }}
                  aria-label={`Play ${item.title}`}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-surface-container-lowest/90 text-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[26px]">play_arrow</span>
                </button>
              </div>

              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <h3 className="font-headline text-base font-bold text-primary">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-primary/5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

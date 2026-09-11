import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { saveCheckIn } from '../../services/svasthi';
import {
  MindfulMeditationArt,
  DawnCompanionArt,
  BreathLeavesArt,
  JournalPenArt,
  BotanicalBranch,
  StarDoodle,
} from '../illustrations/IndieIllustrations';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickCalm?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenQuickCalm }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodToast, setMoodToast] = useState<string | null>(null);
  const [breathCount, setBreathCount] = useState<number>(0);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  const moods = [
    { label: 'Joyful', emoji: '🌿', val: 'Joyful', color: 'bg-[#E3EFE6] text-[#284E33]' },
    { label: 'Calm', emoji: '☁️', val: 'Calm', color: 'bg-[#EBEBF7] text-[#3B396B]' },
    { label: 'Neutral', emoji: '🍃', val: 'Neutral', color: 'bg-[#F2ECE1] text-[#554C3E]' },
    { label: 'Heavy', emoji: '🌧️', val: 'Low', color: 'bg-[#F5E6EC] text-[#69394E]' },
    { label: 'Anxious', emoji: '⚡', val: 'Stressed', color: 'bg-[#FAECE4] text-[#7A4330]' },
  ];

  const handleSelectMood = async (moodName: string) => {
    setSelectedMood(moodName);
    const moodValues: Record<string, number> = { Joyful: 5, Calm: 4, Neutral: 3, Low: 2, Stressed: 2 };
    try {
      const result = await saveCheckIn({ mood: moodValues[moodName] ?? 3, stress: moodName === 'Stressed' ? 7 : 4, energy: moodName === 'Joyful' ? 7 : 5, sleepHours: 7, contexts: ['Quick mood check-in'] });
      window.localStorage.setItem('svasthi-last-check-in', result.checkIn.id);
      setMoodToast(`Logged ${moodName}. Holding space for you.`);
    } catch {
      setMoodToast('Unable to save right now. Please try again.');
    }
    setTimeout(() => {
      setMoodToast(null);
    }, 3500);
  };

  const handleQuickBreath = () => {
    setIsBreathingActive(true);
    setBreathCount((prev) => prev + 1);
    setTimeout(() => {
      setIsBreathingActive(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full pb-10 animate-fadeIn">
      {/* Top Welcome Strip with Date & Mindful Status */}
      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52825F] animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
            Today in your Sanctuary
          </span>
        </div>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-primary/5">
          Sep 10, 2026 • Evening Calm
        </span>
      </div>

      {/* ========================================================================= */}
      {/* BENTO GRID DASHBOARD                                                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5">

        {/* 1. HERO BENTO CARD: Warm Greeting & Indie Line Art (Spans 8 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-8 bg-[#F5EFEB] rounded-3xl p-6 md:p-7 border border-[#E8DFC8]/60 shadow-[0_4px_24px_-6px_rgba(72,55,85,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          {/* Subtle decorative background organic shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBE1F2] rounded-full filter blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5DCF0] text-[#45365C] text-xs font-bold w-fit shadow-2xs">
                <StarDoodle className="w-3.5 h-3.5 text-[#8A58A6]" />
                <span>Svasthi Mindful Sanctuary</span>
              </div>
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary tracking-tight leading-tight">
                Your Svasthi Sanctuary
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Take a gentle pause. Your mind deserves softness today, free from expectations and haste.
              </p>
            </div>

            {/* Hand-drawn Meditation Illustration */}
            <div className="self-center sm:self-auto flex-shrink-0">
              <MindfulMeditationArt className="w-32 h-28 sm:w-36 sm:h-32 drop-shadow-sm" />
            </div>
          </div>

          <div className="relative z-10 mt-5 pt-4 border-t border-primary/5 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleQuickBreath}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isBreathingActive
                  ? 'bg-[#3B6346] text-white scale-102 ring-2 ring-[#3B6346]/40'
                  : 'bg-surface-container-lowest text-primary hover:bg-[#FAF7F2]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#3B6346]">
                {isBreathingActive ? 'self_improvement' : 'air'}
              </span>
              <span>
                {isBreathingActive ? 'Breathe in... hold... exhale gently' : 'One-Tap Mindful Breath'}
              </span>
              {breathCount > 0 && (
                <span className="bg-[#E2EFE5] text-[#1D4A27] px-1.5 py-0.2 rounded-full text-[10px]">
                  {breathCount} taken
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('dawn')}
              className="text-xs font-bold text-[#64557A] hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Talk to Dawn companion</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 2. DAILY INTENTION BENTO CARD: Soft Terracotta / Peach Clay (Spans 4 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-4 bg-[#FAEAE3] rounded-3xl p-6 border border-[#F0D5C9] shadow-[0_4px_20px_-6px_rgba(143,83,62,0.08)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-30 pointer-events-none">
            <BotanicalBranch className="w-28 h-28" />
          </div>

          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-[#87513D]">
                Daily Intention
              </span>
              <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-[#87513D]">
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
              </span>
            </div>
            <p className="font-headline text-base sm:text-lg font-semibold text-[#3D1B10] leading-snug italic">
              "Every breath is a fresh start. You are stronger than your worries today."
            </p>
          </div>

          <div className="relative z-10 mt-4 pt-3 border-t border-[#87513D]/10 flex items-center justify-between text-xs text-[#6B3B2A] font-medium">
            <span>Somatic Reminder</span>
            <span className="font-bold">Affirm & Center</span>
          </div>
        </div>

        {/* 3. INTERACTIVE MOOD BAROMETER BENTO CARD: Soft Sage Green (Spans 6 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-6 bg-[#E8EFE8] rounded-3xl p-6 border border-[#D0E2D3] shadow-[0_4px_20px_-6px_rgba(59,99,70,0.08)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#2D5437] shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </span>
                <h2 className="font-headline text-base font-bold text-[#1F4128]">
                  How does your heart feel right now?
                </h2>
              </div>
              <span className="text-xs font-bold text-[#2D5437]">
                {moodToast ? moodToast : selectedMood ? `Status: ${selectedMood}` : 'Tap an emotion'}
              </span>
            </div>
            <p className="text-xs text-[#3E5C46] mb-4">
              Check in with zero judgment. Tracking your emotional climate builds emotional resilience.
            </p>

            {/* 5 Organic Pastel Mood Chips */}
            <div className="grid grid-cols-5 gap-2">
              {moods.map((m) => {
                const isSelected = selectedMood === m.val;
                return (
                  <button
                    key={m.val}
                    type="button"
                    onClick={() => handleSelectMood(m.val)}
                    className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer border ${
                      isSelected
                        ? 'bg-white text-[#1F4128] border-[#2D5437] shadow-sm font-bold scale-102 ring-2 ring-[#2D5437]/20'
                        : 'bg-white/60 hover:bg-white text-[#3E5C46] border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1 select-none">{m.emoji}</span>
                    <span className="text-[11px] font-semibold tracking-tight">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3B6346]/10 flex items-center justify-between">
            <span className="text-xs text-[#3E5C46]">Need detailed tracking?</span>
            <button
              onClick={() => onNavigate('check-in')}
              className="text-xs font-bold text-[#1F4128] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Check-in</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 4. DAWN AI COMPANION BENTO CARD: Muted Lavender (Spans 6 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-6 bg-[#EEE7F5] rounded-3xl p-6 border border-[#DDD0E9] shadow-[0_4px_20px_-6px_rgba(92,67,114,0.08)] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#4E3966] shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-[#5D4677]">
                  24/7 Empathetic Listener
                </span>
              </div>
              <h2 className="font-headline text-lg font-bold text-[#2A1D38]">
                Talk with Dawn
              </h2>
              <p className="text-xs text-[#524463] leading-relaxed max-w-sm">
                A warm, compassionate AI space to share whatever is on your mind—vent freely, work through anxieties, or ground yourself.
              </p>
            </div>

            {/* Hand-drawn Dawn Art */}
            <div className="flex-shrink-0">
              <DawnCompanionArt className="w-20 h-20 drop-shadow-sm" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#5D4677]/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#524463]">
              <span className="w-2 h-2 rounded-full bg-[#52825F]"></span>
              <span>100% Confidential • Instant Support</span>
            </div>
            <button
              onClick={() => onNavigate('dawn')}
              className="bg-[#2C2533] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-[#483D54] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Begin Chat</span>
              <span className="material-symbols-outlined text-[16px]">chat</span>
            </button>
          </div>
        </div>

        {/* 5. SOMATIC SANCTUARY BENTO CARD: Soft Sage (Spans 4 cols on LG) */}
        <div
          onClick={() => onNavigate('exercises')}
          className="md:col-span-6 lg:col-span-4 bg-[#E7F0E8] rounded-3xl p-6 border border-[#CEE0D0] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#2F5438] shadow-2xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">air</span>
              </div>
              <BreathLeavesArt className="w-14 h-14 -mr-1 -mt-1 opacity-90" />
            </div>

            <h3 className="font-headline text-base font-bold text-[#1E3E26] mb-1">
              Somatic Exercises
            </h3>
            <p className="text-xs text-[#3D5E46] leading-relaxed">
              Box Breathing, 4-7-8 rhythm & 5-4-3-2-1 Sensory Grounding to soothe nervous system overdrive.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#2F5438]/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2F5438]">Guided cycles</span>
            <span className="text-xs font-bold text-[#1E3E26] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>

        {/* 6. REFLECTION DIARY & CBT BENTO CARD: Warm Honey / Sand (Spans 4 cols on LG) */}
        <div
          onClick={() => onNavigate('diary')}
          className="md:col-span-6 lg:col-span-4 bg-[#FBF0DE] rounded-3xl p-6 border border-[#EFE0C2] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#7E571E] shadow-2xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">menu_book</span>
              </div>
              <JournalPenArt className="w-14 h-14 -mr-1 -mt-1 opacity-90" />
            </div>

            <h3 className="font-headline text-base font-bold text-[#422C0A] mb-1">
              Reflection Diary
            </h3>
            <p className="text-xs text-[#634E28] leading-relaxed">
              Cognitive reframing, distortion identification & emotional spectrum analysis for clarity.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#7E571E]/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7E571E]">CBT Reframing</span>
            <span className="text-xs font-bold text-[#422C0A] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Write Entry <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>

        {/* 7. CLINICAL SCREENINGS BENTO CARD: Soft Periwinkle / Lavender (Spans 4 cols on LG) */}
        <div
          onClick={() => onNavigate('screening')}
          className="md:col-span-6 lg:col-span-4 bg-[#EDE8F5] rounded-3xl p-6 border border-[#D9D0E7] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#4A3863] shadow-2xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">fact_check</span>
              </div>
              <span className="bg-white/80 text-[#4A3863] text-[10px] font-bold px-2 py-0.5 rounded-full">
                ICD-11 & DSM-5
              </span>
            </div>

            <h3 className="font-headline text-base font-bold text-[#2A1D3B] mb-1">
              Clinical Screenings
            </h3>
            <p className="text-xs text-[#57486B] leading-relaxed">
              Validated inventories: PHQ-9 (Depression), GAD-7 (Anxiety) & PSS-10 (Perceived Stress).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#4A3863]/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#4A3863]">Self-assessment</span>
            <span className="text-xs font-bold text-[#2A1D3B] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Start Test <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>

        {/* 8. HABITS & MEDS TRACKER BENTO CARD: Soft Cream / Warm Linen (Spans 6 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-6 bg-[#F4EFE6] rounded-3xl p-6 border border-[#E3DACB] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                </span>
                <h3 className="font-headline text-base font-bold text-primary">
                  Mindful Routine & Habits
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#3B6346]">
                4 of 5 Done Today
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-2">
              <div className="bg-white/80 p-2.5 rounded-2xl flex items-center gap-2 border border-primary/5">
                <span className="material-symbols-outlined text-[18px] text-[#3B6346]">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-primary truncate">Morning Sunshine</span>
                  <span className="text-[10px] text-on-surface-variant">7:30 AM • Done</span>
                </div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-2xl flex items-center gap-2 border border-primary/5">
                <span className="material-symbols-outlined text-[18px] text-[#3B6346]">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-primary truncate">Hydration (2.5L)</span>
                  <span className="text-[10px] text-on-surface-variant">All day • Done</span>
                </div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-2xl flex items-center gap-2 border border-primary/5">
                <span className="material-symbols-outlined text-[18px] text-[#3B6346]">check_circle</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-primary truncate">Midday Somatic Pause</span>
                  <span className="text-[10px] text-on-surface-variant">1:00 PM • Done</span>
                </div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-2xl flex items-center gap-2 border border-primary/5">
                <span className="material-symbols-outlined text-[18px] text-outline">radio_button_unchecked</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-primary truncate">Night Rest (8 hrs)</span>
                  <span className="text-[10px] text-on-surface-variant">10:30 PM • Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Consistent habits heal the nervous system</span>
            <button
              onClick={() => onNavigate('profile')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Health Record</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 9. CRISIS & LIFELINES BENTO CARD: Soft Rose / Terracotta Pastel (Spans 6 cols on LG) */}
        <div className="md:col-span-6 lg:col-span-6 bg-[#FDEBEB] rounded-3xl p-6 border border-[#F4CDCD] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#BA1A1A] shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    emergency
                  </span>
                </span>
                <h3 className="font-headline text-base font-bold text-[#681111]">
                  24/7 Verified Crisis Lifelines
                </h3>
              </div>
              <span className="bg-[#BA1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Toll-Free Pan-India
              </span>
            </div>

            <p className="text-xs text-[#7A1E1E] leading-relaxed mb-3">
              If you or someone you know is in acute distress, compassionate confidential clinical support is available 24/7.
            </p>

            {/* Quick-Dial Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="tel:14416"
                className="bg-white hover:bg-[#FFF5F5] p-3 rounded-2xl flex items-center justify-between border border-[#E8AEAE] shadow-xs active:scale-98 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#BA1A1A]">Tele-MANAS</span>
                  <span className="text-[10px] text-[#7A1E1E]">MoHFW Govt. Helpline</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-[#BA1A1A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span>14416</span>
                </div>
              </a>

              <a
                href="tel:18005990019"
                className="bg-white hover:bg-[#FFF5F5] p-3 rounded-2xl flex items-center justify-between border border-[#E8AEAE] shadow-xs active:scale-98 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#BA1A1A]">KIRAN Helpline</span>
                  <span className="text-[10px] text-[#7A1E1E]">MSJE 13 Languages</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-[#801B1B] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span>1800-599</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#BA1A1A]/10 flex items-center justify-between">
            <span className="text-xs text-[#7A1E1E]">100% Anonymous & Free</span>
            <button
              onClick={() => onNavigate('helplines')}
              className="text-xs font-bold text-[#BA1A1A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 10 Helplines</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Action Button for Quick Calming Audio / Breath */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
        <button
          type="button"
          onClick={() => {
            if (onOpenQuickCalm) {
              onOpenQuickCalm();
            } else {
              onNavigate('exercises');
            }
          }}
          className="w-14 h-14 rounded-full bg-[#2C2533] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(44,37,51,0.25)] hover:scale-105 active:scale-95 transition-transform focus:outline-none cursor-pointer border-2 border-white/40"
          aria-label="Quick Restorative Calm"
          title="Instant 432Hz Sound Healing"
        >
          <span className="material-symbols-outlined text-[26px]">spa</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { playSingingBowlChime } from '../../utils/audio';
import { BotanicalBranch } from '../illustrations/IndieIllustrations';
import { saveCheckIn } from '../../services/svasthi';

interface CheckInScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({ onNavigate }) => {
  const [selectedMood, setSelectedMood] = useState<string>('Calm');
  const [stressLevel, setStressLevel] = useState<number>(4);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['Work Deadlines', 'Screen Time']);
  const [selectedSomatic, setSelectedSomatic] = useState<string[]>(['Shoulder knot']);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  const moodOptions = [
    { label: 'Joyful', emoji: '😄', desc: 'Light & elevated' },
    { label: 'Calm', emoji: '🙂', desc: 'Balanced & centered' },
    { label: 'Neutral', emoji: '😐', desc: 'Steady, routine' },
    { label: 'Low', emoji: '😔', desc: 'Subdued & heavy' },
    { label: 'Stressed', emoji: '😫', desc: 'High mental tension' },
    { label: 'Exhausted', emoji: '🥱', desc: 'Physical depletion' },
  ];

  const factorsList = [
    'Work Deadlines',
    'Screen Time',
    'Family Discussions',
    'Physical Exercise',
    'Healthy Nutrition',
    'Good Sleep',
    'Financial Concern',
    'Outdoor Walk'
  ];

  const somaticList = [
    'Shoulder knot',
    'Jaw clenching',
    'Chest tightness',
    'Relaxed muscles',
    'Light breathing',
    'Headache / Strain'
  ];

  const toggleFactor = (f: string) => {
    setSelectedFactors((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  const toggleSomatic = (s: string) => {
    setSelectedSomatic((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const moodValues: Record<string, number> = { Joyful: 5, Calm: 4, Neutral: 3, Low: 2, Stressed: 2, Exhausted: 1 };
      const result = await saveCheckIn({ mood: moodValues[selectedMood], stress: stressLevel, energy: Math.max(0, 10 - stressLevel), sleepHours, contexts: [...selectedFactors, ...selectedSomatic].slice(0, 8) });
      window.localStorage.setItem('svasthi-last-check-in', result.checkIn.id);
      playSingingBowlChime(432);
      setIsSaved(true);
      setTimeout(() => {
      setIsSaved(false);
      onNavigate('home');
      }, 1800);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to save your check-in.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Top Header with Warm Pastel & Botanical Line Art */}
      <header className="w-full bg-[#FAF0DE] text-[#422C0A] rounded-3xl p-4 sm:p-5 shadow-xs flex items-center justify-between border border-[#EFE0C2] relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Go back"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-primary active:scale-95 transition-transform cursor-pointer shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline text-lg sm:text-xl font-bold text-[#422C0A] leading-tight">
              Daily Somatic & Mood Check-in
            </h1>
            <p className="text-xs text-[#6B532E]">
              Track emotional valence, nervous tension & physical cues
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 relative z-10 hidden sm:block">
          <BotanicalBranch className="w-14 h-14" />
        </div>
      </header>

      {isSaved && (
        <div className="bg-[#E7F0E8] text-[#1E3E26] p-4 rounded-3xl text-xs font-semibold shadow-xs flex items-center gap-2 border border-[#D0E2D3] animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#3B6346]">check_circle</span>
          <span>Daily check-in saved to your Health Record! Redirecting...</span>
        </div>
      )}
      {error && <div role="alert" className="bg-[#FDE8E8] text-[#7A1E1E] p-4 rounded-3xl text-xs font-semibold border border-[#F5CDCD]">{error}</div>}

      {/* Form Content - 2 Column Layout on Desktop */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Mood, Stress & Sleep */}
          <div className="flex flex-col gap-5">
            {/* Mood Selector Grid */}
            <section className="bg-[#F5EFEB] rounded-3xl p-5 shadow-sm flex flex-col gap-3.5 border border-[#E8DFC8]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  1. Current Valence
                </span>
                <span className="text-xs font-bold text-secondary">{selectedMood}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {moodOptions.map((m) => {
                  const isSelected = selectedMood === m.label;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setSelectedMood(m.label)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer border text-center ${
                        isSelected
                          ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary/40 shadow-sm scale-102 font-bold'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border-primary/5'
                      }`}
                    >
                      <span className="text-2xl mb-1">{m.emoji}</span>
                      <span className="text-xs font-semibold">{m.label}</span>
                      <span className="text-[10px] text-on-surface-variant truncate mt-0.5 max-w-[90px]">
                        {m.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Stress Scale Slider */}
            <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-primary/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  2. Perceived Stress Level
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container text-primary">
                  {stressLevel} / 10 ({stressLevel <= 3 ? 'Low' : stressLevel <= 7 ? 'Moderate' : 'High'})
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
                <span>1 • Calm & Serene</span>
                <span>5 • Manageable</span>
                <span>10 • Severe Panic</span>
              </div>
            </section>

            {/* Sleep Duration */}
            <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-primary/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  3. Rest & Sleep
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container text-primary">
                  {sleepHours} Hours
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSleepHours((prev) => Math.max(3, prev - 0.5))}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-lg active:scale-95 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  -
                </button>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-secondary">bedtime</span>
                  <span className="font-headline text-lg font-bold text-primary">{sleepHours} hrs</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSleepHours((prev) => Math.min(12, prev + 0.5))}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-lg active:scale-95 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  +
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Somatic, Triggers & Notes */}
          <div className="flex flex-col gap-4">
            {/* Somatic Sensations */}
            <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-primary/5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                4. Somatic Sensations in Body
              </span>
              <div className="flex flex-wrap gap-1.5">
                {somaticList.map((s) => {
                  const isSelected = selectedSomatic.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSomatic(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Factors / Triggers */}
            <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-primary/5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                5. Influencing Environmental Factors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {factorsList.map((f) => {
                  const isSelected = selectedFactors.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFactor(f)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-secondary text-on-secondary shadow-xs'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Notes & Submit */}
            <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-primary/5 flex-1 justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  6. Daily Reflections (Optional)
                </span>
                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional notes: anything specific you want to remember about today?"
                  className="w-full bg-surface-container-lowest text-on-surface text-xs md:text-sm p-3.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-outline/70 resize-none leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                <span>Save Today's Check-in</span>
              </button>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

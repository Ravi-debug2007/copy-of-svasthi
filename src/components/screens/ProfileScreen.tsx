import React, { useEffect, useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenType } from '../../types';
import { playSingingBowlChime } from '../../utils/audio';
import { BotanicalBranch } from '../illustrations/IndieIllustrations';
import { getDashboard, getHabits, Habit, toggleHabit as persistHabit } from '../../services/svasthi';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [stats, setStats] = useState({ streakDays: 0, wellnessScore: 0 });

  const [pdfToast, setPdfToast] = useState(false);

  useEffect(() => {
    getHabits().then(({ habits: liveHabits }) => setHabits(liveHabits)).catch(() => undefined);
    getDashboard().then(({ stats: liveStats }) => setStats(liveStats)).catch(() => undefined);
  }, []);

  const toggleHabit = async (id: string) => {
    try {
      const { habit } = await persistHabit(id);
      if (habit.done) playSingingBowlChime(528);
      setHabits((prev) => prev.map((item) => item.id === id ? habit : item));
    } catch {
      // Preserve the last confirmed server state if the request fails.
    }
  };

  const handleExportPdf = () => {
    setPdfToast(true);
    playSingingBowlChime(432);
    setTimeout(() => {
      window.print();
      setPdfToast(false);
    }, 800);
  };

  const completedCount = habits.filter((h) => h.done).length;

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Top Header with Warm Pastel & Botanical Branch */}
      <header className="w-full bg-[#E8EFE8] text-[#1E3E26] rounded-3xl p-4 sm:p-5 shadow-xs flex items-center justify-between border border-[#D3E3D6] relative overflow-hidden">
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
            <h1 className="font-headline text-lg sm:text-xl font-bold text-[#1E3E26] leading-tight">
              Personal Health & Wellness Record
            </h1>
            <p className="text-xs text-[#355B3F]">
              Longitudinal biometric trends, routines & clinician reports
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 relative z-10 hidden sm:block">
          <BotanicalBranch className="w-14 h-14" />
        </div>
      </header>

      {pdfToast && (
        <div className="bg-[#E7F0E8] text-[#1E3E26] p-4 rounded-3xl text-xs font-semibold shadow-xs flex items-center gap-2 border border-[#D0E2D3]">
          <span className="material-symbols-outlined text-[18px] text-[#3B6346]">print</span>
          <span>Preparing Clinical Summary Document for Aarav Sharma...</span>
        </div>
      )}

      {/* User Card */}
      <section className="bg-[#F5EFEB] rounded-3xl p-5 sm:p-6 shadow-sm flex items-center gap-4 border border-[#E8DFC8]">
        <div className="w-15 h-15 rounded-2xl bg-[#2C2533] flex items-center justify-center text-white font-bold text-xl shadow-xs ring-4 ring-white">
          AS
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-lg font-bold text-primary truncate">Aarav Sharma</h2>
            <span className="bg-white text-[#3B6346] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D3E3D6]">
              Verified ABHA
            </span>
          </div>
          <span className="text-xs text-on-surface-variant">
            32 yrs • ABHA: 91-8273-1029-4821 • New Delhi
          </span>
          <span className="text-xs text-[#3B6346] font-medium mt-0.5">
            Primary Care: Dr. Radhika Iyer (Fortis Mental Health)
          </span>
        </div>
      </section>

      {/* Wellness Streaks & Metrics Grid */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#EADFCB] flex flex-col items-center text-center shadow-2xs">
          <span className="material-symbols-outlined text-[#3B6346] text-[24px] mb-1">
            local_fire_department
          </span>
          <span className="font-headline text-lg font-bold text-primary">{stats.streakDays} Days</span>
          <span className="text-[10px] text-on-surface-variant">Sanctuary Streak</span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#EADFCB] flex flex-col items-center text-center shadow-2xs">
          <span className="material-symbols-outlined text-[#48375F] text-[24px] mb-1">
            checklist
          </span>
          <span className="font-headline text-lg font-bold text-primary">
            {completedCount}/{habits.length}
          </span>
          <span className="text-[10px] text-on-surface-variant">Daily Habits Met</span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#EADFCB] flex flex-col items-center text-center shadow-2xs">
          <span className="material-symbols-outlined text-[#87513D] text-[24px] mb-1">
            verified
          </span>
          <span className="font-headline text-lg font-bold text-primary">{stats.wellnessScore}%</span>
          <span className="text-[10px] text-on-surface-variant">Check-in Rate</span>
        </div>
      </section>

      {/* 2-Column Dashboard Grid on Desktop for Records and Habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Clinical Screening History Records */}
        <section className="bg-[#F5EFEB] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-3 border border-[#E8DFC8]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">fact_check</span>
                <h3 className="font-headline text-sm md:text-base font-bold text-primary">
                  Clinical Assessment History
                </h3>
              </div>
              <button
                onClick={() => onNavigate('screening')}
                className="text-xs text-secondary font-bold hover:underline cursor-pointer"
              >
                Take Test
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-primary/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary">PHQ-9 (Depression Inventory)</span>
                  <span className="text-[11px] text-on-surface-variant">Sep 8, 2026 • Score: 7/27</span>
                </div>
                <span className="bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-2.5 py-1 rounded-full">
                  Mild
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl border border-primary/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary">GAD-7 (Anxiety Inventory)</span>
                  <span className="text-[11px] text-on-surface-variant">Sep 8, 2026 • Score: 5/21</span>
                </div>
                <span className="bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-2.5 py-1 rounded-full">
                  Mild
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl border border-primary/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary">PSS-10 (Perceived Stress)</span>
                  <span className="text-[11px] text-on-surface-variant">Sep 5, 2026 • Score: 18/40</span>
                </div>
                <span className="bg-tertiary-fixed text-tertiary text-xs font-bold px-2.5 py-1 rounded-full">
                  Moderate
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleExportPdf}
            type="button"
            className="w-full mt-2 py-2.5 rounded-full bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Clinician Summary (PDF)</span>
          </button>
        </section>

        {/* Habit & Medication Trackers */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">notifications_active</span>
              <h3 className="font-headline text-sm md:text-base font-bold text-primary">
                Habits & Meds Tracker
              </h3>
            </div>
            <span className="text-xs font-semibold text-on-surface-variant">
              Today • {completedCount}/{habits.length}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {habits.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleHabit(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                  item.done
                    ? 'bg-surface-container border-primary/10'
                    : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    {item.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs font-semibold ${
                        item.done ? 'text-primary line-through opacity-70' : 'text-primary'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{item.time}</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    item.done ? 'bg-primary text-white' : 'bg-surface-container-highest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Data Security & Privacy Banner */}
      <footer className="bg-surface-container rounded-2xl p-3.5 flex items-center gap-3 border border-primary/5">
        <span className="material-symbols-outlined text-[24px] text-secondary flex-shrink-0">
          encrypted
        </span>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Svasthi adheres to strict patient privacy guidelines. Clinical self-assessment data is stored
          securely on your device and will never be shared without your explicit consent.
        </p>
      </footer>
    </div>
  );
};

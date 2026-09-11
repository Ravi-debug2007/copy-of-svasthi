import React, { useState } from 'react';
import { DEFAULT_DIARY_ENTRIES } from '../../data/mockData';
import { ReflectionEntry, ScreenType } from '../../types';
import { playSingingBowlChime } from '../../utils/audio';
import { JournalPenArt, BotanicalBranch } from '../illustrations/IndieIllustrations';

interface DiaryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBreathing?: () => void;
}

export const DiaryScreen: React.FC<DiaryScreenProps> = ({ onNavigate, onOpenBreathing }) => {
  const [entries, setEntries] = useState<ReflectionEntry[]>(DEFAULT_DIARY_ENTRIES);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ReflectionEntry>(DEFAULT_DIARY_ENTRIES[0]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);
    playSingingBowlChime(432);

    setTimeout(() => {
      setIsAnalyzing(false);

      const newEntry: ReflectionEntry = {
        id: `ref-${Date.now()}`,
        title: title.trim() || 'Mindful Reflection',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: content.trim(),
        tags: ['Self-Compassion', 'CBT Reframe', 'Reflection'],
        cbtReport: {
          emotionalSpectrum: [
            { emotion: 'Vulnerability', percentage: 72, colorClass: 'bg-[#87513D] text-white' },
            { emotion: 'Mental Tension', percentage: 60, colorClass: 'bg-[#5D4677] text-white' },
            { emotion: 'Hope', percentage: 45, colorClass: 'bg-[#3B6346] text-white' }
          ],
          distortions: [
            {
              type: 'All-or-Nothing Thinking',
              title: 'All-or-Nothing Thinking',
              description: 'Viewing the situation as either an absolute success or a total failure without recognizing the nuanced gray area.'
            },
            {
              type: 'Emotional Reasoning',
              title: 'Emotional Reasoning',
              description: 'Assuming that because you feel tense, the actual reality of the situation must be chaotic.'
            }
          ],
          reframe: '“You are navigating challenging moments with sincere courage. Feelings of self-doubt do not reflect your true capacity. You are allowed to take space, breathe, and learn as you grow.”',
          microAction: 'Place a warm hand over your heart, breathe in for 4 seconds, and give yourself credit for showing up today.'
        }
      };

      setEntries([newEntry, ...entries]);
      setSelectedEntry(newEntry);
      setTitle('');
      setContent('');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Top Bar with Warm Pastel & Hand-drawn Art */}
      <header className="w-full bg-[#FAF0DE] rounded-3xl p-4 sm:p-5 shadow-xs flex items-center justify-between border border-[#EFE0C2] relative overflow-hidden">
        <div className="flex items-center gap-3.5 relative z-10">
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
              Reflection Diary & CBT Reframe
            </h1>
            <p className="text-xs text-[#634E28]">
              Transform anxious rumination into cognitive clarity
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 relative z-10 hidden sm:block">
          <JournalPenArt className="w-12 h-12" />
        </div>
      </header>

      {/* Desktop 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (Entry form & Past reflections history): 7 columns on LG */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {/* Mindful Journal Entry Box */}
          <section className="bg-[#F5EFEB] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-3.5 border border-[#E8DFC8]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#7E571E] shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                </span>
                <h2 className="font-headline text-base font-bold text-primary">
                  New Mindful Journal Entry
                </h2>
              </div>
              <span className="text-xs text-on-surface-variant font-medium bg-white px-2.5 py-0.5 rounded-full">
                Safe & Private
              </span>
            </div>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-2.5">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (e.g. Client Demo Anxieties & Stutter)"
                className="w-full bg-surface-container-lowest text-on-surface text-sm px-4 py-2.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-outline/70"
              />

              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write what is on your mind freely. What triggered your feelings today? How does your body feel?"
                className="w-full bg-surface-container-lowest text-on-surface text-xs md:text-sm p-3.5 rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-outline/70 resize-none leading-relaxed"
              ></textarea>

              <button
                type="submit"
                disabled={isAnalyzing || !content.trim()}
                className={`w-full py-3 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer ${
                  !content.trim() || isAnalyzing
                    ? 'bg-surface-container text-outline cursor-not-allowed'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isAnalyzing ? 'autorenew' : 'auto_awesome'}
                </span>
                <span>{isAnalyzing ? 'Reframing Cognitive Patterns...' : 'Analyze with CBT Reframer'}</span>
              </button>
            </form>
          </section>

          {/* Previous Reflections History List */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-headline text-sm md:text-base font-bold text-primary">
                Past Journal Entries
              </h3>
              <span className="text-xs font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
                {entries.length} Entries
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {entries.map((item) => {
                const isSelected = selectedEntry.id === item.id;
                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedEntry(item)}
                    className={`p-3.5 rounded-2xl transition-all cursor-pointer border flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-surface-container-high border-secondary/40 shadow-sm ring-1 ring-secondary/30'
                        : 'bg-surface-container-low border-primary/5 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-headline text-sm font-bold text-primary truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-on-surface-variant flex-shrink-0">
                        {item.date} • {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-surface-container-lowest text-primary px-2 py-0.5 rounded-full shadow-xs"
                        >
                          {t}
                        </span>
                      ))}
                      {item.cbtReport && (
                        <span className="text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full ml-auto">
                          CBT Analyzed ✨
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Selected Entry CBT Cognitive Reframing Report (5 columns on LG) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {selectedEntry.cbtReport ? (
            <section className="bg-surface-container-high rounded-2xl p-4 shadow-md flex flex-col gap-3.5 border border-primary/10 animate-fadeIn lg:sticky lg:top-20">
              <div className="flex items-center justify-between border-b border-primary/5 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                  </span>
                  <div>
                    <h3 className="font-headline text-sm md:text-base font-bold text-primary">
                      Niramaya CBT Insight
                    </h3>
                    <span className="text-[11px] text-on-surface-variant">
                      {selectedEntry.title} • {selectedEntry.date}
                    </span>
                  </div>
                </div>
                <span className="bg-surface-variant text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Auto-generated
                </span>
              </div>

              {/* Emotional Spectrum */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-primary">Emotional Spectrum</span>
                <div className="flex flex-col gap-2">
                  {selectedEntry.cbtReport.emotionalSpectrum.map((emo, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-medium text-on-surface">
                        <span>{emo.emotion}</span>
                        <span className="font-bold">{emo.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${emo.colorClass}`}
                          style={{ width: `${emo.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognitive Distortions Identified */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-xs font-bold text-primary">Cognitive Distortions Identified</span>
                <div className="flex flex-col gap-2">
                  {selectedEntry.cbtReport.distortions.map((d, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-lowest p-3 rounded-xl border border-primary/5 flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-error">
                        <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                        <span>{d.title}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{d.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mindful Cognitive Reframe Quote Box */}
              <div className="bg-secondary-fixed/40 p-3.5 rounded-xl border border-secondary/20 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                  <span className="material-symbols-outlined text-[16px]">format_quote</span>
                  <span>Mindful Cognitive Reframe</span>
                </div>
                <p className="font-headline text-xs md:text-sm font-semibold text-primary italic leading-relaxed">
                  {selectedEntry.cbtReport.reframe}
                </p>
              </div>

              {/* Micro-Action Step */}
              {selectedEntry.cbtReport.microAction && (
                <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">
                    task_alt
                  </span>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-xs font-bold text-primary">Recommended Micro-Action</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {selectedEntry.cbtReport.microAction}
                    </p>
                    <button
                      onClick={() => {
                        if (onOpenBreathing) onOpenBreathing();
                        else onNavigate('exercises');
                      }}
                      type="button"
                      className="self-start mt-1 text-xs font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Start 2-Min Box Breathing</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-6 text-center text-on-surface-variant text-xs border border-primary/5">
              Select an entry from the list to inspect the CBT Reframe report.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { INITIAL_TESTS } from '../../data/mockData';
import { ScreeningTest, ScreenType } from '../../types';
import { MindfulMeditationArt, BotanicalBranch } from '../illustrations/IndieIllustrations';

interface ScreeningScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ScreeningScreen: React.FC<ScreeningScreenProps> = ({ onNavigate }) => {
  const [tests, setTests] = useState<ScreeningTest[]>(INITIAL_TESTS);
  const [activeTestId, setActiveTestId] = useState<string>('phq-9');
  const [questionIndex, setQuestionIndex] = useState<number>(2); // Default to Q3 as shown in design
  const [selectedOption, setSelectedOption] = useState<number>(1); // Default to 1 (Several days)
  const [answers, setAnswers] = useState<Record<number, number>>({ 0: 1, 1: 1, 2: 1 });
  const [completedNotice, setCompletedNotice] = useState<string | null>(null);

  const currentTest = tests.find((t) => t.id === activeTestId) || tests[0];
  const questions = currentTest.questions;
  const currentQ = questions[questionIndex] || questions[0];

  const totalQuestions = questions.length;
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (pts: number) => {
    setSelectedOption(pts);
    setAnswers((prev) => ({ ...prev, [questionIndex]: pts }));
  };

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
      const nextAns = answers[questionIndex + 1];
      setSelectedOption(nextAns !== undefined ? nextAns : 0);
    } else {
      // Calculate score
      let total = 0;
      for (let i = 0; i < totalQuestions; i++) {
        total += answers[i] !== undefined ? answers[i] : 1;
      }
      // Update tests list
      setTests((prev) =>
        prev.map((t) => {
          if (t.id === currentTest.id) {
            let label = 'Mild';
            if (total <= 4) label = 'Minimal';
            else if (total <= 9) label = 'Mild Severity';
            else if (total <= 14) label = 'Moderate';
            else label = 'Severe';
            return {
              ...t,
              score: total,
              statusLabel: `${label} (${total}/${t.maxScore})`
            };
          }
          return t;
        })
      );
      setCompletedNotice(`Completed ${currentTest.title}! Total score: ${total}/${currentTest.maxScore}`);
      setTimeout(() => setCompletedNotice(null), 4000);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setSelectedOption(answers[questionIndex - 1] ?? 0);
    }
  };

  const startTest = (testId: string) => {
    setActiveTestId(testId);
    setQuestionIndex(0);
    setSelectedOption(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-8 animate-fadeIn">
      {/* Top Navigation Header with Warm Pastel & Hand-drawn Art */}
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
              Survey Based Assessment
            </h1>
            <p className="text-xs text-[#355B3F]">
              Validated clinical psychological self-screenings
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 relative z-10 hidden sm:block">
          <MindfulMeditationArt className="w-16 h-16" />
        </div>
      </header>

      {/* Clinical Disclaimer Banner */}
      <aside className="w-full bg-[#F4EFE6] text-[#3A3242] rounded-3xl p-4 sm:p-5 shadow-2xs flex gap-3 items-start border border-[#E4DCCB]">
        <span
          className="material-symbols-outlined text-[#3B6346] text-[22px] flex-shrink-0 mt-0.5"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          info
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-primary">Clinical Screening Note</span>
          <p className="text-xs text-[#5E526B] leading-relaxed">
            Standardized tests (PHQ-9, GAD-7, etc.) provide informational screening, not a formal diagnosis.
            Please consult a licensed medical professional for individual treatment planning.
          </p>
        </div>
      </aside>

      {completedNotice && (
        <div className="bg-secondary-container text-on-secondary-container p-3.5 rounded-2xl text-xs font-semibold shadow-sm flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{completedNotice}</span>
        </div>
      )}

      {/* Responsive Multi-Column Grid on Desktop (lg:), Stacked on Mobile */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        {/* Left Column on Desktop: Catalog of Tests & Info */}
        <div className="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1 mt-4 lg:mt-0">
          {/* Diagnostic Tests Catalog Header */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="font-headline text-base font-bold text-primary">Diagnostic Catalog</h2>
              <p className="text-xs text-on-surface-variant">8 Standardized psychological evaluations</p>
            </div>
            <span className="text-xs font-semibold bg-surface-container text-primary px-3 py-1 rounded-full">
              {tests.filter((t) => t.score !== undefined).length} Completed
            </span>
          </div>

          {/* 8 Diagnostic Tests Catalog List */}
          <section className="flex flex-col gap-3">
            {tests.map((test) => {
              const isCompleted = test.score !== undefined;
              const isCurrent = test.id === activeTestId;
              return (
                <article
                  key={test.id}
                  className={`bg-surface-container-low rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 border transition-all ${
                    isCurrent
                      ? 'border-primary/30 ring-1 ring-primary/20 bg-surface-container'
                      : 'border-primary/5 hover:border-primary/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                        test.id === 'phq-9'
                          ? 'bg-primary-fixed text-primary'
                          : test.id === 'gad-7'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : test.id === 'pss-10'
                          ? 'bg-tertiary-fixed text-tertiary'
                          : 'bg-surface-container-high text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {test.id === 'phq-9'
                          ? 'sentiment_dissatisfied'
                          : test.id === 'gad-7'
                          ? 'psychology_alt'
                          : test.id === 'pss-10'
                          ? 'speed'
                          : test.id === 'oci-r'
                          ? 'repeat'
                          : test.id === 'mdq'
                          ? 'swap_vertical_circle'
                          : test.id === 'pcl-5'
                          ? 'shield'
                          : test.id === 'eat-26'
                          ? 'restaurant'
                          : 'bolt'}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-primary truncate">{test.title}</h4>
                        {isCurrent && (
                          <span className="bg-primary text-on-primary text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      {isCompleted ? (
                        <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                          Score: <span className="font-bold text-primary">{test.score}/{test.maxScore}</span>{' '}
                          ({test.statusLabel || 'Completed'})
                        </p>
                      ) : (
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {test.questionsCount} Questions • {test.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => startTest(test.id)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform cursor-pointer ${
                      isCompleted
                        ? 'bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim'
                        : 'bg-primary text-on-primary shadow-sm hover:opacity-95'
                    }`}
                  >
                    {isCompleted ? 'Retake' : 'Start'}
                  </button>
                </article>
              );
            })}
          </section>

          {/* Supportive Confidentiality Card */}
          <footer className="w-full bg-surface-container-highest/60 rounded-2xl p-4 flex items-center gap-3 border border-primary/5">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">spa</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-primary">Your Responses are Confidential</p>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                All scores are securely stored on device for clinical reference and tracking your progress over time.
              </p>
            </div>
          </footer>
        </div>

        {/* Right Column on Desktop: Active Assessment & Clinical Banner */}
        <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-24">
          {/* Clinical Disclaimer Banner */}
          <aside className="w-full bg-surface-container-high text-on-surface rounded-2xl p-3.5 shadow-sm flex gap-2.5 items-start border border-primary/5">
            <span
              className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-primary">Clinical Screening Tool</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Standardized tests (PHQ-9, GAD-7, etc.) provide informational screening, not a formal diagnosis.
                Please consult a licensed medical professional for treatment planning.
              </p>
            </div>
          </aside>

          {/* Active Assessment Card */}
          <section className="w-full bg-surface-container-low rounded-2xl p-5 shadow-md flex flex-col gap-4 relative border border-primary/5">
            {/* Progress Indicator & Badge */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                  <span className="text-sm font-bold text-primary">{currentTest.title}</span>
                </div>
                <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-0.5 rounded-full">
                  Question {questionIndex + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Question Prompt Card */}
            <div className="w-full bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-4 shadow-sm border border-tertiary/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-tertiary-fixed-variant block mb-1">
                {currentQ.subtitle || 'Over the last 2 weeks'}
              </span>
              <h3 className="font-headline text-base md:text-lg font-bold text-primary leading-snug">
                {currentQ.text}
              </h3>
            </div>

            {/* Interactive Options List */}
            <fieldset className="flex flex-col gap-2.5 my-1">
              <legend className="sr-only">Select response severity</legend>

              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.points;
                return (
                  <label
                    key={opt.points}
                    onClick={() => handleSelectOption(opt.points)}
                    className={`group relative flex items-center justify-between p-3.5 rounded-xl text-on-surface shadow-sm cursor-pointer transition-all active:scale-[0.99] border ${
                      isSelected
                        ? 'bg-surface-variant border-primary/20 shadow-xs'
                        : 'bg-surface-container-lowest border-primary/5 hover:bg-surface-container/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="screening_q"
                      value={opt.points}
                      checked={isSelected}
                      onChange={() => handleSelectOption(opt.points)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-sm text-primary ${
                            isSelected ? 'font-bold' : 'font-medium'
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs text-on-surface-variant">{opt.sub}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs ${
                        isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      {opt.points} pts
                    </span>
                  </label>
                );
              })}
            </fieldset>

            {/* Assessment Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={questionIndex === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  questionIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant'
                    : 'bg-surface-container text-primary active:bg-surface-container-highest hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                <span>Previous</span>
              </button>

              {/* Submit / Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Confirm and proceed"
                className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-95 transition-all hover:opacity-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[28px]">check</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

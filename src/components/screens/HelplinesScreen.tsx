import React, { useState } from 'react';
import { HELPLINES_DATA } from '../../data/mockData';
import { ScreenType } from '../../types';

interface HelplinesScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HelplinesScreen: React.FC<HelplinesScreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | '24x7' | 'youth' | 'multilingual'>('all');

  const priorityTeleManas = HELPLINES_DATA.find((h) => h.id === 'tele-manas')!;
  const priorityKiran = HELPLINES_DATA.find((h) => h.id === 'kiran')!;
  const directoryHelplines = HELPLINES_DATA.filter((h) => h.id !== 'tele-manas' && h.id !== 'kiran');

  const filteredHelplines = directoryHelplines.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.number.includes(q);

    const matchesFilter =
      activeFilter === 'all' || item.tags.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Warm Protective Urgent Crisis Banner */}
      <section className="bg-[#BA1A1A] text-white p-5 sm:p-6 rounded-3xl shadow-md mb-5 relative overflow-hidden flex flex-col gap-2.5 border border-[#961212]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none blur-md"></div>
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
            <span
              className="material-symbols-outlined text-[20px] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crisis_alert
            </span>
            <span className="uppercase tracking-wider">
              Immediate Support Lifeline
            </span>
          </div>
          <span className="text-xs bg-white text-[#BA1A1A] px-3 py-1 rounded-full font-bold shadow-2xs">
            24/7 National
          </span>
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-white">
            Verified Emergency & Crisis Helplines
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed max-w-xl">
            Toll-free, confidential psychological first-aid and suicide prevention hotlines operating 24/7 across India.
          </p>
        </div>
      </section>

      {/* National Top-Tier Speed Dial Cards */}
      <section className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#3B6346]">verified</span>
            Govt. of India Priority Lifelines
          </span>
          <span className="text-xs text-on-surface-variant font-medium bg-[#F4EFE6] px-2.5 py-0.5 rounded-full">
            Toll-Free & Anonymous
          </span>
        </div>

        {/* 2-Column Grid on Tablet/Desktop for National Lifelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tele-MANAS Priority Card */}
          <div className="bg-[#F5EFEB] rounded-3xl p-5 shadow-sm flex flex-col justify-between gap-3.5 border border-[#E8DFC8]">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-headline text-base font-bold text-primary">Tele-MANAS</span>
                    <span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-0.5 rounded-full">
                      MoHFW Initiative
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {priorityTeleManas.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-on-secondary-fixed-variant shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">translate</span>{' '}
                  {priorityTeleManas.languages}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>{' '}
                  {priorityTeleManas.availableHours}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">lock</span> 100% Anonymous
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:14416"
                className="w-full bg-primary text-on-primary flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs md:text-sm font-bold shadow-lg active:scale-[0.98] transition-all hover:bg-primary-container"
              >
                <span
                  className="material-symbols-outlined text-[20px] text-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  call
                </span>
                <span>Call 14416 Now</span>
                <span className="text-[11px] font-normal text-on-primary-container opacity-90">
                  | 1800-891-4416
                </span>
              </a>
            </div>
          </div>

          {/* KIRAN National Helpline Card */}
          <div className="bg-surface-container-high rounded-2xl p-4 shadow-md flex flex-col justify-between gap-3 border border-primary/5">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-headline text-base font-bold text-primary">KIRAN Helpline</span>
                    <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
                      MSJE Dept.
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {priorityKiran.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-fixed-dim flex items-center justify-center flex-shrink-0 text-on-secondary-fixed shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">psychology</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">language</span>{' '}
                  {priorityKiran.languages}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-container-lowest text-primary px-2.5 py-1 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">support_agent</span>{' '}
                  {priorityKiran.availableHours}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:18005990019"
                className="w-full bg-primary-container text-white flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs md:text-sm font-bold shadow-md active:scale-[0.98] transition-all hover:opacity-95"
              >
                <span
                  className="material-symbols-outlined text-[20px] text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  phone_in_talk
                </span>
                <span>Call 1800-599-0019</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Directory Search and Tag Filter */}
      <section className="flex flex-col gap-2.5 mb-4">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-sm md:text-base font-bold text-primary">
            Verified Clinical & NGO Directory
          </span>
          <span className="text-xs font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
            {filteredHelplines.length} Helplines
          </span>
        </div>

        {/* Quick Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-outline">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, region, or support type..."
            className="w-full bg-surface-container-lowest text-on-surface text-xs md:text-sm pl-11 pr-4 py-2.5 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-outline/70 border border-primary/5"
          />
        </div>

        {/* Category Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1 flex-shrink-0 cursor-pointer transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            All Directory
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('24x7')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1 flex-shrink-0 cursor-pointer transition-colors ${
              activeFilter === '24x7'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            24/7 Continuous
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('youth')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1 flex-shrink-0 cursor-pointer transition-colors ${
              activeFilter === 'youth'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            Youth & Students
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('multilingual')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1 flex-shrink-0 cursor-pointer transition-colors ${
              activeFilter === 'multilingual'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            Multilingual
          </button>
        </div>
      </section>

      {/* NGO & Clinical Cards List (Responsive 1/2/3 cols) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredHelplines.map((item) => (
          <article
            key={item.id}
            className="bg-surface-container rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3 border border-primary/5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline text-sm md:text-base font-bold text-primary truncate">
                      {item.name}
                    </h2>
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-on-secondary-fixed transition-colors flex items-center"
                      aria-label={`Visit ${item.name} website`}
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </a>
                  </div>
                  <span className="text-xs text-on-surface-variant mt-0.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    {item.id === 'vandrevala'
                      ? 'forum'
                      : item.id === 'aasra'
                      ? 'favorite'
                      : item.id === 'sneha'
                      ? 'volunteer_activism'
                      : item.id === 'peakmind'
                      ? 'school'
                      : item.id === 'mpower'
                      ? 'spa'
                      : 'medical_services'}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {item.availableHours && (
                  <span className="text-[11px] font-medium bg-surface-container-lowest text-on-surface-variant px-2.5 py-0.5 rounded-full shadow-xs">
                    {item.availableHours}
                  </span>
                )}
                {item.languages && (
                  <span className="text-[11px] font-medium bg-surface-container-lowest text-on-surface-variant px-2.5 py-0.5 rounded-full shadow-xs">
                    {item.languages}
                  </span>
                )}
                <span className="text-[11px] font-medium bg-surface-container-lowest text-on-surface-variant px-2.5 py-0.5 rounded-full shadow-xs">
                  Pan-India
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-primary/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                  Direct Number
                </span>
                <span className="font-headline text-sm md:text-base font-bold text-primary tracking-tight">
                  {item.number}
                </span>
              </div>
              <a
                href={`tel:${item.number.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-3.5 py-2 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed">call</span>
                <span>Call Now</span>
              </a>
            </div>
          </article>
        ))}

        {filteredHelplines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-surface-container-low rounded-2xl mb-4 border border-primary/5">
            <span className="material-symbols-outlined text-[44px] text-outline mb-2">search_off</span>
            <p className="font-headline text-base font-bold text-primary">No helplines match your query</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Please clear your search or call Tele-MANAS directly at 14416.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              type="button"
              className="mt-4 px-4 py-1.5 rounded-full bg-surface-container text-primary text-xs font-semibold cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              Reset Directory
            </button>
          </div>
        )}
      </section>

      {/* Bottom Safety Protocol Note */}
      <section className="bg-error-container text-on-error-container p-4 rounded-2xl shadow-md flex items-start gap-3 border border-error/10">
        <span className="material-symbols-outlined text-[24px] flex-shrink-0 text-error mt-0.5">
          warning
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-error uppercase tracking-wide">Emergency Protocol</span>
          <p className="text-xs text-on-error-container mt-0.5 leading-relaxed">
            If you or someone you know is in immediate danger of self-harm, please visit the nearest
            hospital emergency room or dial{' '}
            <a href="tel:112" className="font-bold underline text-error hover:opacity-80">
              112
            </a>{' '}
            for national emergency dispatch.
          </p>
        </div>
      </section>
    </div>
  );
};

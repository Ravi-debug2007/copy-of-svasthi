import React from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home': return 'Home';
      case 'dawn': return 'Chat with Dawn';
      case 'screening': return 'Clinical Screening';
      case 'exercises': return 'Somatic Sanctuary';
      case 'helplines': return 'Helplines';
      case 'diary': return 'Reflection Diary';
      case 'check-in': return 'Mood Check-in';
      case 'profile': return 'Health Record';
      default: return '';
    }
  };

  const navLinks: { id: ScreenType; label: string; icon: string; isDanger?: boolean }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'dawn', label: 'Dawn AI', icon: 'smart_toy' },
    { id: 'check-in', label: 'Check-in', icon: 'sentiment_satisfied' },
    { id: 'screening', label: 'Screening', icon: 'fact_check' },
    { id: 'exercises', label: 'Exercises', icon: 'air' },
    { id: 'diary', label: 'Diary', icon: 'menu_book' },
    { id: 'helplines', label: 'Helplines', icon: 'phone_in_talk', isDanger: true },
  ];

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#FAF7F2]/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(44,37,51,0.04)] border-b border-[#EADFCB]/60 transition-all">
      <div className="max-w-6xl xl:max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo & Current Screen Title */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer group active:scale-98 transition-transform flex-shrink-0"
        >
          <img 
            alt="Svasthi Lotus Emblem" 
            className="h-8 w-8 object-contain flex-shrink-0 group-hover:rotate-6 transition-transform" 
            src={ASSETS.emblem} 
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline font-bold text-base md:text-lg text-primary tracking-wide truncate">
              स्वस्ति (Svasthi)
            </span>
            <span className="text-[11px] font-medium text-on-surface-variant truncate -mt-0.5 md:hidden">
              {getScreenTitle()}
            </span>
            <span className="text-[11px] font-medium text-[#3B6346] hidden md:block -mt-0.5">
              Holistic Mental Wellness Sanctuary
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-full border border-[#E2DACB] text-xs font-semibold shadow-inner">
          {navLinks.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : item.isDanger
                    ? 'text-error hover:bg-[#FDE8E8]'
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/80'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions: Crisis Dial + Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a 
            href="tel:14416" 
            className="inline-flex items-center gap-1.5 bg-[#FDE8E8] text-[#BA1A1A] border border-[#F4CDCD] px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs hover:bg-[#FCD8D8] active:scale-95 transition-all min-h-[36px]"
            title="Tele-MANAS 24/7 Crisis Lifeline"
          >
            <span className="material-symbols-outlined text-[16px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
              emergency
            </span>
            <span className="hidden sm:inline text-error">Lifeline:</span>
            <span className="font-bold tracking-wider text-error">14416</span>
          </a>

          <button 
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-1.5 rounded-full p-1.5 sm:px-3 sm:py-1.5 text-xs font-bold shadow-xs transition-all cursor-pointer ${
              currentScreen === 'profile' 
                ? 'bg-[#3B6346] ring-2 ring-[#3B6346]/40 text-white' 
                : 'bg-primary text-on-primary hover:opacity-90 active:scale-95'
            }`}
            title="Aarav's Health Record & Profile"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            <span className="hidden sm:inline">Aarav</span>
          </button>
        </div>
      </div>
    </header>
  );
};

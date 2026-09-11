import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems: { id: ScreenType; label: string; icon: string; isDanger?: boolean }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'dawn', label: 'Dawn', icon: 'chat_bubble' },
    { id: 'check-in', label: 'Check-in', icon: 'mood' },
    { id: 'screening', label: 'Screening', icon: 'assignment' },
    { id: 'exercises', label: 'Exercises', icon: 'air' },
    { id: 'profile', label: 'Profile', icon: 'account_circle' },
    { id: 'helplines', label: 'Helplines', icon: 'phone_in_talk', isDanger: true },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe pointer-events-none md:hidden">
      <div className="max-w-md mx-auto px-3 mb-2">
        <div className="pointer-events-auto rounded-3xl bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(44,37,51,0.12),0_4px_12px_-2px_rgba(44,37,51,0.06)] border border-[#E2DACB] px-2 py-1.5 flex justify-between items-center overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-w-[44px] min-h-[46px] rounded-2xl py-1 px-1.5 transition-all flex-1 cursor-pointer select-none ${
                  isActive
                    ? 'text-primary font-bold bg-[#EEE7F5] shadow-2xs scale-100'
                    : item.isDanger
                    ? 'text-error hover:bg-[#FDE8E8] active:scale-95'
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/60 active:scale-95'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span 
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'font-bold text-[#45365C]' : ''
                  } ${item.isDanger && !isActive ? 'text-error' : ''}`}
                >
                  {item.icon}
                </span>
                <span 
                  className={`text-[10px] leading-[13px] mt-0.5 whitespace-nowrap tracking-tight ${
                    isActive ? 'font-bold text-[#2C2533]' : item.isDanger ? 'text-error font-medium' : 'text-on-surface-variant'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

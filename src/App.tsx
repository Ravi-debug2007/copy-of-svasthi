import React, { useState } from 'react';
import { ScreenType, ExerciseItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { DawnChatScreen } from './components/screens/DawnChatScreen';
import { ScreeningScreen } from './components/screens/ScreeningScreen';
import { ExercisesScreen } from './components/screens/ExercisesScreen';
import { HelplinesScreen } from './components/screens/HelplinesScreen';
import { DiaryScreen } from './components/screens/DiaryScreen';
import { CheckInScreen } from './components/screens/CheckInScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MediaModal } from './components/MediaModal';
import { INITIAL_EXERCISES } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [activeMediaExercise, setActiveMediaExercise] = useState<ExerciseItem | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickCalm = () => {
    const soundItem = INITIAL_EXERCISES.find((item) => item.id === 'sound-healing') || INITIAL_EXERCISES[0];
    setActiveMediaExercise(soundItem);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col items-center selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />
      <main className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-24 md:pb-12 flex-1 flex flex-col transition-all">
        {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} onOpenQuickCalm={handleOpenQuickCalm} />}
        {currentScreen === 'dawn' && <DawnChatScreen onNavigate={handleNavigate} />}
        {currentScreen === 'screening' && <ScreeningScreen onNavigate={handleNavigate} />}
        {currentScreen === 'exercises' && <ExercisesScreen onNavigate={handleNavigate} onPlayExercise={setActiveMediaExercise} />}
        {currentScreen === 'helplines' && <HelplinesScreen onNavigate={handleNavigate} />}
        {currentScreen === 'diary' && <DiaryScreen onNavigate={handleNavigate} onOpenBreathing={() => handleNavigate('exercises')} />}
        {currentScreen === 'check-in' && <CheckInScreen onNavigate={handleNavigate} />}
        {currentScreen === 'profile' && <ProfileScreen onNavigate={handleNavigate} />}
      </main>
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
      <MediaModal exercise={activeMediaExercise} onClose={() => setActiveMediaExercise(null)} />
    </div>
  );
}

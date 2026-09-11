export type ScreenType = 
  | 'home'
  | 'dawn'
  | 'screening'
  | 'exercises'
  | 'helplines'
  | 'diary'
  | 'check-in'
  | 'profile';

export interface MoodLog {
  id: string;
  timestamp: string;
  mood: 'Joyful' | 'Calm' | 'Okay' | 'Low' | 'Stressed' | 'Great' | 'Good' | 'Terrible';
  stressLevel: number;
  energyLevel: number;
  sleepHours: number;
  sensations: string[];
  contextFactors: string[];
  notes?: string;
}

export interface ScreeningQuestion {
  id: number;
  text: string;
  subtitle?: string;
  options: { label: string; sub: string; points: number }[];
}

export interface ScreeningTest {
  id: string;
  title: string;
  code: string;
  questionsCount: number;
  category: string;
  score?: number;
  maxScore: number;
  statusLabel?: string;
  statusTone?: 'mild' | 'moderate' | 'healthy' | 'neutral';
  questions: ScreeningQuestion[];
}

export interface Helpline {
  id: string;
  name: string;
  description: string;
  number: string;
  websiteUrl: string;
  tags: string[];
  badgeText?: string;
  type: 'government' | 'ngo' | 'clinical';
  languages?: string;
  availableHours?: string;
  is24x7?: boolean;
}

export interface ReflectionEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  content: string;
  tags: string[];
  cbtReport?: {
    emotionalSpectrum: { emotion: string; percentage: number; colorClass: string }[];
    distortions: { title: string; description: string; type: string }[];
    reframe: string;
    microAction: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'dawn';
  text: string;
  time: string;
  hasBreathAction?: boolean;
  chips?: string[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  author: string;
  duration: string;
  category: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  description: string;
}

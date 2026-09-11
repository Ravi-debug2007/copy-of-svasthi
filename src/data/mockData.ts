import { Helpline, ScreeningTest, ReflectionEntry, ExerciseItem } from '../types';

export const ASSETS = {
  emblem: 'https://lh3.googleusercontent.com/aida/AEtjO1XBQQ29_TDNCd_vrpfOtOVy7McralYggeMsnglZXDziCnl3Ai7yvvyrKXXK9BFTdQBJOG2USfQ2FcBn4lKQs246zQlgo1aS76ic0WpDbv06mAGtlK2Z7y4QDn9cXDRdloQOet9k4agOFDVAg0ICebsO_0nZWLc8eGsZnqnS6HT_CyUQfWdOnvDEAdhODZ00FBNSRskDK5Mcw5Ieges5ktuWFZoxQCdddADqPHpeX-svycAmkblX12x8wn8',
  dawnAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2nqqOdQUFXgCh_gt7Jmolm-GgS39_WWJc-HZEoASvJvr_okaSfP2geJT5MkRnO-FEJq1kAySO48fob-hHpG6Gt3J00X3scJkp47xiWt2DvpcswTTmwL-kgjSZePlkzQu31St_MvMMq9tK0F1Nfl1ohAy2Zln_VajM6clQ8ESGR3m4E9uTHMUfkKIxBqbDdGagThSxy8UiHNOPoENZUH0tZZST6Su9P2UgCTdfuaEzROFq8SQ2CCZcug',
  lotusIcon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2kcHKAUkzvpODh4MS4KWEg22-fqIPndibSOLn2U5ey8g1zbMNOPH9A2Vf6ZVC_sj8C8h6LPM33aSxWbjGpNzgYSaRP9HkSRAvN-Ek-Eela5is9Dn93a7zEoQD3B4iMGTqUNe5kju_vVSqThV4C8i1gUzQ4BNI4GEejXN2yGguQAKspJalbm7Fq6jdjfzxNby4l9OjtR_NkgP8PAQhbz_dnVCMCrPCcrofYHbMzRvOVM83XbWhj3376w',
  yogaThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsOTymcvr2BWZ89y9Mo05P7zcQDa5ICRqWNSIAyoVNmg00xL4t6GRn5AGAX5Qqjr5_RK8zDK5QeXfhIHnpKvRjzL6KUTVeR0PYcpRbBYtMrIA-WWDvn9YBh2ccIF_352bPm-lia4N5moJ1mhFv-ZqiCWpKn8Y8YAvbP9IrSDoSCppTzmqiQszG2a895soLbw_iEQN88Qy37p2a07eivMU1qoyPM9KRI_3UzoDTsiMhE9XVwxbXfjy7dw',
  yogaNidraThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOJwdt7KCgzqKf4CkL-1uo_XPJ2KVW7FXn7MFAcsEN2SPLWjWqlqiKvDS3lCzKc4P-0ENhA0uwX8DHfcvSdJb69IwF_ph99AMYI0ofhxTzvhJyOV8V_9spI-c-ePP3NXaFOqUHK1md1rFL9VZuO1aoO47KnyoQAlcq8s-OUQh55WtuF45zpgXnyxNoR5MFsSFH822BBEKHbuuRmeYj7ZVNx6JU_O-ULu54NuIfYRML9C3JHkCkGdiCSw',
  singingBowlThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsabLeAgPC4D9ERfK9viD4RZlyC5FT0CSvrQS0nG4m1hK_zpNbQ2_ObGhhLB7zlnbmuACjm3CklzmNPFSZ44_WYXgIblNy6r9bPh2VoS6JIIdTflXFOhNn8quxgA27OCkVdQI15Pif72Ur5TSlfEdQS8T0i5jFjlpV86ACLY9rvof79JOcG_jgaBZR7y8CdHgjsXGHC6MnBI4aSZpRHF2J3cBTvBYnrCZFytCvq3TON7OP8XiL_sL_7g',
};

export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  "Moving or speaking so slowly that other people could have noticed? Or being fidgety or restless?",
  "Thoughts that you would be better off dead, or of hurting yourself in some way?"
];

export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "Worrying too much about different things?",
  "Trouble relaxing?",
  "Being so restless that it's hard to sit still?",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?"
];

export const INITIAL_TESTS: ScreeningTest[] = [
  {
    id: 'phq-9',
    title: 'Depression Test (PHQ-9)',
    code: 'PHQ-9',
    questionsCount: 9,
    category: 'Mood Disorder',
    score: 7,
    maxScore: 27,
    statusLabel: 'Mild Depression',
    statusTone: 'mild',
    questions: PHQ9_QUESTIONS.map((q, idx) => ({
      id: idx + 1,
      text: q,
      subtitle: 'Over the last 2 weeks',
      options: [
        { label: '0 — Not at all', sub: 'Never (0 points)', points: 0 },
        { label: '1 — Several days', sub: 'Sometimes (1 point)', points: 1 },
        { label: '2 — More than half the days', sub: 'Often (2 points)', points: 2 },
        { label: '3 — Nearly every day', sub: 'Every day (3 points)', points: 3 },
      ]
    }))
  },
  {
    id: 'gad-7',
    title: 'Anxiety Test (GAD-7)',
    code: 'GAD-7',
    questionsCount: 7,
    category: 'Anxiety',
    score: 5,
    maxScore: 21,
    statusLabel: 'Mild Anxiety',
    statusTone: 'mild',
    questions: GAD7_QUESTIONS.map((q, idx) => ({
      id: idx + 1,
      text: q,
      subtitle: 'Over the last 2 weeks',
      options: [
        { label: '0 — Not at all', sub: 'Never (0 points)', points: 0 },
        { label: '1 — Several days', sub: 'Sometimes (1 point)', points: 1 },
        { label: '2 — More than half the days', sub: 'Often (2 points)', points: 2 },
        { label: '3 — Nearly every day', sub: 'Every day (3 points)', points: 3 },
      ]
    }))
  },
  {
    id: 'oci-r',
    title: 'OCD Test (OCI-R)',
    code: 'OCI-R',
    questionsCount: 18,
    category: 'Obsessive-Compulsive',
    maxScore: 72,
    questions: [
      { id: 1, text: 'I check things more often than necessary.', options: [{ label: 'Not at all', sub: '0 pts', points: 0 }, { label: 'A little', sub: '1 pt', points: 1 }, { label: 'Moderately', sub: '2 pts', points: 2 }, { label: 'Extremely', sub: '3 pts', points: 3 }] }
    ]
  },
  {
    id: 'pss-10',
    title: 'Stress Test (PSS-10)',
    code: 'PSS-10',
    questionsCount: 10,
    category: 'Perceived Stress',
    score: 18,
    maxScore: 40,
    statusLabel: 'Moderate Stress',
    statusTone: 'moderate',
    questions: [
      { id: 1, text: 'In the last month, how often have you been upset because of something that happened unexpectedly?', options: [{ label: 'Never', sub: '0 pts', points: 0 }, { label: 'Almost Never', sub: '1 pt', points: 1 }, { label: 'Sometimes', sub: '2 pts', points: 2 }, { label: 'Fairly Often', sub: '3 pts', points: 3 }] }
    ]
  },
  {
    id: 'mdq',
    title: 'Bipolar Disorder Test (MDQ)',
    code: 'MDQ',
    questionsCount: 13,
    category: 'Mood Disorder Questionnaire',
    maxScore: 13,
    questions: [
      { id: 1, text: 'Has there ever been a period of time when you were not your usual self and felt so good or so hyper that other people thought you were not your normal self?', options: [{ label: 'No', sub: '0 pts', points: 0 }, { label: 'Yes', sub: '1 pt', points: 1 }] }
    ]
  },
  {
    id: 'pcl-5',
    title: 'PTSD Test (PCL-5)',
    code: 'PCL-5',
    questionsCount: 20,
    category: 'Trauma Checklist',
    maxScore: 80,
    questions: [
      { id: 1, text: 'Repeated, disturbing, and unwanted memories of the stressful experience?', options: [{ label: 'Not at all', sub: '0 pts', points: 0 }, { label: 'A little bit', sub: '1 pt', points: 1 }, { label: 'Moderately', sub: '2 pts', points: 2 }, { label: 'Quite a bit', sub: '3 pts', points: 3 }] }
    ]
  },
  {
    id: 'eat-26',
    title: 'Eating Disorder (EAT-26)',
    code: 'EAT-26',
    questionsCount: 26,
    category: 'Eating Attitudes Test',
    maxScore: 78,
    questions: [
      { id: 1, text: 'Am terrified about being overweight.', options: [{ label: 'Never', sub: '0 pts', points: 0 }, { label: 'Rarely', sub: '1 pt', points: 1 }, { label: 'Sometimes', sub: '2 pts', points: 2 }, { label: 'Always', sub: '3 pts', points: 3 }] }
    ]
  },
  {
    id: 'asrs',
    title: 'ADHD Test (ASRS)',
    code: 'ASRS',
    questionsCount: 18,
    category: 'Adult Self-Report Scale',
    maxScore: 72,
    questions: [
      { id: 1, text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?', options: [{ label: 'Never', sub: '0 pts', points: 0 }, { label: 'Rarely', sub: '1 pt', points: 1 }, { label: 'Sometimes', sub: '2 pts', points: 2 }, { label: 'Very Often', sub: '3 pts', points: 3 }] }
    ]
  }
];

export const HELPLINES_DATA: Helpline[] = [
  {
    id: 'tele-manas',
    name: 'Tele-MANAS',
    description: 'Apex National Tele Mental Health Programme. Comprehensive clinical support & crisis triage.',
    number: '14416',
    websiteUrl: 'https://telemanas.mohfw.gov.in',
    tags: ['24x7', 'multilingual', 'all'],
    badgeText: 'MoHFW Initiative',
    type: 'government',
    languages: '20+ Languages',
    availableHours: '24 Hours / 365 Days',
    is24x7: true
  },
  {
    id: 'kiran',
    name: 'KIRAN Helpline',
    description: 'Depression, anxiety, panic attacks, adjustment disorders, and suicide prevention.',
    number: '1800-599-0019',
    websiteUrl: 'https://disabilityaffairs.gov.in',
    tags: ['24x7', 'multilingual', 'all'],
    badgeText: 'MSJE Dept.',
    type: 'government',
    languages: '13 Languages',
    availableHours: '24/7 Dedicated Counsellors',
    is24x7: true
  },
  {
    id: 'vandrevala',
    name: 'Vandrevala Foundation',
    description: 'Free clinical counselling & mental health crisis triage',
    number: '9999666555',
    websiteUrl: 'https://www.vandrevalafoundation.com',
    tags: ['24x7', 'multilingual', 'all'],
    type: 'ngo',
    availableHours: '24x7 Available',
    is24x7: true
  },
  {
    id: 'aasra',
    name: 'Aasra',
    description: 'Suicide prevention & profound emotional crisis support',
    number: '9820466726',
    websiteUrl: 'http://www.aasra.info',
    tags: ['24x7', 'all'],
    type: 'ngo',
    languages: 'English & Hindi',
    availableHours: '24/7 Suicide Lifeline',
    is24x7: true
  },
  {
    id: 'sneha',
    name: 'Sneha India',
    description: 'Compassionate listening & suicide intervention centre',
    number: '04424640050',
    websiteUrl: 'https://snehaindia.org',
    tags: ['24x7', 'all'],
    type: 'ngo',
    languages: 'English & Tamil',
    availableHours: '24/7 Service',
    is24x7: true
  },
  {
    id: 'peakmind',
    name: 'PeakMind',
    description: 'Youth, student anxiety, academic distress & de-escalation',
    number: '08047092334',
    websiteUrl: 'https://peakmind.in',
    tags: ['youth', 'multilingual', 'all'],
    type: 'clinical',
    availableHours: 'Dedicated Counsellors',
    is24x7: false
  },
  {
    id: 'mpower',
    name: 'Mpower 1 on 1',
    description: '24x7 Mental health helpline by trained mental health professionals',
    number: '1800120820050',
    websiteUrl: 'https://mpowerminds.com',
    tags: ['24x7', 'multilingual', 'all'],
    type: 'clinical',
    languages: 'English, Hindi, Marathi',
    availableHours: '24x7 Toll-Free',
    is24x7: true
  },
  {
    id: 'fortis',
    name: 'Fortis Stress Helpline',
    description: 'Department of Mental Health & Behavioural Sciences crisis line',
    number: '8376804102',
    websiteUrl: 'https://www.fortishealthcare.com',
    tags: ['24x7', 'multilingual', 'all'],
    type: 'clinical',
    languages: 'Multilingual (8+ Languages)',
    availableHours: '24x7 Clinical Support',
    is24x7: true
  }
];

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'yoga-morning',
    title: '10-Min Morning Stress Relief Yoga',
    author: 'Dr. Ananya Sharma • Somatic Clinician',
    duration: '10:15',
    category: 'Yoga',
    tags: ['Beginner', 'Nervous System'],
    imageUrl: ASSETS.yogaThumb,
    description: 'Gentle cat-cow stretches, thoracic openers, and vagus nerve activations to decompress cortisol levels before starting your day.'
  },
  {
    id: 'yoga-nidra',
    title: 'Yoga Nidra for Deep Rest & Anxiety Relief',
    author: 'Evening Reset',
    duration: '15:00',
    category: 'Meditation',
    tags: ['Guided Voice', 'Sleep Prep'],
    imageUrl: ASSETS.yogaNidraThumb,
    description: 'Guided body scan meditation designed to unlock theta brainwave states and dissolve physical and emotional tension.'
  },
  {
    id: 'sound-healing',
    title: 'Sound Healing & Tibetan Singing Bowls',
    author: '432Hz Resonance',
    duration: '20:00',
    category: 'Soundscape',
    tags: ['Soundscape', 'Anti-Stress'],
    imageUrl: ASSETS.singingBowlThumb,
    description: 'Acoustic frequency bath harmonizing internal resonance to quiet mental chatter and reset anxious autonomic rhythms.'
  }
];

export const DEFAULT_DIARY_ENTRIES: ReflectionEntry[] = [
  {
    id: 'ref-1',
    title: 'Client Demo Anxieties & Stutter',
    date: 'Sep 11, 2026',
    time: '3:42 PM',
    content: "Today felt overwhelming during the client demo. I felt like everybody was judging my stutter, and I couldn't stop thinking that I ruined the entire project for my whole team...",
    tags: ['Anxiety', 'Work', 'Public Speaking'],
    cbtReport: {
      emotionalSpectrum: [
        { emotion: 'Anxiety', percentage: 78, colorClass: 'bg-error text-white' },
        { emotion: 'Self-Doubt', percentage: 65, colorClass: 'bg-secondary text-white' },
        { emotion: 'Vulnerability', percentage: 50, colorClass: 'bg-surface-tint text-white' }
      ],
      distortions: [
        {
          type: 'Mind Reading',
          title: 'Mind Reading',
          description: 'You assumed your colleagues were harshly evaluating your worth based on a fleeting physiological reaction.'
        },
        {
          type: 'Catastrophizing',
          title: 'Catastrophizing',
          description: 'Concluding that the entire multi-month project was completely ruined from one brief stutter.'
        }
      ],
      reframe: '“A moment of nervousness or stuttering is deeply human and relatable. It does not erase the solid research and rigorous preparation you brought to the room. Your value and competence are never measured by perfectly fluent speech alone.”',
      microAction: 'Take a 2-minute Grounding Box Breath right now, then jot down 3 factual items that went objectively well during the presentation.'
    }
  },
  {
    id: 'ref-2',
    title: 'Evening Release',
    date: 'Sep 10, 2026',
    time: '9:15 PM',
    content: 'Spent time decompressing after phone calls. Realized I need clearer boundaries around working past sunset. My body holds the tension in my shoulders...',
    tags: ['Fatigue', 'Boundary Setting', 'Resolved']
  },
  {
    id: 'ref-3',
    title: 'Morning Grounding',
    date: 'Sep 9, 2026',
    time: '8:00 AM',
    content: 'Drank herbal tulsi tea on the balcony and listened to morning birds. Felt a calm anchor that stayed with me throughout my morning meetings...',
    tags: ['Peace', 'Gratitude', 'Mindful']
  }
];

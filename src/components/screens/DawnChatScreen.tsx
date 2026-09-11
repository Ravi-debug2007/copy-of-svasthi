import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../../data/mockData';
import { ChatMessage, ScreenType } from '../../types';
import { playSingingBowlChime } from '../../utils/audio';
import { DawnCompanionArt, BreathLeavesArt } from '../illustrations/IndieIllustrations';
import { sendChatMessage } from '../../services/svasthi';

interface DawnChatScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const DawnChatScreen: React.FC<DawnChatScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'dawn',
      text: "Hello Aarav. I'm Dawn, your mindful wellness companion. I'm here to listen without judgment. How are you holding up today?",
      time: '10:42 AM',
      chips: [
        '✨ Feeling overwhelmed with work',
        "🌙 Can't fall asleep",
        '🫁 Need a quick breathing exercise',
        '💬 Just want to vent'
      ]
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: "I've been feeling anxious about my upcoming presentation, and my chest feels tight.",
      time: '10:43 AM'
    },
    {
      id: 'msg-3',
      sender: 'dawn',
      text: "It is completely understandable to feel physical tension before public speaking. Your body is just trying to prepare you, but we can help it soften.\n\nLet's ground ourselves first. Would you like to do a 1-minute 4-4-4-4 Box Breathing exercise with me, or break down the thoughts causing this worry?",
      time: '10:44 AM',
      hasBreathAction: true
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isCrisisExpanded, setIsCrisisExpanded] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isReflecting, setIsReflecting] = useState(false);

  // Micro breathing session in Dawn chat
  const [isMicroBreathActive, setIsMicroBreathActive] = useState(false);
  const [microPhaseIndex, setMicroPhaseIndex] = useState(0);
  const microPhases = ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Rest (4s)'];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isReflecting, isMicroBreathActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMicroBreathActive) {
      playSingingBowlChime(432);
      timer = setInterval(() => {
        setMicroPhaseIndex((prev) => (prev + 1) % microPhases.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isMicroBreathActive]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: userTime
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsReflecting(true);
    let response;
    try {
      response = await sendChatMessage(text);
    } catch (requestError) {
      setIsReflecting(false);
      setMessages((prev) => [...prev, { id: `dawn-error-${Date.now()}`, sender: 'dawn', text: requestError instanceof Error ? requestError.message : 'I could not connect right now. Please try again.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      return;
    }

    // Thoughtful empathetic AI companion response
    setTimeout(() => {
      setIsReflecting(false);
      const dawnTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      let reply = response.reply;
      let offerBreath = false;

      const lower = '';
      if (lower.includes('breath') || lower.includes('breathing')) {
        reply = "Let's take a conscious pause together. Regulating your breath is the fastest biological signal to your vagus nerve that you are safe right now.";
        offerBreath = true;
      } else if (lower.includes('sleep') || lower.includes('night') || lower.includes('insomnia')) {
        reply = "Restless nights can feel exhausting. Try softening the muscles behind your eyes, loosening your jaw, and letting your thoughts drift past like leaves on a slow stream.";
      } else if (lower.includes('work') || lower.includes('presentation') || lower.includes('boss') || lower.includes('deadline')) {
        reply = "High demands easily trigger our nervous system into threat mode. Would you like to do a quick 3-minute somatic reset or reframe the self-critical narrative?";
      } else if (lower.includes('vent') || lower.includes('angry') || lower.includes('frustrated')) {
        reply = "I'm right here with you. Speak without holding back. Release whatever needs to be released—this space is entirely judgment-free.";
      } else if (lower.includes('die') || lower.includes('suicide') || lower.includes('harm') || lower.includes('end it')) {
        reply = "You matter deeply, and you are not alone in this pain. Please reach out right now to a compassionate specialist. Tele-MANAS is free, 24/7, and confidential at 14416.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `dawn-${Date.now()}`,
          sender: 'dawn',
          text: reply,
          time: dawnTime,
          hasBreathAction: offerBreath
        }
      ]);

      if (isSpeaking && 'speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.rate = 0.95;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        } catch {
          // audio fallback
        }
      }
    }, 1200);
  };

  const handleClear = () => {
    if (window.confirm('Reset this conversation with Dawn?')) {
      setMessages([
        {
          id: 'msg-reset',
          sender: 'dawn',
          text: "Welcome back, Aarav. Take a slow, mindful breath. How can I support your calm today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chips: ['✨ Feeling overwhelmed with work', '🫁 Need a quick breathing exercise', '💬 Just want to vent']
        }
      ]);
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false);
        setInputVal("I'm feeling a bit tired today, but taking it one step at a time.");
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Responsive 2-Column Grid on Desktop (lg:), Single Column on Mobile */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        {/* Left Column (Desktop Sidebar / Mobile Top Cards) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-3.5 mb-3 lg:mb-0">
          {/* Sub-bar / Dawn Persona Header Card */}
          <div className="bg-[#EEE7F5] rounded-3xl p-4.5 sm:p-5 shadow-xs flex items-center justify-between border border-[#E0D5EB]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-13 h-13 rounded-full overflow-hidden bg-white shadow-2xs ring-2 ring-[#D7C9E4]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Dawn Therapist Companion"
                    src={ASSETS.dawnAvatar}
                  />
                </div>
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#3B6346] ring-2 ring-[#EEE7F5]"
                  title="Active & Listening"
                ></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-headline text-base md:text-lg font-bold text-[#2C2533] truncate">Dawn</h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#48375F] tracking-wide">
                    CBT Companion
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#5C4A73]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B6346] inline-block"></span>
                  <span className="text-xs truncate font-medium">Mindful Active Listening</span>
                </div>
              </div>
            </div>

            {/* Quick Tool Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsSpeaking(!isSpeaking)}
                aria-label="Toggle voice readout"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isSpeaking ? 'bg-white text-[#48375F] shadow-2xs' : 'bg-white/50 text-on-surface-variant'
                }`}
                title={isSpeaking ? 'Voice Readout On' : 'Muted'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSpeaking ? 'volume_up' : 'volume_off'}
                </span>
              </button>
              <button
                onClick={handleClear}
                aria-label="Clear chat session"
                className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-[#48375F] hover:bg-white transition-colors cursor-pointer shadow-2xs"
                title="Refresh Conversation"
              >
                <span className="material-symbols-outlined text-[19px]">refresh</span>
              </button>
            </div>
          </div>

          {/* Dedicated Hand-Drawn Indie Illustration Card (Desktop view) */}
          <div className="hidden lg:flex items-center justify-between bg-[#F4EFE6] rounded-3xl p-4.5 border border-[#E4DCCB] shadow-2xs">
            <div className="flex flex-col gap-1 max-w-[170px]">
              <span className="text-xs font-bold text-[#3E3447]">Safe Reflection Space</span>
              <p className="text-[11px] text-[#695D75] leading-relaxed">
                Dawn applies evidence-backed Cognitive Behavioral reframing without judging.
              </p>
            </div>
            <DawnCompanionArt className="w-18 h-18 flex-shrink-0" />
          </div>

          {/* Crisis Safety Guardrail Banner */}
          <div className="bg-[#FDE8E8] text-[#7A1E1E] rounded-3xl p-4 shadow-2xs transition-all duration-300 border border-[#F5CDCD]">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="material-symbols-outlined text-[20px] text-[#BA1A1A] flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
                <span className="text-xs md:text-sm font-bold text-[#8C1D1D] truncate">
                  Care & Crisis Support
                </span>
              </div>
              <button
                onClick={() => setIsCrisisExpanded(!isCrisisExpanded)}
                aria-label="Collapse alert"
                className="text-[#8C1D1D] p-0.5 hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCrisisExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {isCrisisExpanded && (
              <div className="mt-2 text-xs space-y-2">
                <p className="leading-relaxed">
                  If you are experiencing severe distress or overwhelming thoughts, free and confidential
                  support is available 24/7 across India.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    className="inline-flex items-center gap-1 bg-[#BA1A1A] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-2xs active:scale-95 transition-transform hover:opacity-90"
                    href="tel:14416"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    <span>Tele-MANAS: 14416</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-1 bg-white text-[#8C1D1D] px-3 py-1.5 rounded-full text-xs font-semibold shadow-2xs active:scale-95 transition-transform hover:bg-[#FEECEB]"
                    href="tel:18005990019"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    <span>KIRAN: 1800-599-0019</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Somatic Quick Relief Desktop Tools */}
          <div className="hidden lg:flex flex-col gap-2.5 bg-[#FAF7F2] rounded-3xl p-4.5 border border-[#EADFCB] shadow-2xs">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Quick Calming Exercises
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onNavigate('exercises')}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5EFEB] hover:bg-[#ECE3DA] text-left transition-colors cursor-pointer border border-[#E2D6C5] text-xs font-medium text-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3B6346] text-[18px]">air</span>
                  <span>4-4-4-4 Box Breathing</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('exercises')}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5EFEB] hover:bg-[#ECE3DA] text-left transition-colors cursor-pointer border border-[#E2D6C5] text-xs font-medium text-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#87513D] text-[18px]">pan_tool</span>
                  <span>5-4-3-2-1 Sensory Grounding</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('screening')}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5EFEB] hover:bg-[#ECE3DA] text-left transition-colors cursor-pointer border border-[#E2D6C5] text-xs font-medium text-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5D4677] text-[18px]">fact_check</span>
                  <span>Clinical Assessments (PHQ-9/GAD-7)</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Stream & Input Dock */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Chat Stream Container */}
          <div className="bg-[#F5EFEB] rounded-3xl p-5 space-y-4 shadow-xs border border-[#E5DAC6] min-h-[440px] lg:min-h-[560px]">
        {/* Timestamp Badge */}
        <div className="flex justify-center">
          <span className="px-3 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
            Today • 10:42 AM
          </span>
        </div>

        {messages.map((msg) => {
          if (msg.sender === 'dawn') {
            return (
              <div key={msg.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-2 max-w-[92%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-primary-fixed mt-1 shadow-sm ring-1 ring-white">
                    <img
                      className="w-full h-full object-cover"
                      alt="Dawn Emblem"
                      src={ASSETS.lotusIcon}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="bg-surface-container-lowest text-on-surface rounded-2xl rounded-tl-none p-4 shadow-sm space-y-2 border border-primary/5">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>

                      {/* Interactive Action Card inside Dawn's response */}
                      {msg.hasBreathAction && (
                        <div className="bg-surface-container-high rounded-xl p-3 space-y-2.5 mt-2 border border-primary/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-[20px]">
                                air
                              </span>
                              <span className="text-xs font-bold text-primary">Micro-Calm Session</span>
                            </div>
                            <span className="text-on-surface-variant text-xs">60 sec</span>
                          </div>

                          {!isMicroBreathActive ? (
                            <button
                              onClick={() => setIsMicroBreathActive(true)}
                              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold text-xs py-2.5 px-4 rounded-full shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                              <span>Start 1-Min Calming Breath</span>
                            </button>
                          ) : (
                            <div className="text-center py-2.5 bg-surface-container rounded-lg border border-primary/10 transition-all flex flex-col items-center">
                              <span className="font-headline text-base font-bold text-primary animate-pulse">
                                {microPhases[microPhaseIndex]}
                              </span>
                              <span className="text-[11px] text-on-surface-variant mt-0.5">
                                4 • 4 • 4 • 4 Cycle • Relax your shoulders
                              </span>
                              <button
                                onClick={() => setIsMicroBreathActive(false)}
                                className="mt-2 text-[11px] text-secondary font-semibold hover:underline"
                              >
                                End Session
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant pl-1">
                      Dawn • {msg.time}
                    </span>
                  </div>
                </div>

                {/* Chips if present */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-col gap-1 pl-10 pr-1 mt-1">
                    <span className="text-xs text-on-surface-variant">Suggested topics to begin:</span>
                    <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip.replace(/^[^\w]+/, '').trim())}
                          className="flex-shrink-0 bg-surface-container hover:bg-surface-container-high text-primary px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all active:scale-95 cursor-pointer border border-primary/5"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1 ml-auto max-w-[84%]">
                <div className="bg-primary-fixed text-primary rounded-2xl rounded-tr-none px-4 py-3 shadow-sm border border-primary/5">
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 pr-1">
                  <span className="text-[11px] text-on-surface-variant">You • {msg.time}</span>
                  <span
                    className="material-symbols-outlined text-[14px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    done_all
                  </span>
                </div>
              </div>
            );
          }
        })}

        {/* Typing indicator */}
        {isReflecting && (
          <div className="flex items-center gap-2 pl-2 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            </div>
            <span className="text-xs text-on-surface-variant italic">Dawn is reflecting...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Dock */}
      <div className="sticky bottom-0 pt-2 mt-2 bg-surface/90 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Pulsing Voice Recording CTA */}
          <button
            type="button"
            onClick={toggleVoiceRecording}
            aria-label="Record voice note"
            className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
              isRecording
                ? 'bg-error text-white'
                : 'bg-secondary-fixed text-on-secondary-fixed hover:opacity-90'
            }`}
          >
            {isRecording && (
              <span className="absolute inset-0 rounded-full bg-error animate-ping opacity-40"></span>
            )}
            <span className="material-symbols-outlined text-[24px]">
              {isRecording ? 'mic_off' : 'mic'}
            </span>
          </button>

          {/* Pill Shaped Input Field */}
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Talk to Dawn about anything..."
              className="w-full h-12 pl-4 pr-10 rounded-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/70 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-primary/5"
            />
            <button
              type="button"
              onClick={() => onNavigate('check-in')}
              aria-label="Attach mood"
              className="absolute right-3 text-on-surface-variant hover:text-primary cursor-pointer"
              title="Add Mood Check-in"
            >
              <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
            </button>
          </div>

          {/* Primary Send Action Button */}
          <button
            type="submit"
            aria-label="Send message"
            className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>

        <p className="text-center text-[11px] text-on-surface-variant mt-1.5 truncate">
          Niramaya AI is a supportive guide, not medical advice.
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

// Web Audio API Sound Synthesizer for Tibetan Singing Bowls & Chimes

let audioCtx: AudioContext | null = null;
let activeOscillator: OscillatorNode | null = null;
let activeGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a rich, resonant Tibetan singing bowl bell chime
 */
export function playSingingBowlChime(pitch: number = 432) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Harmonic frequencies that produce the warm metallic timbre of a singing bowl
    const harmonics = [
      { freq: pitch, gain: 0.5, decay: 4.5 },
      { freq: pitch * 1.5, gain: 0.25, decay: 3.8 },
      { freq: pitch * 2.76, gain: 0.15, decay: 2.5 },
      { freq: pitch * 4.02, gain: 0.08, decay: 1.8 }
    ];

    harmonics.forEach(({ freq, gain: targetGain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.warn('Audio synthesis not permitted without user interaction', err);
  }
}

/**
 * Start or stop continuous 432Hz calming drone
 */
export function toggleDrone432Hz(start: boolean) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (!start) {
      if (activeGain && activeOscillator) {
        activeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          activeOscillator?.stop();
          activeOscillator = null;
          activeGain = null;
        }, 1300);
      }
      return;
    }

    if (activeOscillator) return; // already playing

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 2.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    activeOscillator = osc;
    activeGain = gain;
  } catch (err) {
    console.warn('Audio error', err);
  }
}

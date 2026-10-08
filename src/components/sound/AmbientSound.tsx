"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { trackClientEvent } from "@/lib/analytics-client";

/**
 * Generative "alpine" ambience made with the Web Audio API – no audio files.
 * A warm pad, soft wind and distant bell tones, plus quiet ticks on link hover.
 * Browsers only allow sound after a user gesture, so it always starts from a click.
 */

const STORAGE_KEY = "sw_sound";
// D major pentatonic, two octaves
const BELL_NOTES = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98];

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  timers: number[];
  tick: () => void;
  stop: () => void;
}

function createEngine(): Engine {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);

  // Shared echo for space
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.35;
  const delayTone = ctx.createBiquadFilter();
  delayTone.type = "lowpass";
  delayTone.frequency.value = 2400;
  delay.connect(delayTone).connect(feedback).connect(delay);
  delayTone.connect(master);

  // Pad: detuned voices through a slowly breathing low-pass filter
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.value = 650;
  padFilter.Q.value = 0.7;
  const padGain = ctx.createGain();
  padGain.gain.value = 0.11;
  padFilter.connect(padGain).connect(master);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.045;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 320;
  lfo.connect(lfoDepth).connect(padFilter.frequency);
  lfo.start();
  const voices: OscillatorNode[] = [];
  [146.83, 220, 293.66, 369.99].forEach((f, i) => {
    for (const detune of [-7, 7]) {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "triangle" : "sine";
      o.frequency.value = f;
      o.detune.value = detune;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.28;
      o.connect(g).connect(padFilter);
      o.start();
      voices.push(o);
    }
  });

  // Wind: filtered noise with a wandering band
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;
  noise.loop = true;
  const windBand = ctx.createBiquadFilter();
  windBand.type = "bandpass";
  windBand.frequency.value = 500;
  windBand.Q.value = 0.6;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.025;
  const windLfo = ctx.createOscillator();
  windLfo.frequency.value = 0.07;
  const windLfoDepth = ctx.createGain();
  windLfoDepth.gain.value = 300;
  windLfo.connect(windLfoDepth).connect(windBand.frequency);
  windLfo.start();
  noise.connect(windBand).connect(windGain).connect(master);
  noise.start();

  // Bells: simple FM strike with long decay, random pan
  const bell = () => {
    const now = ctx.currentTime;
    const f = BELL_NOTES[Math.floor(Math.random() * BELL_NOTES.length)];
    const carrier = ctx.createOscillator();
    carrier.frequency.value = f;
    const mod = ctx.createOscillator();
    mod.frequency.value = f * 2.76;
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(f * 1.4, now);
    modGain.gain.exponentialRampToValueAtTime(1, now + 2.2);
    mod.connect(modGain).connect(carrier.frequency);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(0.06 + Math.random() * 0.04, now + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.random() * 1.6 - 0.8;
    carrier.connect(env).connect(pan);
    pan.connect(master);
    pan.connect(delay);
    carrier.start(now);
    mod.start(now);
    carrier.stop(now + 3.6);
    mod.stop(now + 3.6);
  };

  const timers: number[] = [];
  const scheduleBell = () => {
    bell();
    if (Math.random() < 0.35) timers.push(window.setTimeout(bell, 220 + Math.random() * 300));
    timers.push(window.setTimeout(scheduleBell, 3500 + Math.random() * 6500));
  };
  timers.push(window.setTimeout(scheduleBell, 1800));

  // Hover tick
  let lastTick = 0;
  const tick = () => {
    const now = ctx.currentTime;
    if (now - lastTick < 0.06) return;
    lastTick = now;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(2200, now);
    o.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.035, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    o.connect(g).connect(master);
    o.start(now);
    o.stop(now + 0.06);
  };

  master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5);

  const stop = () => {
    timers.forEach(clearTimeout);
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 0.8);
    window.setTimeout(() => {
      voices.forEach((v) => v.stop());
      noise.stop();
      ctx.close();
    }, 900);
  };

  return { ctx, master, timers, tick, stop };
}

export default function AmbientSound() {
  const { language } = useLanguage();
  const isDe = language === "de";
  const [on, setOn] = useState(false);
  const engine = useRef<Engine | null>(null);

  const start = useCallback(() => {
    if (engine.current) return;
    try {
      engine.current = createEngine();
      setOn(true);
    } catch {
      setOn(false);
    }
  }, []);

  const stop = useCallback(() => {
    engine.current?.stop();
    engine.current = null;
    setOn(false);
  }, []);

  // Resume on the first interaction if the visitor turned sound on during an earlier visit
  useEffect(() => {
    let wanted = false;
    try {
      wanted = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {}
    if (!wanted) return;
    const resume = () => start();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [start]);

  // Quiet ticks when hovering links and buttons
  useEffect(() => {
    if (!on) return;
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as HTMLElement | null;
      const el = t?.closest("a, button");
      const from = (e.relatedTarget as HTMLElement | null)?.closest?.("a, button");
      if (el && el !== from) engine.current?.tick();
    };
    document.addEventListener("pointerover", onOver);
    return () => document.removeEventListener("pointerover", onOver);
  }, [on]);

  useEffect(() => () => engine.current?.stop(), []);

  const toggle = () => {
    const next = !on;
    if (next) start();
    else stop();
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    trackClientEvent("sound_toggle", { meta: { label: next ? "on" : "off" } });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={isDe ? (on ? "Hintergrundklang ausschalten" : "Hintergrundklang einschalten") : on ? "Turn ambient sound off" : "Turn ambient sound on"}
      className="group flex items-center gap-2"
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] bg-white ${on ? "sound-bar" : ""}`}
            style={{ height: on ? undefined : "3px", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="eyebrow hidden 2xl:inline">{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}

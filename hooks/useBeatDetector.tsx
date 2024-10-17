import { useEffect, useState } from 'react';
import * as beatDetector from 'web-audio-beat-detector';

const useBeatDetection = (audioUrl: string) => {
  const [isBeat, setIsBeat] = useState(false);

  useEffect(() => {
    const detectBeat = async () => {
      const audioContext = new AudioContext();
      const audio = new Audio(audioUrl);
      const audioSource = audioContext.createMediaElementSource(audio);
      audio.crossOrigin = 'anonymous';
      audio.play();

      try {
        const tempo = await beatDetector.detect(audioSource);
        const interval = 60 / tempo; // Time between beats

        setInterval(() => {
          setIsBeat(true);
          setTimeout(() => setIsBeat(false), 100); // Short blink effect
        }, interval * 1000);
      } catch (error) {
        console.error('Error detecting beat:', error);
      }
    };

    detectBeat();
  }, [audioUrl]);

  return { isBeat };
};

export default useBeatDetection;

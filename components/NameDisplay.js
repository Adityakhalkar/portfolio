import { useEffect, useState } from 'react';
import Meyda from 'meyda';
import styles from './NameDisplay.module.css';

const NameDisplay = () => {
    const [font, setFont] = useState('Arial');

    useEffect(() => {
        const fonts = ["Arial", "Verdana", "Helvetica", "Courier", "Times New Roman", "Georgia", "Palatino", "Garamond"];
        const audioElement = document.getElementById('bg-music');
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const meydaAnalyzer = Meyda.createMeydaAnalyzer({
            audioContext: audioContext,
            source: source,
            bufferSize: 512,
            featureExtractors: ['rms'],
            callback: features => {
                if (features.rms > 0.05) { // Adjust threshold as needed
                    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                    setFont(randomFont);
                }
            }
        });

        audioElement.addEventListener('play', () => {
            audioContext.resume().then(() => {
                meydaAnalyzer.start();
            });
        });

        audioElement.addEventListener('pause', () => {
            meydaAnalyzer.stop();
        });

        return () => {
            meydaAnalyzer.stop();
        };
    }, []);

    return (
        <div className={styles.nameDisplay} style={{ fontFamily: font }}>
            Aditya Khalkar
        </div>
    );
};

export default NameDisplay;

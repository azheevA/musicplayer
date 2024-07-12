import React, { useEffect, useRef, useState } from 'react';
import styles from './css/VisualizerBars.module.css';

const VisualizerBars = ({ audio }) => {
    const [amplitudeArray, setAmplitudeArray] = useState([]);
    const requestRef = useRef();

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            analyser.getByteFrequencyData(dataArray);
            const values = dataArray.slice(0, 10); // выбираем первые 10 значений для визуализации
            setAmplitudeArray(values);
            requestRef.current = requestAnimationFrame(draw);
        };

        audio.addEventListener('play', () => {
            requestRef.current = requestAnimationFrame(draw);
        });

        audio.addEventListener('pause', () => {
            cancelAnimationFrame(requestRef.current);
        });

        return () => {
            cancelAnimationFrame(requestRef.current);
            audioContext.close();
        };

    }, [audio]);

    return (
        <div className={styles.visualizer}>
            {amplitudeArray.map((value, index) => (
                <div
                    key={index}
                    className={styles.bar}
                    style={{ height: `${value}px` }}
                />
            ))}
        </div>
    );
};

export default VisualizerBars;

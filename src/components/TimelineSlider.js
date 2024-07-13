import React, { useState, useEffect } from 'react';
import styles from './css/TimelineSlider.module.css';

const TimelineSlider = ({ currentTime, duration, onChange }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(currentTime);
    }, [currentTime]);

    const handleClick = (e) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - left;
        const newProgress = (clickX / width) * duration;
        setProgress(newProgress);
        onChange(newProgress);
    };

    return (
        <div className={styles.timelineSlider}>
            <div className={styles.timeline}>
                <small className={styles.time}>{Math.floor(progress / 60) + ":" + ("0" + Math.floor(progress % 60)).slice(-2)}</small>
                <small className={styles.fulltime}>
                    {Math.floor(duration / 60) + ":" + ("0" + Math.floor(duration % 60)).slice(-2)}
                </small>
            </div>
            <div className={styles.rangeSlider} onClick={handleClick}>
                <div
                    className={styles.progress}
                    style={{ width: `${(progress / duration) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default TimelineSlider;

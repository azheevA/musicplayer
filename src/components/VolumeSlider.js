import React from 'react';
import styles from './css/VolumeSlider.module.css';

const VolumeSlider = ({ volume, handleVolumeChange }) => {
    const handleClick = (e) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - left;
        const newVolume = (clickX / width) * 100;
        handleVolumeChange({ target: { value: newVolume } });
    };

    return (
        <div className={styles.volumeSlider}>
            <i className={`fa-volume-up ${styles.volumeIcon}`}></i>
            <div className={styles.rangeSlider} onClick={handleClick}>
                <div
                    className={styles.progress}
                    style={{ width: `${volume}%` }}
                ></div>
            </div>
        </div>
    );
};

export default VolumeSlider;

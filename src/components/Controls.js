import React from 'react';
import styles from './css/Controls.module.css';

const Controls = ({ playTrack, nextTrack, prevTrack, trackPlaying }) => {
    return (
        <div className={styles.controls}>
            <button className={styles.btn} onClick={prevTrack}>
                <i className="fas fa-backward"><span className="material-symbols-outlined">
                arrow_back
                </span></i>
            </button>
            <button className={`${styles.btn} ${styles.btnMain}`} onClick={playTrack}>
                <i className={`fas ${trackPlaying ? 'fa-pause' : 'fa-play'}`}>
                    {!trackPlaying ?
                        <span className="material-symbols-outlined">
                        play_arrow
                    </span> :
                        <span className="material-symbols-outlined">
                        pause
                    </span>
                    }

                </i>
            </button>
            <button className={styles.btn} onClick={nextTrack}>
            <i className="fas fa-forward"><span className="material-symbols-outlined">
                arrow_forward
                </span></i>
            </button>
        </div>
    );
};

export default Controls;

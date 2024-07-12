import React, { useEffect, useRef } from 'react';
import styles from './css/Playlist.module.css';

const Playlist = ({ tracks, currentTrackId, onSelectTrack, isOpen, togglePlaylist, isOpenByButton }) => {
    const playlistRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && playlistRef.current && !playlistRef.current.contains(event.target)) {
                togglePlaylist(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, togglePlaylist]);

    return (
        <div ref={playlistRef} className={`${styles.playlist} ${isOpen ? styles.open : ''}`}
             onMouseEnter={isOpen ? null : () => togglePlaylist(true)}
             onMouseLeave={() => togglePlaylist(false)}
        >
            {tracks.map((track, index) => (
                <div
                    key={index}
                    className={styles.track}
                    onClick={() => onSelectTrack(index)}
                >
                    {track}
                </div>
            ))}
        </div>
    );
};

export default Playlist;

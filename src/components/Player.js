import React, { useState, useEffect, useRef } from 'react';
import TimelineSlider from './TimelineSlider';
import VolumeSlider from './VolumeSlider';
import Controls from './Controls';
import Playlist from './Playlist';
import styles from './css/Player.module.css';
import VisualizerBars from "./VisualizerBars";

const tracks = [
    "Crustpunk(CYBERPUNK 2077)",
    "Tokyo Rain (Official Audio)"
];

const artists = [
    "IBDY (RAT BOY)",
    "Marcus Warner"
];

const covers = [
    "1",
    "2"
];

const Player = () => {
    const [trackId, setTrackId] = useState(0);
    const [trackPlaying, setTrackPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [IsOpenBB,setIsOpenBB] =useState(false);
    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const timeRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const newAudio = new Audio(`/assets/tracks/${tracks[trackId]}.m4a`);
        newAudio.volume = volume / 100;
        newAudio.loop = isLooping;
        setAudio(newAudio);

        const handleEnded = () => nextTrack();
        const handleTimeUpdate = () => setCurrentTime(newAudio.currentTime);
        const handleLoadedData = () => setDuration(newAudio.duration);

        newAudio.addEventListener('ended', handleEnded);
        newAudio.addEventListener('timeupdate', handleTimeUpdate);
        newAudio.addEventListener('loadeddata', handleLoadedData);

        if (trackPlaying) {
            const playPromise = newAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.error('Playback failed:', error));
            }
        }

        return () => {
            newAudio.pause();
            newAudio.removeEventListener('ended', handleEnded);
            newAudio.removeEventListener('timeupdate', handleTimeUpdate);
            newAudio.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [trackId]);

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [audio, volume]);

    useEffect(() => {
        if (audio) {
            audio.loop = isLooping;
        }
    }, [audio, isLooping]);

    const playTrack = () => {
        if (audio) {
            if (!trackPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => setTrackPlaying(true)).catch(error => console.error('Playback failed:', error));
                }
            } else {
                audio.pause();
                setTrackPlaying(false);
            }
        }
    };

    const nextTrack = () => {
        setTrackId((trackId + 1) % tracks.length);
    };

    const prevTrack = () => {
        setTrackId((trackId - 1 + tracks.length) % tracks.length);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    const handleSliderChange = (newProgress) => {
        if (audio) {
            audio.currentTime = newProgress;
            setCurrentTime(newProgress);
        }
    };

    const togglePlaylist = () => {

        setPlaylistOpen(!playlistOpen);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
        if (audio) {
            audio.loop = !isLooping;
        }
    };

    const selectTrack = (index) => {
        setTrackId(index);
        setPlaylistOpen(false);
    };

    return (
        <div className={styles.player}>
            <button
                onClick={togglePlaylist}
                className={styles.playlistButton}
                disabled={playlistOpen}
            >
                <span className="material-symbols-outlined">
                    {playlistOpen ? 'close' : 'playlist_play'}
                </span>
            </button>
            <div>
                <Playlist
                    tracks={tracks}
                    currentTrackId={trackId}
                    onSelectTrack={selectTrack}
                    isOpen={playlistOpen}
                    togglePlaylist={togglePlaylist}
                />
            </div>
            <img src={`/assets/covers/${covers[trackId]}.jpg`} alt="cover not found" className={styles.cover} />
            <h1 className={styles.trackTitle}>{tracks[trackId]}</h1>
            <span className={styles.artistName}>{artists[trackId]}</span>
            <TimelineSlider
                currentTime={currentTime}
                duration={duration}
                onChange={handleSliderChange}
                sliderRef={sliderRef}
                timeRef={timeRef}
            />
            <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange} />
            <Controls
                playTrack={playTrack}
                nextTrack={nextTrack}
                prevTrack={prevTrack}
                trackPlaying={trackPlaying}
            />
            <button onClick={toggleLoop} className={`${styles.loopButton} ${!isLooping ? styles.loopButtonActive : styles.loopButtonDisabled}`}>
                <span className="material-symbols-outlined">
                    repeat
                </span>
            </button>
        </div>
    );
};

export default Player;

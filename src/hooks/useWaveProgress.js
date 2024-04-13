import { useRef, useCallback, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const useWaveProgress = (audioUrl) => {
  const containerRef = useRef(null);
  const [wavesurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const ws = WaveSurfer.create({
        container: containerRef.current,
        height: 30,
        width: 200,
        waveColor: 'grey',
        progressColor: 'white',
        url: audioUrl,
        cursorColor:"white",
        cursorWidth: 10,

      });

      setWaveSurfer(ws);

      ws.on('audioprocess', (time) => {
        setCurrentTime(time);
      });

      ws.on('ready', () => {
        setDuration(ws.getDuration());
      });


      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));

      ws.on('finish', () => {
        setIsPlaying(false);
        ws.seekTo(0); 
      });

      return () => {
        ws.destroy();
      };
    }
  }, [audioUrl]);

  // Play or pause the audio
  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  }, [wavesurfer]);

  return {
    containerRef,
    isPlaying,
    currentTime,
    onPlayPause,
    duration,
  };
};
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

function useAudioRecorder({handleClose, handleSendRecording}) {
    const [scrollingWaveform, setScrollingWaveform] = useState(false);
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const waveSurferRef = useRef(null);
    const recordPluginRef = useRef(null);
    const [progress, setProgress] = useState('')

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: '#mic',
            waveColor: 'white',
            progressColor: 'red',
            width: 100, 
            height: 30,
        });

        // Initialize the Record plugin
        const recordPlugin = RecordPlugin.create({ renderRecordedAudio: true });
        waveSurfer.registerPlugin(recordPlugin);
        waveSurferRef.current = waveSurfer;
        recordPluginRef.current = recordPlugin;

        // Event listener for record end
        recordPlugin.on('record-end', (blob) => {
            handleSendRecording(blob)
            const recordedUrl = URL.createObjectURL(blob);
            setRecordedAudio(recordedUrl);
            handleClose()
        });
        recordPlugin.on('record-pause', (blob) => {
            const recordedUrl = URL.createObjectURL(blob);
            setRecordedAudio(recordedUrl);
        });

        // Event listener for recording progress
        recordPlugin.on('record-progress', (time) => {
            setRecordingTime(time);
            updateProgress(time);
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [scrollingWaveform]);

    const updateProgress = (time) => {
        const formattedTime = [
            Math.floor((time % 3600000) / 60000), // minutes
            Math.floor((time % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? '0' + v : v))
            .join(':');

        setProgress(formattedTime);
    };

    const handlePause = () => {
        if (recording && !paused) {
            recordPluginRef.current.pauseRecording();
            setPaused(true);
        } else {
            recordPluginRef.current.resumeRecording();
            setPaused(false);
        }
    };

    const handleRecord = () => {
        if (recording || paused) {
            recordPluginRef.current.stopRecording();
            setRecording(false);
            setPaused(false);
        } else {
            recordPluginRef.current.startRecording().then(() => {
                setRecording(true);
            });
        }
    };

    const handleCheckboxChange = (checked) => {
        setScrollingWaveform(checked);
    };

    return {
        recording,
        paused,
        recordedAudio,
        recordingTime,
        waveSurferRef,
        progress,
        handlePause,
        handleRecord,
        handleCheckboxChange,
        scrollingWaveform,
    };
}

export default useAudioRecorder;




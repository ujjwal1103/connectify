// import { useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
// function AudioRecorder() {
//     const [scrollingWaveform, setScrollingWaveform] = useState(false);
//     const [recording, setRecording] = useState(false);
//     const [paused, setPaused] = useState(false);
//     const [recordedAudio, setRecordedAudio] = useState(null);
//     const [recordingTime, setRecordingTime] = useState(0);
//     const waveSurferRef = useRef(null);
//     const recordPluginRef = useRef(null);
//     const progressRef = useRef(null);
  
//     useEffect(() => {
//       // Create an instance of WaveSurfer
//       const waveSurfer = WaveSurfer.create({
//         container: '#mic',
//         waveColor: 'white',
//         progressColor: 'red',
//       });
  
//       // Initialize the Record plugin
//       const recordPlugin = RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false });
//       waveSurfer.registerPlugin(recordPlugin);
//       waveSurferRef.current = waveSurfer;
//       recordPluginRef.current = recordPlugin;
  
//       // Event listener for record end
//       recordPlugin.on('record-end', (blob) => {
//         const recordedUrl = URL.createObjectURL(blob);
//         setRecordedAudio(recordedUrl);
  
//         // Render the recorded audio in a new WaveSurfer instance
//         const recordedWaveSurfer = WaveSurfer.create({
//           container: '#recordings',
//           waveColor: 'rgb(200, 100, 0)',
//           progressColor: 'rgb(100, 50, 0)',
//           url: recordedUrl,
//         });
  
//         // Play button
//         const playButton = document.createElement('button');
//         playButton.textContent = 'Play';
//         playButton.onclick = () => recordedWaveSurfer.playPause();
//         recordedWaveSurfer.on('pause', () => (playButton.textContent = 'Play'));
//         recordedWaveSurfer.on('play', () => (playButton.textContent = 'Pause'));
//         document.querySelector('#recordings').appendChild(playButton);
  
//         // Download link
//         const downloadLink = document.createElement('a');
//         downloadLink.href = recordedUrl;
//         downloadLink.download = `recording.${blob.type.split(';')[0].split('/')[1] || 'webm'}`;
//         downloadLink.textContent = 'Download recording';
//         document.querySelector('#recordings').appendChild(downloadLink);
//       });
  
//       // Event listener for recording progress
//       recordPlugin.on('record-progress', (time) => {
//         setRecordingTime(time);
//         updateProgress(time);
//       });
  
//       return () => {
//         waveSurfer.destroy();
//       };
//     }, [scrollingWaveform]);
  
//     const updateProgress = (time) => {
//       const formattedTime = [
//         Math.floor((time % 3600000) / 60000), // minutes
//         Math.floor((time % 60000) / 1000), // seconds
//       ]
//         .map((v) => (v < 10 ? '0' + v : v))
//         .join(':');
//       progressRef.current.textContent = formattedTime;
//     };
  
//     const handlePause = () => {
//       if (recording && !paused) {
//         recordPluginRef.current.pauseRecording();
//         setPaused(true);
//       } else {
//         recordPluginRef.current.resumeRecording();
//         setPaused(false);
//       }
//     };
  
//     const handleRecord = () => {
//       if (recording || paused) {
//         recordPluginRef.current.stopRecording();
//         setRecording(false);
//         setPaused(false);
//       } else {
//         recordPluginRef.current.startRecording().then(() => {
//           setRecording(true);
//         });
//       }
//     };
  
//     const handleMicSelectChange = (event) => {
//       const deviceId = event.target.value;
//       recordPluginRef.current.setAudioInputDevice(deviceId);
//     };
  
//     const handleCheckboxChange = (event) => {
//       setScrollingWaveform(event.target.checked);
//     };
  
//     return (
//       <div>
//         <div id="mic"></div>
//         <div id="recordings"></div>
  
//         <div>
//           <button id="record" onClick={handleRecord}>
//             {recording || paused ? 'Stop' : 'Record'}
//           </button>
//           {recording && (
//             <button id="pause" onClick={handlePause}>
//               {paused ? 'Resume' : 'Pause'}
//             </button>
//           )}
//           <div id="progress" ref={progressRef}>
//             {`Recording time: ${recordingTime} ms`}
//           </div>
  
//           <div>
//             <label htmlFor="mic-select">Select Microphone:</label>
//             <select id="mic-select" onChange={handleMicSelectChange}></select>
//           </div>
  
//           <div>
//             <input
//               type="checkbox"
//               id="scrolling-waveform"
//               onChange={handleCheckboxChange}
//               checked={scrollingWaveform}
//             />
//             <label htmlFor="scrolling-waveform">Scrolling Waveform</label>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default AudioRecorder;
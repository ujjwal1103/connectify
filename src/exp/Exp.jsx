import { useCallback, useRef } from "react";

import { useWavesurfer } from "@wavesurfer/react";
import "./range.css";

const formatTime = (seconds) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const Exp = () => {
  return (
    <>
      <div className="w-screen flex-center h-dvh">
        <div className="">
          <input class="range" type="range" min="0" max="1000" />
        </div>
      </div>
    </>
  );
};

export default Exp;

export const WaveProgress = ({ audioUrl }) => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 30,
    width: 200,
    waveColor: "red",
    progressColor: "white",
    url: audioUrl,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef} />

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
};

import React, { useEffect } from "react";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import { IoTrash } from "react-icons/io5";
import { PiPauseCircle, PiPlay } from "react-icons/pi";
import { Send } from "../../icons";

const AudioRecorder = ({ handleClose, handleSendRecording })=> {
  const {
    recording,
    paused,
    waveSurferRef,
    progress,
    handlePause,
    handleRecord,
  } = useAudioRecorder({handleSendRecording, handleClose});

  useEffect(() => {
    handleRecord();
  }, []);

  const handleSend = () => {
    recording && handleRecord()
  };

  return (
    <div className="py-3 px-4 h-[60px] relative flex gap-3 items-center justify-end">
      <button onClick={handleClose}>
        <IoTrash size={24} />
      </button>

      <button onClick={handlePause}>
        {paused ? <PiPlay size={24} /> : <PiPauseCircle size={34} />}
      </button>

      <div id="mic" ref={waveSurferRef}></div>

      <div>
        <div id="progress">{progress}</div>
      </div>
      <button onClick={handleSend}>{<Send size={24} />}</button>
    </div>
  );
}

export default AudioRecorder;

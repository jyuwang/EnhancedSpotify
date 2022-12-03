import React, { useState } from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import "./VolumeControl.css";
import {
  RiVolumeMuteLine,
  RiVolumeDownLine,
  RiVolumeUpLine,
} from "react-icons/ri";
/**
 * this component is the volume slider on the right side of the footer
 * @returns the volume slider
 */
export default function VolumeControl() {
  const [{ token }] = useStateProvider();
  const [currentVolume, setCurrentVolume] = useState(50);
  const [lastVolume, setLastVolume] = useState(50);
  const setVolume = async (newVolume) => {
    setCurrentVolume(newVolume);
    if (newVolume) setLastVolume(newVolume);
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: newVolume,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  const handleMute = (volume) => {
    setVolume(volume);
    document.getElementById("volumeBar").value = volume;
  };

  return (
    <div className="volumeControl">
      {currentVolume ? (
        <>
          {currentVolume > 50 ? (
            <RiVolumeUpLine id="volumeIcon" onClick={() => handleMute(0)} />
          ) : (
            <RiVolumeDownLine id="volumeIcon" onClick={() => handleMute(0)} />
          )}
        </>
      ) : (
        <RiVolumeMuteLine
          id="volumeIcon"
          onClick={() => handleMute(lastVolume)}
        />
      )}
      <div>
        <input
          type="range"
          id="volumeBar"
          onMouseUp={(e) => setVolume(parseInt(e.target.value))}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}

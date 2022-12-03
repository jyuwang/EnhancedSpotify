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
  const setVolume = async (e) => {
    let newVolume = parseInt(e.target.value);
    setCurrentVolume(newVolume)
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
  return (
    <div className="volumeControl">
      {currentVolume ? <>
      {currentVolume > 50 ? <RiVolumeUpLine id="volumeIcon" /> : <RiVolumeDownLine id="volumeIcon"/>}
      </> : <RiVolumeMuteLine id="volumeIcon"/>}
      <div><input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} /></div>
    </div>
  );
}

import React from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import "./VolumeControl.css";

export default function VolumeControl() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    let newVolume = parseInt(e.target.value);
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
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </div>
  );
}

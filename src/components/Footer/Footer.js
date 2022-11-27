import React from "react";
import CurrentTrack from "../CurrentTrack/CurrentTrack";
import PlayerControls from "../PlayerControls/PlayerControls";
import VolumeControl from "../VolumeControl/VolumeControl";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <CurrentTrack />
      <PlayerControls />
      <VolumeControl />
    </div>
  );
}

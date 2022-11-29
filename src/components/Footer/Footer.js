import React from "react";
import CurrentTrack from "../CurrentTrack/CurrentTrack";
import PlayerControls from "../PlayerControls/PlayerControls";
import VolumeControl from "../VolumeControl/VolumeControl";
import "./Footer.css";

/**
 * along the bottom of the React App, contains a few components
 * @returns a footer
 */
export default function Footer() {
  return (
    <div className="footer">
      <CurrentTrack />
      <PlayerControls />
      <VolumeControl />
    </div>
  );
}

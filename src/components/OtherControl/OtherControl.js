import React from "react";
import VolumeControl from "../VolumeControl/VolumeControl";
import LyricsControl from "../LyricsControl/LyricsControl";
import "./OtherControl.css";

/**
 * along the bottom of the React App, contains a few components
 * @returns a footer
 */
export default function OtherControl() {
  return (
    <div className="otherControl">
      <LyricsControl />
      <VolumeControl />
    </div>
  );
}

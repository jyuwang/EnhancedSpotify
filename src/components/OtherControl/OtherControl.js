import React from "react";
import VolumeControl from "../VolumeControl/VolumeControl";
import LyricsControl from "../LyricsControl/LyricsControl";
import "./OtherControl.css";
import { useStateProvider } from "../../utils/StateProvider";

/**
 * along the bottom of the React App, contains a few components
 * @returns a footer
 */
export default function OtherControl() {
  const [{ currentlyPlaying }] = useStateProvider();
  return (
    <div className="otherControl">
      {currentlyPlaying ? <LyricsControl /> : <></>}
      <VolumeControl />
    </div>
  );
}

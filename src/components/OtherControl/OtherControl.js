import React from "react";
import VolumeControl from "../VolumeControl/VolumeControl";
import LyricsControl from "../LyricsControl/LyricsControl";
import "./OtherControl.css";
import { useStateProvider } from "../../utils/StateProvider";

/**
 * this component is a wrapper of lyrics model control and volume control
 * to better formatting them
 * @returns the wrapper
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

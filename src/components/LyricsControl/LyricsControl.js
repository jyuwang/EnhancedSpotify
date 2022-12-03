import React, { useState } from "react";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import "./LyricsControl.css";
import { TbMicrophone2 } from "react-icons/tb";
import { reducerCases } from "../../utils/Constants";

/**
 * this component is the volume slider on the right side of the footer
 * @returns the volume slider
 */
export default function LyricsControl() {
  const [{ lyricsState }, dispatch] = useStateProvider();
  const changeLyricsState = () => {
    dispatch({
      type: reducerCases.SET_LYRICS_STATE,
      lyricsState: !lyricsState,
    });
  };

  return (
    <div className="lyricsControl">
      <TbMicrophone2
        id="microphoneIcon"
        onClick={() => changeLyricsState()}
        style={{color: lyricsState ? "#1db954" : ""}}
      />
    </div>
  );
}

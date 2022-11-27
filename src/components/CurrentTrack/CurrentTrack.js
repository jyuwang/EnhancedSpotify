import React, { useEffect } from "react";
import "./CurrentTrack.css";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data != "") {
        const { item } = data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artists) => artists.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
      //   console.log(response);
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <div className="currentTrack">
      {currentlyPlaying && (
        <div className="track">
          <div className="trackImage">
            <img src={currentlyPlaying.image} alt="current track image" />
          </div>
          <div className="trackInfo">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </div>
  );
}

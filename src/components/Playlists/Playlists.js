import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";
import "./Playlists.css";

/**
 * this component is the 2nd group of things on the sidebar
 * all playlists added to the profile will appear here
 * clicking on any of these will change the current playlist and update the Body component
 * @returns a list of playlists that are added to the profile
 */
export default function Playlists() {
  const [{ token, playlists, selectedPlaylistId }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    dispatch({ type: reducerCases.SET_LYRICS_STATE, lyricsState: false });
  };
  return (
    <div className="playlists">
      <ul className="playlistList">
        {playlists.map(({ name, id }) => {
          return (
            <li
              className="singlePlaylist"
              key={id}
              onClick={(e) => {
                changeCurrentPlaylist(id);
              }}
              style={{ color: id === selectedPlaylistId ? "white" : "" }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

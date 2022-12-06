import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import "./Body.css";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../../utils/Constants";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  geniusApiKey: process.env.REACT_APP_GENIUS_API_KEY
});
const openai = new OpenAIApi(configuration);

export function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (hours == 0) {
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
}

export const playTrack = async (
  id,
  name,
  artists,
  image,
  context_uri,
  track_number,
  dispatch,
  token
) => {
  const response = await axios.put(
    `https://api.spotify.com/v1/me/player/play`,
    {
      context_uri,
      offset: {
        position: track_number - 1,
      },
      position_ms: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (response.status === 204) {
    const currentlyPlaying = {
      id,
      name,
      artists,
      image,
    };
    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  } else {
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  }
};

/**
 * the main body of the app
 * displays the selected playlist
 * @returns all songs in a selected playlist
 */
export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const selectedPlaylist = {
        id: data.id,
        name: data.name,
        description: data.description.startsWith("<a") ? "" : data.description,
        image: data.images[0].url,
        tracks: data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [dispatch, token, selectedPlaylistId]);

  useEffect(() => {
    if (selectedPlaylist) {
      const albumList = [
        ...new Set(selectedPlaylist.tracks.map((track) => track.album)),
      ];
      const fetchPosterData = async () => {
        const prompt = albumList.toString();
        const response = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: "256x256",
        });
        setPosterUrl(response.data.data[0].url);
      };
      fetchPosterData();
    }
  }, [selectedPlaylist]);

  return (
    <div class="body">
      {selectedPlaylist && (
        <div>
          <div className="playlist">
            <div className="playlistImage">
              <img
                src={posterUrl ? posterUrl : selectedPlaylist.image}
                alt="Selected Playlist Image"
              />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title"> {selectedPlaylist.name} </h1>
              <p className="description"> {selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="headerRow">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number,
                          dispatch,
                          token
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="trackImage">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists.join(", ")}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToTime(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

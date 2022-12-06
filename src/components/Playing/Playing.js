import React, { useState, useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Playing.css";
import { Configuration, OpenAIApi } from "openai";
import { getLyrics, getSong } from 'genius-lyrics-api';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * this page is the page showing the lyrics of the music current playing
 * @returns the playing page
 */
export default function Playing() {
  const [{ currentlyPlaying }] = useStateProvider();
  const [posterUrl, setPosterUrl] = useState("");
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    const fetchPosterData = async () => {
      const prompt = currentlyPlaying.name + "," + currentlyPlaying.artists;
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setPosterUrl(response.data.data[0].url);
    };
    //fetchPosterData();
    const options = {
      apiKey: process.env.REACT_APP_GENIUS_API_KEY,
      title: currentlyPlaying.name,
      artist: currentlyPlaying.artists[0],
      optimizeQuery: true
    }
    getLyrics(options).then((lr) => {
      console.log(lr);
      setLyrics(lr); //.replace(/\n/g, '\\n')
    });
    /*
    const options = {
      apiKey: 'XXXXXXXXXXXXXXXXXXXXXXX',
      title: 'Connect',
      artist: 'ClariS',
      optimizeQuery: true
    };

    getLyrics(options).then((lyrics) => console.log(lyrics));

    getSong(options).then((song) =>
      console.log(`
      ${song.id}
      ${song.title}
      ${song.url}
      ${song.albumArt}
      ${song.lyrics}`)
    );
    */
  }, [currentlyPlaying]);

  return (
    <div
      id="playingPage"
      style={{
        backgroundImage: posterUrl
          ? `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(${posterUrl})`
          : "",
        backgroundSize: "100% 100%",
      }}
    >
      <div id="playingLyrics">
        Lyrics for {currentlyPlaying.name} by {currentlyPlaying.artists[0]}:
        <br/>
        {lyrics}
      </div>
    </div>
  );
}

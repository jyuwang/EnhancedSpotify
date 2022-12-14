import React, { useRef, useState, useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Playing.css";
import { Configuration, OpenAIApi } from "openai";
import { getLyrics, getSong } from "genius-lyrics-api";
import Vis from "./Vis/Vis";

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
  const [lyricsArray, setLyricsArray] = useState([]);

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
    fetchPosterData();
    const options = {
      apiKey: process.env.REACT_APP_GENIUS_API_KEY,
      title: currentlyPlaying.name,
      artist: currentlyPlaying.artists[0],
      optimizeQuery: true,
    };
    getLyrics(options).then((lr) => {
      //const myArray = lr.split("\n");
      //console.log(myArray);
      setLyrics(lr); //.replace(/\n/g, '\\n')
      setLyricsArray(lr.split("\n"));
    });
  }, [currentlyPlaying]);
  const [, updateComponent] = React.useState();
  const forceUpdateComponent = React.useCallback(() => updateComponent({}), []);

  /**
   * window.setInterval(function() {
  var elem = document.getElementById('playingLyrics');
  elem.scrollTop = elem.scrollHeight;
}, 5000);
   */

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
        <br />
        {lyricsArray.map((lyricsLine) => {
          return <div>{lyricsLine}</div>;
        })}
      </div>

      <Vis />
    </div>
  );
}

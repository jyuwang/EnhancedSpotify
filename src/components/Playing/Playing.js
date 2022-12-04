import React, { useState, useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Playing.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Playing() {
  const [{ currentlyPlaying }] = useStateProvider();
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    const fetchPosterData = async () => {
      const prompt = currentlyPlaying.name + " " + currentlyPlaying.artists;
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      setPosterUrl(response.data.data[0].url);
    };
    fetchPosterData();
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
        this is lyrics
        <br />
        this is lyrics
        <br />
        this is lyrics
        <br /> this is lyrics
        <br /> this is lyrics
        <br />
      </div>
    </div>
  );
}

import React, { useRef,useState, useEffect } from "react";
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
  const visualizer = useRef(null);

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
    if (visualizer && visualizer.current) {
      console.log(visualizer.current);
      
    }
  }, [currentlyPlaying,visualizer]);

  function drawTimeData(timeData) {
    analyzer.getByteTimeDomainData(timeData);
    console.log(timeData);
    for (let i = 0; i < 128; i+=2) {
        let item = timeData[i];
        item = item > 150 ? item / 4 : item * 4;
        elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(-50%, ${clamp(item, 37, 600)}px)`;
    }
    requestAnimationFrame(() => drawTimeData(timeData));
  }

  const clamp = (num, min, max) => {
    if(num >= max) return max/4;
    if(num <= min) return min/4;
    return num/4;
  }

  async function getAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    analyzer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyzer);
    // How much data should we collect
    analyzer.fftSize = 2**8;
    bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    drawTimeData(dataArray);
  }

  let analyzer;
  let bufferLength;
  let finishappend = 0;
  let elements = [];

  for(let i = 0; i < 128; i++) {
    const element = document.createElement('span');
    element.classList.add('element');
    elements.push(element);
    if(visualizer.current){
      visualizer.current.appendChild(element);
      finishappend = 1;
    }
  }
  if(finishappend === 1){
    getAudio();
  }

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

      <div className="box">
        <div className="visualizer" ref={visualizer}></div>
      </div>
      <div className="play">
          <div className="btn btn-play"></div>
      </div>

    </div>
  );
}

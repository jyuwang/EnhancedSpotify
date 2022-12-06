import React, { useRef,useState, useEffect } from "react";
import { useStateProvider } from "../../../utils/StateProvider";
import "./Vis.css";

export default function Vis() {
    const [{ currentlyPlaying }] = useStateProvider();
    const visualizer = useRef(null);
    useEffect(() => {
      if (visualizer && visualizer.current) {
        console.log(visualizer.current);
      }
    }, [visualizer]);
  
    function drawTimeData(timeData) {
      analyzer.getByteTimeDomainData(timeData);
      console.log(timeData);
      for (let i = 0; i < 128; i++) {
          let item = timeData[i];
          item = item > 150 ? item / 4 : item * 4;
          elements[i].style.transform = `rotateZ(${i * (360 / 128)}deg) translate(-50%, ${clamp(item, 38, 600)/5}px)`;
      }
      requestAnimationFrame(() => drawTimeData(timeData));
    }
  
    const clamp = (num, min, max) => {
      if(num >= max) return max;
      if(num <= min) return min;
      return num;
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
        <div className = "wave">
            <div className="box">
                <div className="visualizer" ref={visualizer}></div>
            </div>
            <img src={currentlyPlaying.image} alt="current track image" className="cover" />
        </div>
    );
  }
  
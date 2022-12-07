// import React, { useRef,useState, useEffect } from "react";


// const visualizer = useRef(null);
// useEffect(() => {
//     if (visualizer && visualizer.current) {
//       console.log(visualizer.current);
//     }
//   }, [currentlyPlaying,visualizer]);

//   let analyzer;
//  let bufferLength;

//  function drawTimeData(timeData) {
//   analyzer.getFloatTimeDomainData(timeData);
//   console.log(timeData);
//   for (let i = 0; i < bufferLength; i++) {
//       let item = timeData[i];
//       item = item > 150 ? item / 1.5 : item * 1.5;
//       elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(-50%, ${item}px)`;
//   }
//   requestAnimationFrame(() => drawTimeData(timeData));
// }
// let finishappend = 0;
// let elements = [];
// const clamp = (num, min, max) => {
//     if(num >= max) return max;
//     if(num <= min) return min;
//     return num;
//   }
// for(let i = 0; i < bufferLength; i++) {
//   const element = document.createElement('span');
//   element.classList.add('element');
//   elements.push(element);
//   if(visualizer.current){
//     visualizer.current.appendChild(element);
//     finishappend = 1;
//   }
// }
// if(finishappend === 1){
//   getAudio();
//   console.log("1")
// }

//   async function getAudio() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const audioCtx = new AudioContext();
//     analyzer = audioCtx.createAnalyser();
//     const source = audioCtx.createMediaStreamSource(stream);
//     source.connect(analyzer);

//     // How much data should we collect
//     analyzer.fftSize = 64;
//     bufferLength = analyzer.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
//     drawTimeData(dataArray);
//   }


//   <div className="box">
//         <div className="visualizer" ref={visualizer}></div>
//       </div>
//       <div className="play">
//           <div className="btn btn-play"></div>
//       </div>
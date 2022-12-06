// import React, { useRef,useState, useEffect } from "react";
// import { useStateProvider } from "../../../utils/StateProvider";
// import "./Vis.css";

// export default function Vis() {
//     const [{ currentlyPlaying }] = useStateProvider();
//     var audio = new Audio("Myself.mp3")
//     // let addr = "./"+currentlyPlaying.name+".mp3";
//     const visualizer = useRef(null);

//     window.AudioContext = window.AudioContext || window.webkitAudioContext;
//     const ctx = new window.AudioContext();
//     const analyser = ctx.createAnalyser();

//     const source = ctx.createMediaElementSource(audio);


//     console.log(source);
//     source.connect(analyser);
//     source.connect(ctx.destination);
//     analyser.fftSize = 64;
//     const bufferLength = analyser.frequencyBinCount;
//     let dataArray = new Uint8Array(bufferLength);

//     useEffect(() => {
//       if (visualizer && visualizer.current) {
//         console.log(visualizer.current);
//         let elements = [];

//         let finishappend = 0;
//         for(let i = 0; i < bufferLength; i++) {
//             const element = document.createElement('span');
//             element.classList.add('element');
//             elements.push(element);
//             if(visualizer.current){
//                 visualizer.current.appendChild(element);
//             }
//         }
//         const update = () => {
//             requestAnimationFrame(update);
//             analyser.getByteTimeDomainData(dataArray);
//             for (let i = 0; i < bufferLength; i++) {
//                 let item = dataArray[i];
//                 item = item > 150 ? item / 1.5 : item * 1.5;
//                 elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(-50%, ${clamp(item, 100, 150)}px)`;
//             }
//         };
//         if(visualizer.current === 1){
//             update();
//         }

//       }
//     }, [visualizer]);

//     // console.log(bufferLength);
//     // let elements = [];

//     // let finishappend = 0;
//     // for(let i = 0; i < bufferLength; i++) {
//     //     const element = document.createElement('span');
//     //     element.classList.add('element');
//     //     elements.push(element);
//     //     if(visualizer.current){
//     //         visualizer.current.appendChild(element);
//     //         finishappend = 1;
//     //     }
//     // }

//     const clamp = (num, min, max) => {
//         if(num >= max) return max;
//         if(num <= min) return min;
//         return num;
//     }
    

//     return (
//         <div className = "wave">
//             {/* <audio src="Myself.mp3" className="au" ref={au}></audio> */}
//             <div className="box">
//                 <div className="visualizer" ref={visualizer}></div>
//             </div>
//             <img src={currentlyPlaying.image} alt="current track image" className="cover" />
//             <div class="play">
//                 <div class="btn btn-play"></div>
//             </div>
//         </div>
//     );
//   }
  
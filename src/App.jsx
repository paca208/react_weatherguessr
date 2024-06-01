import React, { useState, useEffect } from 'react';
import './index.css';
import GetTemp from './functions/GetTemp';
import GetWebcamID from './functions/GetWebcamID.js';
import GetWebcamFeed from './functions/GetWebcamFeed.js';
import Game from './components/Game.jsx';


const lat = 36.03;
const lon = -114.53;
const rad = 250;
//tohle bych měl fetchovat z grcko BE x)

const results = 1;
const apiKey = 'zhghS00P2rYGG49RED2hVwENqxQl2y7I'

function App() {

const [tempData, setTempData] = useState(null);
const [webcamID, setWebcamID] = useState(null);
const [webcamFeed, setWebcamFeed] = useState(null);
const [webcamTime, setWebcamTime] = useState()

useEffect(() => {
  const fetchWebcamID = async () => {
    const webcamdata = await GetWebcamID(results, lat, lon, rad, apiKey);
    if (webcamdata.webcams.length > 0) {
      setWebcamID(webcamdata.webcams[0].webcamId);
    }
  }
fetchWebcamID()
},[])

useEffect(() => {
  if (!webcamID) return;

  const fetchWebcamFeed = async () => {
    const response = await GetWebcamFeed(webcamID, apiKey)
    setWebcamFeed(response.player.day);
    setWebcamTime(response.lastUpdatedOn)
  }
fetchWebcamFeed()
},[webcamID])

// GetTemp(setTempData)
// const response = JSON.stringify(tempData)

// useEffect(() => {
//   console.log(`response from GetTemp: ${response}`)
// },[]);

  return (
    <>
    <div className='w-screen h-screen min-h-screen bg-slate-100 flex flex-col justify-start items-center font-Reddit-mono'>
      <div id="tutorial-msg" className='flex flex-col items-center'>
        <span className='h-fit text-4xl font-semibold text-black mt-4 flex'>Welcome to Tempguessr</span>
      </div>
      <Game webcamFeed={webcamFeed} />
    </div>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import './index.css';
import GetTemp from './functions/GetTemp';
import GetWebcamID from './functions/GetWebcamID.js';
import GetWebcamFeed from './functions/GetWebcamFeed.js';


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
    <div className='w-screen h-screen bg-slate-100 flex flex-col justify-start items-center'>
      <div id="tutorial-msg" className='flex flex-col items-center'>
        <span className='h-fit text-4xl font-semibold text-black mt-4 flex'>Welcome to Tempguessr</span>
        <span className='text-black flex mt-4'>--tutorial msg--</span>
      </div>
      <form action="" method="post" className='flex gap-4 mt-4'>
        <input type="number" className='w-20' />
        <button type="submit" className='bg-white rounded-md p-2 border'>Submit</button>
      </form>
      <div className='flex my-12 w-1/2 h-1/2'>
        {webcamFeed ? <iframe src={webcamFeed} className='w-full h-full'></iframe> : 'loading...'}
      </div>
    </div>
    </>
  )
}

export default App

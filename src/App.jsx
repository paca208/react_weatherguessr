import React, { useState, useEffect } from 'react';
import './index.css';
import GetTemp from './functions/GetTemp';
import GetWebcamFeed from './functions/GetWebcamFeed.js';
import Game from './components/Game.jsx';


const apiKey = 'zhghS00P2rYGG49RED2hVwENqxQl2y7I'

function App() {

const [answerData, setAnswerData] = useState(null);
const [webcamID, setWebcamID] = useState(null);
const [webcamFeed, setWebcamFeed] = useState(null);
const [webcamTime, setWebcamTime] = useState()


useEffect(() => {
  //Fetchuji webcamID z BE 
  const fetchWebcamFeed = async () => {
    try{
      const response = await fetch('http://localhost:3000/GetWebcamID') // GRNCEK ENDPOINT
      if (!response.ok) {
        throw new Error('Failed to fetch temperature data');
      }
      const data = await response.json();
      console.log("FE výsledky z volání GetWebcamID data: ",data)
      console.log("FE výsledek data.webcamId je: ", data.webcamId)
      setWebcamID(data.webcamId)
      setAnswerData(data.temperature)
      console.log("webcamId: ", webcamID)
    } catch (error) {
      console.error(error);
      return null;
    }
  }
fetchWebcamFeed()
},[])

useEffect(() => {
  const getFeed = async () => {
const webcamFeed = await GetWebcamFeed(webcamID, apiKey)
setWebcamFeed(webcamFeed.player.day);
setWebcamTime(webcamFeed.lastUpdatedOn)
  }
  getFeed()
},[webcamID,answerData])
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
      <Game webcamFeed={webcamFeed} correctAnswer={answerData} />
    </div>
    </>
  )
}

export default App

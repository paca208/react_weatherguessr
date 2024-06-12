import React, { useState, useEffect } from 'react';
import '../index.css';
import { FaRegUserCircle } from "react-icons/fa";
import GetWebcamFeed from '../functions/GetWebcamFeed.js';
import Game from '../components/Game.jsx';
import { Link } from 'react-router-dom';


const apiKey = 'zhghS00P2rYGG49RED2hVwENqxQl2y7I'

function Index({username}) {

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
      setWebcamID(data.webcamId)
      setAnswerData(data.temperature)
    } catch (error) {
      console.error(error);
      return null;
    }
  }
fetchWebcamFeed()
},[])

// Tohle házelo všechny naše chyby, protože to fetchovalo milionkrát s prázdnýma variablama, tak to teď má podmínku :-)
useEffect(() => {
  if (webcamID && apiKey){
    const getFeed = async () => {
    const webcamFeed = await GetWebcamFeed(webcamID, apiKey)
    setWebcamFeed(webcamFeed.player.day);
    setWebcamTime(webcamFeed.lastUpdatedOn)
    }
    getFeed()
  }
},[webcamID,answerData])


useEffect(() =>{
  if (answerData && webcamID){
    console.log("FE výsledky z volání GetWebcamID data: ", answerData)
    console.log("FE výsledek data.webcamId je: ", webcamID)
    console.log("webcamId: ", webcamID)
  }
},[answerData, webcamID])


// GetTemp(setTempData)
// const response = JSON.stringify(tempData)

// useEffect(() => {
//   console.log(`response from GetTemp: ${response}`)
// },[]);

  return (
    <>
    <div className='w-full h-full min-h-screen bg-slate-100 flex flex-col justify-start items-center font-Reddit-mono'>
      <div id="tutorial-msg" className='grid grid-cols-3 w-full justify-items-center items-center'>
        <span></span>
        <span className='text-4xl font-semibold text-black mt-4 text-center'>Welcome to Tempguessr</span>
        <span className='flex ml-auto gap-2 mr-4 cursor-pointer transition-all hover:scale-105'>{username ? (<><FaRegUserCircle className='w-6 h-6' /> {username}</>) : <Link className='flex gap-2' to={'signup'}><FaRegUserCircle className='w-6 h-6' /> Sign up</Link>}</span>
      </div>
      <Game webcamFeed={webcamFeed} sentAnswer={answerData} username={username}/>
    </div>
    </>
  )
}

export default Index

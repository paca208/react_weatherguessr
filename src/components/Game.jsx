import React, { useState, useEffect } from 'react';
import { FaTemperatureFull } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { PiInfinityLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import '../index.css';
import euSvg from '../assets/europe.svg';
import worldSvg from '../assets/world.svg'
import Button from './Button';


function Game( {webcamFeed, sentAnswer, username, modeData} ) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameState, setGameState] = useState('playing');
    const [guess, setGuess] = useState('')
    const [scale, setScale] = useState('°C');
    const [feedback, setFeedback] = useState([]);
    const [healthbar, setHealthbar] = useState(8);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [playingLoc, setPlayingLoc] = useState('europe');
    const [mode, setMode] = useState('infinite')
    
    useEffect(() =>{
        const rounded = Math.round(sentAnswer)
        setCorrectAnswer(rounded);
    },[sentAnswer])

    const play = () => {
        setIsPlaying(!isPlaying)
    }
    const handleGuessChange = (e) =>{
        setGuess(e.target.value)
    }
    const handleScaleChange = (e) =>{
        setScale(e.target.value)
    }
    const handleRegionSelect = (value) =>{
        setPlayingLoc(value)
    }
    const handleModeSelect = (value) =>{
        setMode(value);
        modeData(value);
    }
    const handleSettings = () =>{
        setSettingsOpen(!settingsOpen)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let guessCalc = Math.round(guess);
        const guessDisplay = guess;
        const usedScale = scale;
        console.log(guessCalc)

        if (usedScale == '°F'){
            guessCalc = (guessCalc - 32)*(5/9);
            guessCalc = Math.round(guessCalc);
        };
        if (guessCalc < correctAnswer){
            setFeedback(prevFeedback => [...prevFeedback, `${guessDisplay}${usedScale}? Too cold bro 🧊`]);
            setHealthbar(healthbar-1)
        };
        if (guessCalc > correctAnswer){
            setFeedback(prevFeedback => [...prevFeedback, `${guessDisplay}${usedScale}? That's just way too hot, sorry 🥵`]);
            setHealthbar(healthbar-1)
        };
        if (guessCalc == correctAnswer){
            setGameState('victory');
        };
    };

    useEffect(() =>{
        if (healthbar === 0){
            setGameState('loss')
        }
    },[healthbar])


  return (
    <>
    {gameState === 'playing' && (
    <>
        {isPlaying ? (
            <>
                <div className='flex my-12 w-1/2 h-1/2'>
                    {webcamFeed ? (
                    <div className='flex flex-col w-full'>
                        <iframe src={webcamFeed} className='w-full h-full'></iframe>
                        <span className='text-xs w-full text-right'>Webcams provided by <a href="https://www.windy.com/" target="_blank">windy.com</a> &mdash; <a href="https://www.windy.com/webcams/add" target="_blank">add a webcam.</a></span>
                    </div>
                    ) : 'loading...'}
                </div>
                <div className='my-4 flex flex-col items-center'>
                    {
                        feedback.map((msg, index)=>{
                        return <span key={index}>{msg}</span>
                        })
                    }
                </div>
                <div className='flex gap-4'>
                    <span className='flex items-center'>
                        <FaTemperatureFull className='w-10 h-10'/>
                    </span>
                    <form action="" method="post" className='flex gap-4' onSubmit={handleSubmit}>
                        <input name='guessednum' onChange={handleGuessChange} value={guess} type="number" className='w-20 p-2 rounded-lg'/>
                        <select name="scale" onChange={handleScaleChange} value={scale} id="" className='rounded-lg'>
                            <option value="°C">°C</option>
                            <option value="°F">°F</option>
                        </select>
                        <Button isSubmit={true} text={'Enter guess'} />
                    </form>
                </div> 
                <span className='flex text-xl mt-4'>Attempts remaining: {healthbar}</span>
            </>
            ) : (
                <>
                    <span className='text-black flex mt-4 max-w-lg text-center text-lg'>This is a game in which you will be tasked to guess the temperature based on the provided webcam feed from the area. You will see a 24hour (or longer) feed but your goal is to only guess the FINAL temperature.</span>
                    <button onClick={play} className='font-bold text-3xl mt-4 cursor-pointer transition-all duration-150 hover:text-red-600'>PLAY</button>
                    <span className='flex items-center gap-2 mt-24 text-3xl font-bold cursor-pointer transition-all hover:scale-105' onClick={handleSettings}>Settings <IoSettingsOutline /> </span>
                    {settingsOpen && 
                    <>
                    <span className='my-6 text-xl font-bold'>Region</span>
                    <div className='flex gap-6'>
                        <button onClick={() => handleRegionSelect('europe')} className={`flex items-center flex-col gap-4 border-2 p-6 rounded-lg transition-all hover:border-blue-200 ${playingLoc === 'europe' ? 'border-blue-200' : 'border-gray-200'}`}>
                            <div className='w-44 h-44 rounded-xl'>
                                <img src={euSvg} alt="europe" />
                            </div>
                            <span>Europe</span>
                        </button>
                        <button className={`flex items-center justify-center flex-col gap-4 border-2 p-6 rounded-lg transition-all cursor-not-allowed`}>
                            <div className='w-44 h-44 rounded-xl'>
                                <img src={worldSvg} alt="Global" className='w-full h-full object-cover'/>
                            </div>
                            <span className='flex'>Global</span>
                        </button>
                    </div>
                    <span className='my-6 text-xl font-bold'>Mode</span>
                    <div className='flex gap-6'>
                        <button onClick={() => handleModeSelect('infinite')} className={`flex items-center flex-col gap-4 border-2 p-6 rounded-lg transition-all hover:border-blue-200 ${mode === 'infinite' ? 'border-blue-200' : 'border-gray-200'}`}>
                            <div className='flex items-center justify-center w-44 h-44 rounded-xl'>
                                <PiInfinityLight className='w-32 h-32 text-zinc-400' />
                            </div>
                            <span className='flex'>Infinite</span>
                        </button>
                        <button onClick={() => handleModeSelect('daily')} className={`flex items-center justify-center flex-col gap-4 border-2 p-6 rounded-lg transition-all cursor-pointer hover:border-blue-200 ${mode === 'daily' ? 'border-blue-200' : 'border-gray-200'}`}>
                            <div className='flex items-center justify-center w-44 h-44 rounded-xl'>
                                <FaCalendarCheck className='w-32 h-32 text-zinc-400' />
                            </div>
                            <span>Daily Challenge</span>
                        </button>
                    </div>
                    </>
                    }
                </>
        )}
    </>
    )}
    {gameState === 'victory' && (
        <div className='text-4xl my-auto pb-24 text-center'>{guess}{scale} is exactly right {username}, you win!<br /> Come back tomorrow for another challenge.</div>
    )}
    {gameState === 'loss' && (
       <div className='text-4xl my-auto pb-24 text-center'>You lost... The correct answer was {correctAnswer}{scale} <br /> Come back tomorrow for another challenge.</div>
    )}
    </>
  )
}

export default Game

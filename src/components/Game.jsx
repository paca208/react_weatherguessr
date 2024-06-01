import React, { useState, useEffect } from 'react';
import { FaTemperatureFull } from "react-icons/fa6";
import '../index.css';


function Game( {webcamFeed} ) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameState, setGameState] = useState('playing');
    const [guess, setGuess] = useState('');
    const [scale, setScale] = useState('°C');
    const [feedback, setFeedback] = useState([]);
    const [healthbar, setHealthbar] = useState(8)

    const correctAnswer = 32
    // Math.round(correctAnswer)

    const play = () => {
        setIsPlaying(!isPlaying)
    }
    const handleGuessChange = (e) =>{
        setGuess(e.target.value)
    }
    const handleScaleChange = (e) =>{
        setScale(e.target.value)
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
                    {webcamFeed ? <iframe src={webcamFeed} className='w-full h-full'></iframe> : 'loading...'}
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
                        <button type="submit" className='bg-white rounded-md p-2 border transition-all duration-200 hover:bg-slate-200 ml-8'>Enter guess</button>
                    </form>
                </div> 
                <span className='flex text-xl mt-4'>Attempts remaining: {healthbar}</span>
            </>
            ) : (
                <>
                    <span className='text-black flex mt-4 max-w-lg text-center text-lg'>This is a game in which you will be tasked to guess the temperature based on the provided webcam feed from the area. You will see a 24hour (or longer) feed but your goal is to only guess the FINAL temperature.</span>
                    <button onClick={play} className='font-bold text-3xl mt-4 cursor-pointer transition-all duration-150 hover:text-red-600'>PLAY</button>
                </>
        )}
    </>
    )}
    {gameState === 'victory' && (
        <div className='text-4xl my-auto pb-24 text-center'>{guess}{scale} is exactly right, you win!<br /> Come back tomorrow for another challenge.</div>
    )}
    {gameState === 'loss' && (
       <div className='text-4xl my-auto pb-24 text-center'>You lost... The correct answer was {correctAnswer}{scale} <br /> Come back tomorrow for another challenge.</div>
    //    Tady by měla být scale a odpověď od grncka ofc
    )}
    </>
  )
}

export default Game

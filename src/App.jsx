import React, { useState, useEffect } from 'react';
import './index.css';



function App() {

const [tempData, setTempData] = useState(null)

async function getTemp(){
  try{
    const response = await fetch('http://localhost:3000/getaddress') // GRNCEK ENDPOINT
    if (!response.ok) {
      throw new Error('Failed to fetch temperature data');
    }
    const data = await response.json();
    setTempData(data)
  } catch (error) {
    console.error(error);
    return null;
  }
}
getTemp()

  return (
    <>
    <div className='w-screen h-screen bg-violet-900 flex flex-col justify-start items-center'>
      <div id="tutorial-msg" className='flex flex-col items-center'>
        <span className='h-fit text-4xl font-semibold text-white mt-4 flex'>Welcome to Tempguessr</span>
        <span className='text-white flex mt-4'>--tutorial msg--</span>
      </div>
      <form action="" method="post" className='flex gap-4 mt-4'>
        <input type="number" className='w-20' />
        <button type="submit" className='bg-white rounded-md p-2 border'>Submit</button>
        <div>{JSON.stringify(tempData)} tf</div>
      </form>
    </div>
    </>
  )
}

export default App

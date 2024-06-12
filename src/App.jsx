import React, { useState, useEffect } from 'react';
import './index.css';
import Index from './views/Index.jsx';
import SignUp from './views/SignUp.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


function App() {
const [username, setUsername] = useState(null)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index username={username}/>
  },
  {
    path: '/signup',
    element: <SignUp setUsername={setUsername} />
  }
]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

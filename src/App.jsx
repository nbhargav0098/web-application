import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div data-theme="dark" className="min-h-screen bg-base-300">
      <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </div> 
  )
}

export default App;

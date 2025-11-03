import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { Provider } from 'react-redux';
import { store } from './Utils/store';
import Feed from './Components/Feed';
import Connections from './Components/Connections';
import Requests from './Components/Requests';


function App() {

  return (
    <div data-theme="dark" className="min-h-screen bg-base-300">
      <>
        <Provider store={store}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections/>}/>
                <Route path="/requests" element={<Requests />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </>
    </div> 
  )
}

export default App;

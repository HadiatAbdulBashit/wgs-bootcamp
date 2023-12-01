import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteColor from './component/FavoriteColor';
import GetVideo from './component/GetVideo';

import Navbar from './navbar/Index';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <div className='ui container'>
      <GetVideo />
      <FavoriteColor />
    </div>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path='/' exact element={<Home />}/>
    //     <Route path='/about' exact element={<About />}/>
    //     <Route path='/contact' exact element={<Contact />}/>
    //   </Routes>
    // </Router>
  )
}

export default App;

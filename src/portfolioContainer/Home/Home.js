
import React from "react";
import Header from './Header/Header'

import Profile from './Profile/Profile.js'
import Footer from './footer/Footer.js'
import "./Home.css"


function Home() {
  return (
    <div className='home-container'>
       <Header></Header>
        <Profile></Profile>
        <Footer></Footer>
    </div>
  )
}

export default Home
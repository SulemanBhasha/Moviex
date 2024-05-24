import React from 'react'
import './style.scss'
import HeroBanner from "./heroBanner/HeroBanner"
import Treding from './treding/Treding'
import Popular from './popular/Popular'
import TopRated from './topRated/Toprated'
TopRated
function Home() {
  return (
    <div  className='homePage'>
      <HeroBanner></HeroBanner>
      <Treding></Treding>
      <Popular></Popular>
      <TopRated></TopRated>
      <div style={{height:200}}></div>

    </div>
  )
}

export default Home

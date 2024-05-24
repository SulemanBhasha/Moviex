import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import SearchResult from '../../searchResult/SearchResult'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'



import useFetch from '../../../hooks/UseFetch'

function HeroBanner() {
  
  const [background,setBackground]=useState("")
  const[query ,setQuery] = useState("")
  const navigate = useNavigate()

  const {url }=useSelector((state)=>state.home)

  
  const {data, loading}= useFetch("/movie/upcoming")

  useEffect(()=>{
    
    const bg=url.backdrop + data?.results?.[Math.floor(Math.random()*10)].backdrop_path
    setBackground(bg)
    
  },[data])
  
 

  const searchQueryHandler=(e)=>{
    if((e.key=="Enter" && query.length>0) )
    {
      
      navigate(`/search/${query}`)
    }
    }

    const searchHandle=()=>{
      navigate(`/search/${query}`)

      

    }
  return (
    <div>
     <div className="heroBanner">
      {!loading &&  <div className="backdrop-img">
        <Img src={background}  ></Img>
      </div>}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        
      
        <div className="heroBannerContent">
          <span className="title">Welcome!!</span>
          <span className="subTitle">
            Millions of Movies and TV shows to discover. Explore now
          </span>

          <div className="searchInput">
            <input type="text"
              onChange={(e)=>(setQuery(e.target.value))}
              onKeyUp={searchQueryHandler}
              placeholder='search for TV shows or movie'
            
            />
            <button onClick={searchHandle}  > Search</button>
            
            
          </div>

        </div>
      
      </ContentWrapper>
     </div>
    </div>
  )
}

export default HeroBanner

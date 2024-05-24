import { useState ,useEffect} from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector,useDispatch } from 'react-redux'
import { Route,BrowserRouter, Routes } from 'react-router-dom'

import {getApiConfigaration,getGenres} from './store/homeSlice'

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import Details from "./pages/details/Details"
import PageNotFound from './pages/404/PageNotFound'
import  Explore from "./pages/explore/Explore"
import SearchResult from "./pages/searchResult/SearchResult"
function App() {

  const {url}= useSelector((state)=>(
    state.home))
 
    const dispatch = useDispatch()
 
  useEffect(()=>{
    fetchApiConfig()
    genresCall()
  },[])

  const fetchApiConfig =()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
     
      
      const url={
        backdrop : res.images.secure_base_url+"original",
        poster : res.images.secure_base_url+"original",
        profile : res.images.secure_base_url+"original"


      }
      

      dispatch(getApiConfigaration(url))
      
    })
  }
  const genresCall=async ()=>{
    let promises=[]
    let endPoints=["movie","tv"]
    let allGenres={}

    endPoints.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data?.map(({genres})=>{
      return genres?.map((item)=>allGenres[item.id]=item)
    })
    
    dispatch(getGenres(allGenres))
  }


  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/:mediaType/:id' element={<Details></Details>}></Route>
        <Route path='/search/:query' element={<SearchResult></SearchResult>}></Route>
        <Route path='/explore/:mediaType' element={<Explore></Explore>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App

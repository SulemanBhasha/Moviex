import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose, VscLaw } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0,0)
    },[location])


  const controlNavbar=()=>{
   
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY && !mobileMenu){
        setShow("hide")
      }
      else{
        setShow("show")
      }
      setLastScrollY(window.scrollY)

    }
    else{
      setShow("top")
    } 
    setLastScrollY(window.scrollY)
    
  }

  useEffect((e)=>{
    window.addEventListener("scroll",controlNavbar)
    return ()=>{
    window.removeEventListener("scroll",controlNavbar)

    }
  },[lastScrollY])
  const openSerach=()=>{
    setMobileMenu(!true)
   setShowSearch(!false)
  }
  const openMobileMenu=()=>{
   setMobileMenu(true)
   setShowSearch(false)
  }


  const searchQueryHandler=(e)=>{
    if(e.key=="Enter" && query.length>0)
    {
      
      navigate(`/search/${query}`)
    }
    setTimeout(() => {
      setShowSearch(false)
    }, 5000);
    }

    const navigateHandler=(type)=>{

      if(type==='movie' ){
        navigate("/explore/movie")
        setMobileMenu(!true)
      }
      else{
        navigate("/explore/tv")
        setMobileMenu(!true)
      }
    }

  return (
    <header className={`header ${mobileMenu?"mobileView":"btn"} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo}
          onClick={()=>( navigate("/"))}
          alt="N/A"></img>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>(navigateHandler("movie"))}>Movies</li>
          <li className="menuItem"  onClick={()=>(navigateHandler("tv"))}>TV shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSerach}></HiOutlineSearch>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSerach}></HiOutlineSearch>
          {mobileMenu ?<VscChromeClose  onClick={()=>(setMobileMenu(false))}></VscChromeClose>:<SlMenu onClick={openMobileMenu} ></SlMenu>}
          
         
        </div>
      </ContentWrapper>
     {showSearch &&  <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
            <input type="text"
              onChange={(e)=>(setQuery(e.target.value))}
              onKeyUp={searchQueryHandler}
              placeholder='search for TV shows or movie'
            
            />
            <VscChromeClose  onClick={()=>(setShowSearch(false))}></VscChromeClose>
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
}

export default Header;

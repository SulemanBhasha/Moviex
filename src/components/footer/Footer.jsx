import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaGit,
    FaGithub,
    FaLinkedinIn,
    FaCodepen,
    FaJava

} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
               

Your React JS app leverages the TMDB database to present trending, popular, recommended, and similar movies, ensuring users enjoy a holistic movie exploration journey. Its user-friendly search function enables effortless discovery of desired movies, enriching their cinematic experience with diverse content. Fueled by React components, the app delivers a smooth interface, empowering users to seamlessly explore and interact with movie data, establishing itself as a preferred destination for movie lovers.
                </div>
                <div className="socialIcons">
                    <span className="icon">

                        <NavLink target="blank" to={"https://github.com/SulemanBhasha"}>

                        <FaJava />
                        </NavLink>
                    </span>
                    <span className="icon">
                        <NavLink target="blank" to={"https://github.com/SulemanBhasha"}>
                        <FaGithub />

                        </NavLink>

                    </span>
                   
                    <span className="icon">
                        <NavLink target="blank" to={"https://leetcode.com/u/Sulemanbhasha/"}>
                        <FaCodepen />

                        </NavLink>
                    </span>
                    <span className="icon">
                        <NavLink target="blank" to={"https://www.linkedin.com/in/sulemanbhasha-dodmani-224bbb284/"}>

                        <FaLinkedin />
                        </NavLink>
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};


export default Footer;
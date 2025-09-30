import '../styles/components/TextImage.scss'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const TextImage = () => {
  return (
    <div className="text-image">
      <h3>
        <span>Just</span>
        <span>Street</span>
        <span>Culture</span>
      </h3>
      <img src="./public/img/push.jpg" alt="Picture push skate"/>
      <p className="intro-text">The culture around skateboarding is built on freedom and creativity. One day you’re riding an empty parking lot, the next you’re bombing a hill with friends. Every session creates stories, energy, and memories that stick. The kind you talk about for years, the kind that make the streets feel alive.</p>
    </div>
  )
}

export default TextImage;

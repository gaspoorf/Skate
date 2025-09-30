import '../styles/components/Intro.scss'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {

  useEffect(() => {
  
    const text = document.querySelector('.intro-text') as HTMLElement;
    
    if (!text) return;

    gsap.to(text, {
      ease: 'none',
      scrollTrigger: {
        trigger: "#intro-container",
        pin: text,
        start: 'top+=70px center',
        end: 'bottom-=20% center',
        scrub: true,
      },
    });
    
    const splitText = new SplitType(text, { types: "words,chars" });


    gsap.set( splitText.chars,{ autoAlpha: 0.3 });
    gsap.to( splitText.chars,{ 
      autoAlpha: 1, duration: 0.8, ease: "power1.inOut", stagger: 0.05,
      scrollTrigger: {
        trigger: "#intro-container",
        start: 'top+=70px center',
        end: 'bottom-=20% center',
        scrub: true,
      },
    });


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div className="intro" id="intro-container">
      <p className="intro-text">Skateboarding starts with a simple push, but it quickly turns into a way of seeing the streets differently. Every curb, rail, or wall becomes a new possibility.</p>
    </div>
  )
}

export default Intro

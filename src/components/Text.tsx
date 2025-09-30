import '../styles/components/Text.scss'
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Text = () => {
  return (
    <div className="text">
      <p className="first-text">It's never just about tricks. skateboarding is about falling down, getting back up, and finding your own style and flow on concrete. every fall teaches you something, every retry shapes the way you ride and the way you see the streets.</p>
      <p className="second-text">Skateboarding has always been more than a sport, it’s a street movement. From the early days of riding empty pools to today’s DIY spots and urban contests, the scene keeps evolving. The sound of wheels on asphalt, the crowd cheering at a city jam, the rush of dropping into a fast hill, it all creates a raw atmosphere that can’t be replaced. Every generation adds its own style, its own energy, and the city streets become the stage where it all happens.</p>
    </div>
  )
}

export default Text;

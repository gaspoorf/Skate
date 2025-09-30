import '../styles/components/Image.scss'
import { useEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Image = () => {

  useEffect(() => {
    const image = document.querySelector('.img-content');
    gsap.set(image, { scale: 0.3 });

    gsap.to(image, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".image",
        pin: ".img-container", 
        pinSpacing: true,
        start: "center center",
        end: "+=200%",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  


  return (
    <div className="image">
      <div className="img-container">
        <img src="/img/jam.webp" className="img-content" alt="Picture jam skate"/>
      </div>
    </div>
  )
}

export default Image;

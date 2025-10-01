import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Intro from './components/Intro'
import TextImage from './components/TextImage'
import Image from './components/Image'
import Text from './components/Text'
import CanvasWrapperAnimation from './components/CanvasWrapperAnimation'
import CanvasWrapperDivision from './components/CanvasWrapperDivision'

import { HandGestureProvider } from './components/HandGestureProvider'




function App() {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      syncTouch: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-root">
      <Loader />
      <Cursor />
      <Hero />
      <Intro />

      <CanvasWrapperDivision />
    
      <TextImage />
      <Image />
      <Text />

      <HandGestureProvider>
        <CanvasWrapperAnimation />
      </HandGestureProvider>

    </div>
  )
}

export default App
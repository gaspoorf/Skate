import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import SkateDivision from './SkateDivision'
import '../styles/components/CanvasWrapper.scss'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



function CameraController() {
  const { camera } = useThree()
 
  const cameraRef = useRef({ 
    rotation: 0, 
    rotationY: 0,
    radius: 4,
    height: 45 
  })

  useEffect(() => {

    gsap.to(cameraRef.current, {
      rotation: -150 * (Math.PI / 180),
      rotationY: 80 * (Math.PI / 180),
      ease: 'none',
      scrollTrigger: {
        trigger: "#canvas-container",
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        pinSpacing: false,
        markers: true,

        onUpdate: () => {

          const angle = cameraRef.current.rotation + Math.atan2(7, 45)
          const angleY = cameraRef.current.rotationY + Math.atan2(-60, 45)

          const x = Math.cos(angle) * cameraRef.current.radius
          const z = Math.sin(angle) * cameraRef.current.radius
          const y = (-Math.sin(angleY)) * cameraRef.current.radius


          camera.position.set(x, y, z)
        
          camera.lookAt(0, 0, 0)
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [camera])

  return null
}

export default function CanvasWrapperDivision() {
  useEffect(() => {
    const canvas = document.querySelector('.canvas-division')
    
    gsap.to(canvas, {
      ease: 'none',
      scrollTrigger: {
        trigger: "#canvas-container",
        pin: canvas,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])




  return (
    <div className='canvas-container' id='canvas-container'>
      
      <Canvas 
        className='canvas-division'

        camera={{ position: [
            Math.cos(Math.atan2(7, 45)) * 4,
            Math.cos(Math.atan2(-60, 45)) * 4,
            Math.sin(Math.atan2(7, 45)) * 4 
        ], fov: 45 }}

        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false
        }}
        frameloop="always"
      >

        <CameraController />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow={false}/>
        
        <Suspense fallback={false}>
          <SkateDivision />
        </Suspense>
        
      </Canvas>
    </div>
  )
}
import React, { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SkateModel from './SkateModel'
import '../styles/components/CanvasWrapper.scss'
import { div } from '@tensorflow/tfjs'

// import { Perf } from 'r3f-perf'

import { useHandGesture } from './HandGestureProvider'

function HandStatus() {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [showTrick, setShowTrick] = useState(false)
  const [rotation, setRotation] = useState(0)
  const { trick } = useHandGesture()
  
  useEffect(() => {
    if (trick) {
      setShowTrick(false)
      
      const randomTop = Math.random() * 80 + 10
      const randomLeft = Math.random() * 80 + 10
      
      setPosition({
        top: `${randomTop}%`,
        left: `${randomLeft}%`
      })
      
      const deltaX = 50 - randomLeft
      const deltaY = 50 - randomTop
      const fullAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
      const angle = fullAngle * 0.2
      setRotation(angle)
      
      setTimeout(() => {
        setShowTrick(true)
      }, 500)
    } else {
      setShowTrick(false)
    }
  }, [trick])

  return (
    <div className='trick-info'>
      <h4 
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          margin: 0,
          opacity: showTrick ? 1 : 0,
          scale: showTrick ? 1 : 0.5,
          transition: 'opacity 0.3s ease, scale 0.15s ease'
        }}
      >
        {trick ?? ''}
      </h4>
    </div>
  )
}


export default function CanvasWrapperAnimation() {
  return (
    <div>
      <div className='canvas-container' id='animation-block'>
        <div className='canvas-title'>
          <h3>
            PlayGround
          </h3>
        </div>
        

        <div className='canvas-btn'>
          <a className='btn' id='top'>◄</a>
          <div className='btn-row'>
            <a className='btn' id='left'>◄</a>
            <a className='btn' id='bottom'>◄</a>
            <a className='btn' id='right'>►</a>
          </div>
        </div>

        <HandStatus />


        <Canvas 
          camera={{ position: [10, 3, 0], fov: 45 }}
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
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false}/>
        
          <Suspense fallback={false}>
            <SkateModel />
          </Suspense>
          
          <OrbitControls
            target={[0, -2, 0]}
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
          
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.1}
            makeDefault
            onStart={() => {}}
          />

        </Canvas>
      </div>
    </div>
  )
}
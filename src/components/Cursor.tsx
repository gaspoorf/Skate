import { useState, useEffect } from 'react'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: '10px',
      height: '10px',
      backgroundColor: 'red',
      pointerEvents: 'none',
      zIndex: 9000,
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.3s ease-out, top 0.3s ease-out'
    }} />
  )
}
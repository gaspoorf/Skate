import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import '../styles/components/Loader.scss'

export default function Loader() {
    const { active, progress } = useProgress()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (!active && progress === 100) {
        setTimeout(() => {
            setIsVisible(false)
        }, 500)
        }
    }, [active, progress])

    if (!isVisible) return null

    return (
        <div className='loader' style={{ opacity: !active && progress === 100 ? 0 : 1, pointerEvents: !active && progress === 100 ? 'none' : 'auto'}}>
            <div className='loading'></div>
        </div>
    )
}
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useHandGesture } from './HandGestureProvider'
import type { Group } from 'three'
export default function SkateModel() {
    const group = useRef<Group>(null)
    const { scene, animations } = useGLTF('/models/skate-animation.glb') as any
    const { actions } = useAnimations(animations, group)
    const { trick } = useHandGesture()

    useEffect(() => {
        if (!actions) return
       
        Object.values(actions).forEach((action: any) => {
            if (action) {
                action.stop()
                action.reset()
            }
        })

        if (!trick) return

        if (trick === 'Ollie' && actions.Ollie) {
            actions.Ollie.reset().setLoop(2200, 1).play()
        } else if (trick === 'Flip' && actions.Flip) {
            actions.Flip.reset().setLoop(2200, 1).play()
        } else if (trick === 'ShuvIt' && actions.ShuvIt) {
            actions.ShuvIt.reset().setLoop(2200, 1).play()
        }
    }, [trick, actions])
   
    return <primitive ref={group} object={scene} scale={0.013} position={[0, -3, 0]} />
}
useGLTF.preload('/models/skate-animation.glb')
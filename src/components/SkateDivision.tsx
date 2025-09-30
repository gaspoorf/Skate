import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import type { Group } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SkateDivision() {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF('/models/skate-division.glb') as any;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (!actions || !actions.Animation) return;

        const action = actions.Animation;
        action.play();
        action.paused = true;
        action.timeScale = -1;
        const duration = action.getClip().duration;
        action.time = duration;

        const tween = gsap.to(action, {
            time: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#canvas-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
        
        return () => {
            tween.kill();
        };
    }, [actions]);

    return <primitive ref={group} object={scene} scale={0.01} position={[0, 0, 0]} />;
}

useGLTF.preload('/models/skate-division.glb');

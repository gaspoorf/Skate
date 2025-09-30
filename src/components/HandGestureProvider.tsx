import { createContext, useContext, useEffect, useState, useRef } from 'react'
import type { ReactNode } from 'react'

// import * as tf from '@tensorflow/tfjs'
// import * as handpose from '@tensorflow-models/handpose'

type Trick = 'Ollie' | 'Flip' | 'ShuvIt' | null

type HandGestureContextType = {
  handOpen: boolean
  trick: Trick
}

const HandGestureContext = createContext<HandGestureContextType>({ handOpen: false, trick: null })

export const useHandGesture = () => useContext(HandGestureContext)

export const HandGestureProvider = ({ children }: { children: ReactNode }) => {
    const [handOpen, setHandOpen] = useState(false)
    const [trick, setTrick] = useState<Trick>(null)
    // const modelRef = useRef<any>(null)
    // const prevWristRef = useRef({ x: 0, y: 0, z: 0 })
    const trickLockRef = useRef(false)

    useEffect(() => {
        const btnTop = document.querySelector('#top')
        const btnLeft = document.querySelector('#left')
        const btnBottom = document.querySelector('#bottom')
        // const btnRight = document.querySelector('#right')

        btnTop?.addEventListener('click', () => {
          
            if (!trickLockRef.current) {
                setTrick('Ollie')
                trickLockRef.current = true
                setTimeout(() => {
                    trickLockRef.current = false
                    setTrick(null)
                }, 1000)
            }
        })

        btnLeft?.addEventListener('click', () => {
          
            if (!trickLockRef.current) {
                setTrick('Flip')
                trickLockRef.current = true
                setTimeout(() => {
                    trickLockRef.current = false
                    setTrick(null)
                }, 1000)
            }
        })

        btnBottom?.addEventListener('click', () => {
          
            if (!trickLockRef.current) {
                setTrick('ShuvIt')
                trickLockRef.current = true
                setTimeout(() => {
                    trickLockRef.current = false
                    setTrick(null)
                }, 1000)
            }
        })

    }, [])


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault()
                    if (!trickLockRef.current) {
                        setTrick('Ollie')
                        trickLockRef.current = true
                       
                        const btnTop = document.querySelector<HTMLElement>('#top');
                        
                        if (btnTop) {
                            btnTop.classList.add('active');
                            setTimeout(() => {
                                btnTop.classList.remove('active');
                            }, 300);
                        }
                       
                        setTimeout(() => {
                            trickLockRef.current = false
                            setTrick(null)
                        }, 1000)
                    }
                    break
                case 'ArrowLeft':
                    event.preventDefault()
                    if (!trickLockRef.current) {
                        setTrick('Flip')
                        trickLockRef.current = true

                        const btnLeft = document.querySelector<HTMLElement>('#left');
                        
                        if (btnLeft) {
                            btnLeft.classList.add('active');
                            setTimeout(() => {
                                btnLeft.classList.remove('active');
                            }, 300);
                        }


                        setTimeout(() => {
                            trickLockRef.current = false
                            setTrick(null)
                        }, 1000)
                    }
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    if (!trickLockRef.current) {
                        setTrick('ShuvIt')
                        trickLockRef.current = true

                        const btnBottom = document.querySelector<HTMLElement>('#bottom');
                        
                        if (btnBottom) {
                            btnBottom.classList.add('active');
                            setTimeout(() => {
                                btnBottom.classList.remove('active');
                            }, 300);
                        }

                        
                        setTimeout(() => {
                            trickLockRef.current = false
                            setTrick(null)
                        }, 1000)
                    }
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])



    return (
        <HandGestureContext.Provider value={{ handOpen, trick }}>
            {children}
        </HandGestureContext.Provider>
    )
}


    // ------  Hand detection / désactivé ------

    // useEffect(() => {
    //     let animationId: number
    //     let stream: MediaStream | null = null

    //     const initializeHandPose = async () => {
    //         try {
    
    //             await tf.ready()
    //             console.log('TensorFlow.js initialisé')


    //             const model = await handpose.load()
    //             modelRef.current = model
    //             console.log('Modèle HandPose chargé')


    //             const video = document.createElement('video')
    //             video.width = 320
    //             video.height = 240
    //             video.style.position = 'absolute'
    //             video.style.transform = 'scaleX(-1)'
    //             video.style.top = '10px'
    //             video.style.right = '10px'
    //             video.style.border = '2px solid white'
    //             video.autoplay = true
    //             video.muted = true
    //             document.body.appendChild(video)

   
    //             stream = await navigator.mediaDevices.getUserMedia({ 
    //                 video: { width: 640, height: 480 } 
    //             })
    //             video.srcObject = stream


    //             await new Promise((resolve) => {
    //                 video.onloadedmetadata = resolve
    //             })


    //             const detectHands = async () => {
    //                 if (video.readyState === 4 && modelRef.current) {
    //                     try {

    //                         const predictions = await modelRef.current.estimateHands(video)
                            
    //                         if (predictions.length === 0) {
    //                             setHandOpen(false)
    //                             console.log('🚫 Aucune main détectée')
    //                             if (!trickLockRef.current) setTrick(null)
    //                         } else {
    //                             const hand = predictions[0]
    //                             const landmarks = hand.landmarks


    //                             const fingerTips = [8, 12, 16, 20]
    //                             const fingerBases = [6, 10, 14, 18] 
                                
    //                             let openCount = 0
    //                             for (let i = 0; i < fingerTips.length; i++) {
    //                                 const tip = landmarks[fingerTips[i]]
    //                                 const base = landmarks[fingerBases[i]]
                                
    //                                 if (tip[1] < base[1]) openCount++
    //                             }
                                
    //                             const isHandOpen = openCount >= 3
    //                             setHandOpen(isHandOpen)
                                
    //                             console.log(`✋ Main ${isHandOpen ? 'OUVERTE' : 'FERMÉE'} (${openCount}/4 doigts levés)`)

    //                             if (isHandOpen) {
    //                                 const wrist = landmarks[0]
    //                                 const currentWrist = { 
    //                                     x: wrist[0] / video.width, 
    //                                     y: wrist[1] / video.height, 
    //                                     z: wrist[2] || 0 
    //                                 }

    //                                 const deltaX = currentWrist.x - prevWristRef.current.x
    //                                 const deltaY = currentWrist.y - prevWristRef.current.y
    //                                 const deltaZ = currentWrist.z - prevWristRef.current.z

    //                                 prevWristRef.current = currentWrist


    //                                 const thresholdHigh = 0.08 
    //                                 const thresholdMedium = 0.06  
    //                                 const thresholdLow = 0.05    
                                    
    //                                 let detectedTrick: Trick = null


    //                                 if (deltaY < -thresholdHigh) {
    //                                     detectedTrick = 'Ollie'
    //                                     console.log(` Trick détecté: Ollie (mouvement vers le haut - force: ${Math.abs(deltaY).toFixed(3)})`)
    //                                 } else if (deltaX > thresholdMedium) {
    //                                     detectedTrick = 'Flip'
    //                                     console.log(` Trick détecté: Flip (mouvement vers la droite - force: ${deltaX.toFixed(3)})`)
    //                                 } else if (deltaY > thresholdLow) {
    //                                     detectedTrick = 'ShuvIt'
    //                                     console.log(` Trick détecté: ShuvIt (mouvement vers le bas - force: ${deltaY.toFixed(3)})`)
    //                                 } else {

    //                                     if (Math.abs(deltaX) > 0.01 || Math.abs(deltaY) > 0.01) {
    //                                         console.log(` Mouvement détecté mais insuffisant - X: ${deltaX.toFixed(3)}, Y: ${deltaY.toFixed(3)}`)
    //                                     }
    //                                 }

    //                                 if (detectedTrick && !trickLockRef.current) {
    //                                     setTrick(detectedTrick)
    //                                     trickLockRef.current = true
    //                                     setTimeout(() => {
    //                                         trickLockRef.current = false
    //                                         setTrick(null)
    //                                     }, 500)
    //                                 }
    //                             } else {
                                   
                                  
    //                                 console.log('Main fermée - Pas de détection de trick')
    //                                 if (!trickLockRef.current) {
    //                                     setTrick(null)
    //                                 }
    //                             }
    //                         }
    //                     } catch (error) {
    //                         console.error('Erreur lors de la détection:', error)
    //                     }
    //                 }

                    
                    
    //                 animationId = requestAnimationFrame(detectHands)
    //             }


    //             detectHands()


    //             return () => {
    //                 if (animationId) {
    //                     cancelAnimationFrame(animationId)
    //                 }
    //                 if (stream) {
    //                     stream.getTracks().forEach(track => track.stop())
    //                 }
    //                 if (video.parentNode) {
    //                     video.remove()
    //                 }
    //             }

    //         } catch (error) {
    //             console.error('Erreur lors de l\'initialisation:', error)
    //         }
    //     }


    //     const cleanup = initializeHandPose()

    //     return () => {
    //         cleanup.then(cleanupFn => {
    //             if (cleanupFn) cleanupFn()
    //         })
    //     }
    // }, [])

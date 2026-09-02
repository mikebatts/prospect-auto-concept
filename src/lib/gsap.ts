import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register once, in one place. Every motion component imports from here.
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Mobile browser chrome (address bar) resizes the viewport while scrolling;
// refreshing every trigger on those resizes causes visible jumps in scrubbed
// scenes. Real orientation changes still refresh.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, useGSAP }

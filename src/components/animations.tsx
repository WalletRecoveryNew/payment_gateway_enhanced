'use client'

import { useEffect, useRef } from 'react'
import '../app/design-system.css'

// Animation utilities for interactive elements
export function useAnimations() {
  // Reference to animation elements
  const floatingElements = useRef([])
  const pulsingElements = useRef([])
  const typingElements = useRef([])
  
  useEffect(() => {
    // Initialize floating animations
    const initFloatingAnimation = () => {
      document.querySelectorAll('.animate-float').forEach((el, index) => {
        floatingElements.current.push(el)
        
        // Add random delay to create natural movement
        const delay = Math.random() * 2
        el.style.animationDelay = `${delay}s`
      })
    }
    
    // Initialize pulsing animations
    const initPulsingAnimation = () => {
      document.querySelectorAll('.animate-pulse-glow').forEach((el, index) => {
        pulsingElements.current.push(el)
        
        // Add random delay to create natural effect
        const delay = Math.random() * 3
        el.style.animationDelay = `${delay}s`
      })
    }
    
    // Initialize typing animations
    const initTypingAnimation = () => {
      document.querySelectorAll('.animate-typing').forEach((el) => {
        typingElements.current.push(el)
        
        const text = el.getAttribute('data-text')
        if (text) {
          el.textContent = ''
          let i = 0
          const speed = parseInt(el.getAttribute('data-speed') || '100')
          
          function typeWriter() {
            if (i < text.length) {
              el.textContent += text.charAt(i)
              i++
              setTimeout(typeWriter, speed)
            }
          }
          
          // Start typing with a small delay
          setTimeout(typeWriter, 500)
        }
      })
    }
    
    // Initialize all animations
    initFloatingAnimation()
    initPulsingAnimation()
    initTypingAnimation()
    
    // Cleanup function
    return () => {
      floatingElements.current = []
      pulsingElements.current = []
      typingElements.current = []
    }
  }, [])
  
  return null
}

// Hover effect component
export function HoverEffect({ children, className = '', effectType = 'glow' }) {
  const effectClasses = {
    glow: 'hover:shadow-lg hover:shadow-crypto-cyan/10 transition-all duration-300',
    scale: 'transition-transform duration-300 hover:scale-105',
    slide: 'transition-transform duration-300 hover:translate-x-2',
    bounce: 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
  }
  
  const effectClass = effectClasses[effectType] || effectClasses.glow
  
  return (
    <div className={`${effectClass} ${className}`}>
      {children}
    </div>
  )
}

// Parallax scroll effect
export function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      
      // Only apply parallax when section is in view
      if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
        const yPos = (scrollY - sectionTop) * speed
        section.style.backgroundPositionY = `${yPos}px`
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])
  
  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// Animated counter
export function AnimatedCounter({ value, duration = 2000, className = '' }) {
  const counterRef = useRef(null)
  
  useEffect(() => {
    const counter = counterRef.current
    if (!counter) return
    
    let startValue = 0
    const endValue = parseInt(value)
    const increment = endValue / (duration / 16)
    
    const updateCounter = () => {
      if (startValue < endValue) {
        startValue += increment
        counter.textContent = Math.floor(startValue).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = endValue.toLocaleString()
      }
    }
    
    // Start the animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    
    observer.observe(counter)
    
    return () => {
      observer.disconnect()
    }
  }, [value, duration])
  
  return <span ref={counterRef} className={className}>0</span>
}

// Animated gradient background
export function AnimatedGradient({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-crypto-blue-dark via-crypto-blue to-crypto-blue-dark bg-[length:200%_100%] animate-gradient"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Typing animation
export function TypingText({ text, speed = 100, className = '' }) {
  return (
    <span className={`animate-typing ${className}`} data-text={text} data-speed={speed}></span>
  )
}

// Scroll reveal animation
export function ScrollReveal({ children, className = '', direction = 'up' }) {
  const revealRef = useRef(null)
  
  useEffect(() => {
    const reveal = revealRef.current
    if (!reveal) return
    
    const directionClass = {
      up: 'translate-y-10',
      down: '-translate-y-10',
      left: 'translate-x-10',
      right: '-translate-x-10',
    }[direction] || 'translate-y-10'
    
    // Add initial styles
    reveal.classList.add('opacity-0', directionClass, 'transition-all', 'duration-700')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove transform and show element
          reveal.classList.remove('opacity-0', directionClass)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(reveal)
    
    return () => {
      observer.disconnect()
    }
  }, [direction])
  
  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  )
}

// Export all animation components
export function Animations() {
  useAnimations()
  return null
}

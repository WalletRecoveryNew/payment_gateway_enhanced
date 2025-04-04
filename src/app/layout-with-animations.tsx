'use client'

import { useEffect } from 'react'
import { Animations, ScrollReveal, AnimatedCounter, HoverEffect } from '@/components/animations'
import '../design-system.css'
import '../animations.css'
import '../mobile-optimizations.css'

export default function RootLayout({ children }) {
  // Apply animations and interactive elements globally
  useEffect(() => {
    // Initialize scroll reveal animations
    const scrollElements = document.querySelectorAll('.scroll-reveal')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    scrollElements.forEach(el => {
      observer.observe(el)
    })
    
    // Initialize ripple effect for buttons
    const buttons = document.querySelectorAll('button, .action-button, .cta-button, .secondary-button')
    
    buttons.forEach(button => {
      button.classList.add('ripple')
    })
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.glass-card')
    
    cards.forEach(card => {
      card.classList.add('card-hover')
    })
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  return (
    <>
      <Animations />
      {children}
    </>
  )
}

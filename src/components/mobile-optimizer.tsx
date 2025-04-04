'use client'

import { useEffect } from 'react'
import '../app/design-system.css'
import '../app/mobile-optimizations.css'

export function MobileOptimizer() {
  useEffect(() => {
    // Function to add mobile-specific classes based on screen size
    const handleResize = () => {
      const isMobile = window.innerWidth < 640
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
      
      // Add mobile classes to specific elements
      document.querySelectorAll('.responsive-container').forEach(el => {
        if (isMobile) {
          el.classList.add('mobile-container')
        } else {
          el.classList.remove('mobile-container')
        }
      })
      
      // Handle flex containers that should stack on mobile
      document.querySelectorAll('.responsive-flex').forEach(el => {
        if (isMobile) {
          el.classList.add('mobile-stack')
        } else {
          el.classList.remove('mobile-stack')
        }
      })
      
      // Handle elements that should be centered on mobile
      document.querySelectorAll('.responsive-align').forEach(el => {
        if (isMobile) {
          el.classList.add('mobile-center')
        } else {
          el.classList.remove('mobile-center')
        }
      })
      
      // Handle elements that should be hidden on mobile
      document.querySelectorAll('.responsive-visibility').forEach(el => {
        if (isMobile) {
          el.classList.add('mobile-hidden')
        } else {
          el.classList.remove('mobile-hidden')
        }
      })
      
      // Handle elements that should be full width on mobile
      document.querySelectorAll('.responsive-width').forEach(el => {
        if (isMobile) {
          el.classList.add('mobile-full-width')
        } else {
          el.classList.remove('mobile-full-width')
        }
      })
      
      // Add data attribute for CSS targeting
      document.documentElement.setAttribute('data-device', 
        isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      )
    }
    
    // Initial call
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return null
}

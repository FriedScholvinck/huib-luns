import React, { useEffect, useRef, ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  return (
    <div ref={elementRef} className="animate-on-scroll">
      {children}
    </div>
  )
}

export default AnimateOnScroll
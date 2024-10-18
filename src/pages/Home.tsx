import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Timeline from '../components/Timeline'

const Home: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-gradient-to-br from-french_gray-800 to-white-500">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-jet-500 to-battleship_gray-600 text-transparent bg-clip-text drop-shadow-lg">
            Huib Luns
          </h1>
          <p className="text-xl mb-12 bg-gradient-to-r from-jet-700 to-battleship_gray-700 text-transparent bg-clip-text">Discover the early 1900s art of the Dutch painter.</p>
          <div className="space-x-4">
            <Link 
              to="/gallery" 
              className="inline-block bg-gradient-to-r from-jet-500 to-battleship_gray-500 text-white px-8 py-3 rounded-full hover:from-jet-600 hover:to-battleship_gray-600 transition-colors transform hover:scale-105 shadow-md"
            >
              Explore Gallery
            </Link>
            <button
              onClick={scrollToTimeline}
              className="inline-block bg-gradient-to-r from-silver-500 to-french_gray-500 text-jet-800 px-8 py-3 rounded-full hover:from-silver-600 hover:to-french_gray-600 transition-colors transform hover:scale-105 shadow-md"
            >
              About Huib Luns
            </button>
          </div>
        </div>
      </div>
      <div ref={timelineRef}>
        <Timeline />
      </div>
    </div>
  )
}

export default Home

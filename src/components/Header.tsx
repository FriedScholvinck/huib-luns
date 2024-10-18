import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Palette } from 'lucide-react'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-gradient-to-r from-jet-300 to-battleship_gray-300 bg-opacity-90 shadow-md' : 'py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Palette className="h-8 w-8 text-jet-700" />
          <span className="text-xl font-bold bg-gradient-to-r from-jet-700 to-battleship_gray-700 text-transparent bg-clip-text">Huib Luns</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {['Home', 'Gallery', 'Blog'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-jet-600 to-battleship_gray-600 text-white hover:from-jet-700 hover:to-battleship_gray-700'
                      : 'bg-gradient-to-r from-white-500 to-french_gray-500 text-jet-800 hover:from-white-600 hover:to-french_gray-600'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import { Instagram, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-jet-800 to-battleship_gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white-500 to-french_gray-500 text-transparent bg-clip-text">Huib Luns</h3>
            <p className="text-sm text-french_gray-300">Exploring the world through art</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-french_gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="mailto:huib@luns.nl" className="text-french_gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-french_gray-400">
          &copy; {new Date().getFullYear()} Huib Luns. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

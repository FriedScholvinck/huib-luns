import React, { useState, useEffect, useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Artwork } from '../db'
import AnimateOnScroll from '../components/AnimateOnScroll'

type SortOption = 'popularity' | 'year'

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const artworks = useLiveQuery(() => db.artworks.toArray())

  useEffect(() => {
    const initializeArtworks = async () => {
      const count = await db.artworks.count()
      if (count === 0) {
        const sampleArtworks: Artwork[] = [
          { 
            title: 'Self Portrait', 
            year: 1920, 
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zelfportret%2C_door_Huib_Luns.jpg/266px-Zelfportret%2C_door_Huib_Luns.jpg', 
            description: 'A self-portrait by Huib Luns, showcasing his skill in portraiture.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Portrait Study', 
            year: 1915, 
            imageUrl: 'https://www.bossche-encyclopedie.nl/personen/luns,%20huib.org.jpg', 
            description: 'A detailed portrait study, demonstrating Luns\' mastery of facial expressions.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Portrait of My Father', 
            year: 1904, 
            imageUrl: 'https://www.cultureelerfgoed.nl/binaries/large/content/gallery/cultureelerfgoed/content-afbeeldingen/collecties/kunstwerk-vd-maand/huib_luns_portret_van_mijnen_vader_1904_ab6294.jpg', 
            description: 'A touching portrait of Huib Luns\' father, painted in 1904.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Landscape with Trees', 
            year: 1910, 
            imageUrl: 'https://www.simonis-buunk.nl/images/art/large/22390.jpg', 
            description: 'A serene landscape painting showcasing Luns\' skill with natural scenes.',
            views: Math.floor(Math.random() * 1000),
            type: 'Landscape'
          },
          { 
            title: 'Portrait of J.F. de Vogel', 
            year: 1925, 
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Portret_van_J.F._de_Vogel_door_H._Luns.jpg/147px-Portret_van_J.F._de_Vogel_door_H._Luns.jpg', 
            description: 'A formal portrait of J.F. de Vogel, demonstrating Luns\' commissioned work.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Still Life with Flowers', 
            year: 1918, 
            imageUrl: 'https://www.simonis-buunk.nl/images/art/large/2969.jpg', 
            description: 'A vibrant still life painting featuring a bouquet of flowers.',
            views: Math.floor(Math.random() * 1000),
            type: 'Still Life'
          },
          { 
            title: 'Two Seated Women', 
            year: 1916, 
            imageUrl: 'https://az333959.vo.msecnd.net/images-6/twee-zittende-vrouwen-huib-luns-1916-97583715.jpg', 
            description: 'A painting of two seated women, showcasing Luns\' skill with multiple figures.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Reading Lady', 
            year: 1922, 
            imageUrl: 'https://marksmit.nl/wp-content/uploads/2019/08/Lezende-dame-.jpg', 
            description: 'A serene portrait of a lady engrossed in reading.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Portrait Study in Blue', 
            year: 1930, 
            imageUrl: 'https://www.metzemaekers.com/media/artwork/49398.jpg', 
            description: 'A striking portrait study with a predominant blue palette.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
          { 
            title: 'Portrait of Ir. G. Diehl', 
            year: 1935, 
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Portret_van_Ir._G._Diehl_door_H._Luns.jpg/169px-Portret_van_Ir._G._Diehl_door_H._Luns.jpg', 
            description: 'A formal portrait of Ir. G. Diehl, showcasing Luns\' later work.',
            views: Math.floor(Math.random() * 1000),
            type: 'Portrait'
          },
        ]
        await db.artworks.bulkAdd(sampleArtworks)
      }
    }

    initializeArtworks()
  }, [])

  const sortedArtworks = useMemo(() => {
    return [...(artworks || [])].sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.views - a.views
      } else {
        return a.year - b.year
      }
    })
  }, [artworks, sortBy])

  const filteredArtworks = sortedArtworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <AnimateOnScroll>
        <h1 className="text-4xl font-bold mb-8 text-primary"> </h1>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search artworks..."
            className="w-full md:w-1/2 p-3 mb-4 md:mb-0 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSortBy('popularity')}
              className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                sortBy === 'popularity'
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sort by Popularity
            </button>
            <button
              onClick={() => setSortBy('year')}
              className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                sortBy === 'year'
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sort by Year
            </button>
          </div>
        </div>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredArtworks.map((artwork) => (
          <AnimateOnScroll key={artwork.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-primary mb-2">{artwork.title}</h2>
                <p className="text-secondary mb-2">{artwork.year}</p>
                <p className="text-gray-600 mb-2">{artwork.description}</p>
                <p className="text-sm text-gray-500">Views: {artwork.views}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  )
}

export default Gallery

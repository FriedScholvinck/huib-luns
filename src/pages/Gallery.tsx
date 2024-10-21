import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Artwork } from '../db'
import AnimateOnScroll from '../components/AnimateOnScroll'
import ExpandedArtwork from '../components/ExpandedArtwork'
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from '../utils/debounce'

type SortOption = 'popularity' | 'year'

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [expandedArtwork, setExpandedArtwork] = useState<Artwork | null>(null)
  const artworks = useLiveQuery(() => db.artworks.toArray())

  useEffect(() => {
    initializeArtworks()
  }, [])

  const sortedAndFilteredArtworks = useMemo(() => {
    if (!artworks) return []
    return artworks
      .filter(artwork => artworkMatchesSearch(artwork, searchTerm))
      .sort((a, b) => sortArtworks(a, b, sortBy))
  }, [artworks, searchTerm, sortBy])

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  )

  if (!artworks) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="h-4"></div>
      <SearchAndSortControls
        onSearch={debouncedSetSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ArtworkGrid
        artworks={sortedAndFilteredArtworks}
        onArtworkClick={setExpandedArtwork}
      />
      <ExpandedArtworkModal
        artwork={expandedArtwork}
        onClose={() => setExpandedArtwork(null)}
      />
    </div>
  )
}

const SearchAndSortControls: React.FC<{
  onSearch: (value: string) => void
  sortBy: SortOption
  onSortChange: (option: SortOption) => void
}> = ({ onSearch, sortBy, onSortChange }) => (
  <AnimateOnScroll>
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <input
        type="text"
        placeholder="Search artworks..."
        className="w-full md:w-1/2 p-3 mb-4 md:mb-0 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="flex items-center space-x-4">
        <SortButton
          label="Sort by Popularity"
          isActive={sortBy === 'popularity'}
          onClick={() => onSortChange('popularity')}
        />
        <SortButton
          label="Sort by Year"
          isActive={sortBy === 'year'}
          onClick={() => onSortChange('year')}
        />
      </div>
    </div>
  </AnimateOnScroll>
)

const SortButton: React.FC<{
  label: string
  isActive: boolean
  onClick: () => void
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
      isActive
        ? 'bg-accent text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
)

const ArtworkGrid: React.FC<{
  artworks: Artwork[]
  onArtworkClick: (artwork: Artwork) => void
}> = ({ artworks, onArtworkClick }) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    layout
  >
    {artworks.map((artwork) => (
      <ArtworkCard
        key={artwork.id}
        artwork={artwork}
        onClick={() => onArtworkClick(artwork)}
      />
    ))}
  </motion.div>
)

const ArtworkCard: React.FC<{
  artwork: Artwork
  onClick: () => void
}> = ({ artwork, onClick }) => (
  <motion.div
    layoutId={`artwork-${artwork.id}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer flex flex-col"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="h-64 overflow-hidden">
      <img 
        src={artwork.imageUrl} 
        alt={artwork.title} 
        className="w-full h-full object-cover object-top"
      />
    </div>
    <div className="p-6 flex-grow">
      <h2 className="text-2xl font-semibold text-primary mb-2">{artwork.title}</h2>
      <p className="text-secondary mb-2">{artwork.year}</p>
      <p className="text-gray-600 mb-2 line-clamp-3">{artwork.description}</p>
    </div>
  </motion.div>
)

const ExpandedArtworkModal: React.FC<{
  artwork: Artwork | null
  onClose: () => void
}> = ({ artwork, onClose }) => (
  <AnimatePresence>
    {artwork && (
      <ExpandedArtwork
        key="expanded-artwork"
        artwork={artwork}
        onClose={onClose}
      />
    )}
  </AnimatePresence>
)

const artworkMatchesSearch = (artwork: Artwork, searchTerm: string): boolean => {
  const lowerSearchTerm = searchTerm.toLowerCase()
  return artwork.title.toLowerCase().includes(lowerSearchTerm) ||
    artwork.description.toLowerCase().includes(lowerSearchTerm)
}

const sortArtworks = (a: Artwork, b: Artwork, sortBy: SortOption): number => {
  if (sortBy === 'popularity') {
    return a.popularity - b.popularity
  } else {
    return a.year - b.year
  }
}

const initializeArtworks = async () => {
  const count = await db.artworks.count()
  if (count === 0) {
    const sampleArtworks: Artwork[] = [
      { 
        title: 'Self Portrait', 
        year: 1920, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zelfportret%2C_door_Huib_Luns.jpg/266px-Zelfportret%2C_door_Huib_Luns.jpg', 
        description: 'A self-portrait by Huib Luns, showcasing his skill in portraiture.',
        popularity: 0,
        type: 'Portrait'
      },
      { 
        title: 'Portrait Study', 
        year: 1915, 
        imageUrl: 'https://www.bossche-encyclopedie.nl/personen/luns,%20huib.org.jpg', 
        description: 'A detailed portrait study, demonstrating Luns\' mastery of facial expressions.',
        popularity: 1,
        type: 'Portrait'
      },
      { 
        title: 'Portrait of My Father', 
        year: 1904, 
        imageUrl: 'https://www.cultureelerfgoed.nl/binaries/large/content/gallery/cultureelerfgoed/content-afbeeldingen/collecties/kunstwerk-vd-maand/huib_luns_portret_van_mijnen_vader_1904_ab6294.jpg', 
        description: 'A touching portrait of Huib Luns\' father, painted in 1904.',
        popularity: 2,
        type: 'Portrait'
      },
      { 
        title: 'Landscape with Trees', 
        year: 1910, 
        imageUrl: 'https://www.simonis-buunk.nl/images/art/large/22390.jpg', 
        description: 'A serene landscape painting showcasing Luns\' skill with natural scenes.',
        popularity: 3,
        type: 'Landscape'
      },
      { 
        title: 'Portrait of J.F. de Vogel', 
        year: 1925, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Portret_van_J.F._de_Vogel_door_H._Luns.jpg/147px-Portret_van_J.F._de_Vogel_door_H._Luns.jpg', 
        description: 'A formal portrait of J.F. de Vogel, demonstrating Luns\' commissioned work.',
        popularity: 4,
        type: 'Portrait'
      },
      { 
        title: 'Still Life with Flowers', 
        year: 1918, 
        imageUrl: 'https://www.simonis-buunk.nl/images/art/large/2969.jpg', 
        description: 'A vibrant still life painting featuring a bouquet of flowers.',
        popularity: 5,
        type: 'Still Life'
      },
      { 
        title: 'Two Seated Women', 
        year: 1916, 
        imageUrl: 'https://az333959.vo.msecnd.net/images-6/twee-zittende-vrouwen-huib-luns-1916-97583715.jpg', 
        description: 'A painting of two seated women, showcasing Luns\' skill with multiple figures.',
        popularity: 6,
        type: 'Portrait'
      },
      { 
        title: 'Reading Lady', 
        year: 1922, 
        imageUrl: 'https://marksmit.nl/wp-content/uploads/2019/08/Lezende-dame-.jpg', 
        description: 'A serene portrait of a lady engrossed in reading.',
        popularity: 7,
        type: 'Portrait'
      },
      { 
        title: 'Portrait Study in Blue', 
        year: 1930, 
        imageUrl: 'https://www.metzemaekers.com/media/artwork/49398.jpg', 
        description: 'A striking portrait study with a predominant blue palette.',
        popularity: 8,
        type: 'Portrait'
      },
      { 
        title: 'Portrait of Ir. G. Diehl', 
        year: 1935, 
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Portret_van_Ir._G._Diehl_door_H._Luns.jpg/169px-Portret_van_Ir._G._Diehl_door_H._Luns.jpg', 
        description: 'A formal portrait of Ir. G. Diehl, showcasing Luns\' later work.',
        popularity: 9,
        type: 'Portrait'
      },
      { 
        title: 'Jeugdportret van Joseph Luns', 
        year: 1915, 
        imageUrl: 'https://lh5.ggpht.com/FMEmJ03mT1mUHrTdiqfPmjkObcicBk8pj70z0PQXoL82FK9vhl-N9nNKcZASGH27kt4mfhcL1O6vZsz5tSR0sRGX1eo=s1920', 
        description: 'A youth portrait of Joseph Luns by Huib Luns, painted between 1914 and 1915.',
        popularity: 10,
        type: 'Portrait'
      },
      { 
        title: 'Vughtse toren en kerk in de zomer', 
        year: 1928, 
        imageUrl: 'https://www.simonis-buunk.nl/images/art/large/9616.jpg', 
        description: 'Oil on canvas on board, 46.3 x 52.0 cm, signed lower right and dated 1928. Depicts the Vught tower and church in summer.',
        popularity: 11,
        type: 'Landscape'
      },
      { 
        title: 'Untitled Landscape', 
        year: 1920, 
        imageUrl: 'https://mdl.artvee.com/ft/15536po.jpg', 
        description: 'An untitled landscape painting by Huib Luns, showcasing his skill in depicting natural scenes.',
        popularity: 12,
        type: 'Landscape'
      },
    ]
    await db.artworks.bulkAdd(sampleArtworks)
  }
}

export default Gallery

import React, { useState, useEffect } from 'react';
import { Artwork } from '../db';
import { motion } from 'framer-motion';

interface ExpandedArtworkProps {
  artwork: Artwork;
  onClose: () => void;
}

const ExpandedArtwork: React.FC<ExpandedArtworkProps> = ({ artwork, onClose }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
    };
    img.src = artwork.imageUrl;
  }, [artwork.imageUrl]);

  const maxWidth = 90; // Maximum width in vh units
  const maxHeight = 90; // Maximum height in vh units

  let width, height;
  if (imageAspectRatio > 1) {
    width = Math.min(maxWidth, maxHeight * imageAspectRatio);
    height = width / imageAspectRatio;
  } else {
    height = Math.min(maxHeight, maxWidth / imageAspectRatio);
    width = height * imageAspectRatio;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        layoutId={`artwork-${artwork.id}`}
        style={{
          width: `${width}vh`,
          height: `${height}vh`,
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="relative flex-grow overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <div className="p-4 bg-white bg-opacity-90 absolute bottom-0 left-0 right-0">
          <h2 className="text-xl font-semibold text-primary mb-1">{artwork.title}</h2>
          <p className="text-sm text-secondary mb-1">{artwork.year}</p>
          <p className="text-xs text-gray-600 mb-1">{artwork.description}</p>
          <p className="text-xs text-gray-500">Type: {artwork.type}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedArtwork;

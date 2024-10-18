import React from 'react'
import AnimateOnScroll from '../components/AnimateOnScroll'

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <AnimateOnScroll>
        <h1 className="text-4xl font-bold mb-8 text-primary">About Huib Luns</h1>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <img src="https://source.unsplash.com/random/1200x600?artist,portrait" alt="Huib Luns" className="w-full h-96 object-cover rounded-lg mb-12" />
      </AnimateOnScroll>
      <div className="prose text-gray-700">
        <AnimateOnScroll>
          <p className="mb-6">
            Huib Luns is a contemporary artist known for his vibrant and expressive paintings that explore the intersection of color, emotion, and abstract forms. With a career spanning over two decades, Luns has established himself as a prominent figure in the art world, continuously pushing the boundaries of artistic expression.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="mb-6">
            Born in Amsterdam, Netherlands, Luns discovered his passion for art at a young age. He studied at the Royal Academy of Art in The Hague, where he honed his skills and developed his unique style. His work is characterized by bold brushstrokes, rich textures, and a masterful use of color that evokes deep emotional responses from viewers.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="mb-6">
            Luns' artwork has been exhibited in galleries and museums across Europe and North America. His pieces are part of several prestigious private and public collections. Through his art, Luns seeks to create a dialogue between the viewer and the canvas, inviting personal interpretation and reflection.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p>
            When not in his studio, Huib Luns is passionate about nurturing young talent and frequently conducts workshops and lectures at art schools around the world. He believes in the power of art to transform perspectives and inspire change in society.
          </p>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

export default About
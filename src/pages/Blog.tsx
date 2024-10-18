import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AnimateOnScroll from '../components/AnimateOnScroll'

const blogPosts = [
  {
    id: 1,
    title: 'The Self-Portrait: A Window into Huib Luns',
    date: '2023-05-15',
    excerpt: 'Explore the introspective world of Huib Luns through his captivating self-portrait from 1920...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zelfportret%2C_door_Huib_Luns.jpg/266px-Zelfportret%2C_door_Huib_Luns.jpg'
  },
  {
    id: 2,
    title: 'A Father\'s Portrait: Huib Luns\' Emotional Masterpiece',
    date: '2023-04-28',
    excerpt: 'Delve into the touching portrait of Huib Luns\' father, painted in 1904, showcasing the artist\'s early talent...',
    imageUrl: 'https://www.cultureelerfgoed.nl/binaries/large/content/gallery/cultureelerfgoed/content-afbeeldingen/collecties/kunstwerk-vd-maand/huib_luns_portret_van_mijnen_vader_1904_ab6294.jpg'
  },
  {
    id: 3,
    title: 'Nature\'s Canvas: Luns\' Landscape with Trees',
    date: '2023-04-10',
    excerpt: 'Discover the serene beauty captured in Huib Luns\' landscape painting from 1910...',
    imageUrl: 'https://www.simonis-buunk.nl/images/art/large/22390.jpg'
  }
]

const Blog: React.FC = () => {
  const [sortBy, setSortBy] = useState<'popularity' | 'year'>('popularity');

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [blogPosts, sortBy]);

  return (
    <div className="container mx-auto px-4 py-16">
      <AnimateOnScroll>
        <h1 className="text-4xl font-bold mb-12 text-primary"> </h1>
      </AnimateOnScroll>
      <div className="space-y-16">
        {sortedPosts.map((post) => (
          <AnimateOnScroll key={post.id}>
            <Link to={`/blog/${post.id}`} className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
                <div className="p-8">
                  <h2 className="text-3xl font-semibold mb-3 text-primary">{post.title}</h2>
                  <p className="text-secondary mb-4">{post.date}</p>
                  <p className="mb-6 text-gray-600">{post.excerpt}</p>
                  <span className="text-accent font-semibold">Read More</span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  )
}

export default Blog

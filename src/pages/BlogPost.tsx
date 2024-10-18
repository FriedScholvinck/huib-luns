import React from 'react'
import { useParams } from 'react-router-dom'
import AnimateOnScroll from '../components/AnimateOnScroll'

const blogPosts = [
  {
    id: 1,
    title: "The Self-Portrait: A Window into Huib Luns",
    date: "2023-05-15",
    content: `
      <p>Huib Luns, born in Paris on June 6, 1881, was a Dutch painter, sculptor, illustrator, and writer. His self-portrait from 1920 offers a fascinating glimpse into the artist's psyche and his mastery of portraiture.</p>
      <p>In this striking self-portrait, Luns captures himself with an intense, penetrating gaze that seems to look beyond the viewer. The play of light and shadow across his face demonstrates his skill in chiaroscuro, a technique he likely honed during his studies at the Rijksakademie van beeldende kunsten in Amsterdam.</p>
      <p>Luns' artistic journey was marked by diverse influences and experiences. He received his initial drawing lessons from Antoon and Theo Molkenboer before attending the Rijksnormaalschool voor Teekenonderwijzers. This self-portrait, created when Luns was about 39 years old, shows an artist at the height of his powers, confident in his abilities and place in the art world.</p>
      <p>At the time of this painting, Luns was already an established figure in the Dutch art scene. He had been the head teacher at the Academy of Fine Arts and Technical Sciences in Rotterdam and had just begun his tenure as director of the Rijksnormaalschool, succeeding W.B.G. Molkenboer.</p>
      <p>This self-portrait not only showcases Luns' technical skill but also provides insight into his character. The serious expression and the direct gaze suggest a man of deep thought and artistic conviction, qualities that would serve him well in his roles as an educator and writer on Dutch painting.</p>
    `,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Zelfportret%2C_door_Huib_Luns.jpg/266px-Zelfportret%2C_door_Huib_Luns.jpg"
  },
  {
    id: 2,
    title: "A Father's Portrait: Huib Luns' Emotional Masterpiece",
    date: "2023-04-28",
    content: `
      <p>In 1904, at the young age of 23, Huib Luns painted a touching portrait of his father, Theodorus Bernhardus Johannes Luns. This early work already showcases the talent and emotional depth that would characterize Luns' later career as a renowned Dutch artist.</p>
      <p>The portrait of Luns' father is a testament to the artist's ability to capture not just the physical likeness of his subject, but also the essence of their character. The gentle expression and thoughtful pose suggest a deep connection between the artist and his subject, offering viewers a glimpse into their relationship.</p>
      <p>This painting was created at a pivotal time in Luns' life. In the same year, he competed for the prestigious Prix de Rome alongside his friend, the painter Jan Sluijters. Although Sluijters ultimately won the prize, Luns' participation demonstrates his early ambition and the recognition of his talent by the art establishment.</p>
      <p>The technical skill displayed in this portrait is remarkable for such a young artist. The subtle play of light on the face, the careful rendering of fabric, and the overall composition all point to Luns' growing mastery of his craft. This work likely drew from the techniques he learned during his time at the Rijksnormaalschool voor Teekenonderwijzers and his apprenticeship at the Rijksakademie van beeldende kunsten.</p>
      <p>This portrait of his father not only represents a personal milestone for Luns but also foreshadows his future success as a portraitist. Throughout his career, Luns would go on to paint many notable figures, including Louis XVI of France and his own son, the future Dutch Foreign Minister Joseph Luns.</p>
    `,
    imageUrl: "https://www.cultureelerfgoed.nl/binaries/large/content/gallery/cultureelerfgoed/content-afbeeldingen/collecties/kunstwerk-vd-maand/huib_luns_portret_van_mijnen_vader_1904_ab6294.jpg"
  },
  {
    id: 3,
    title: "Nature's Canvas: Luns' Landscape with Trees",
    date: "2023-04-10",
    content: `
      <p>While Huib Luns is primarily known for his portraits and figurative work, his 1910 "Landscape with Trees" demonstrates his versatility as an artist and his keen eye for natural beauty. This serene landscape painting showcases Luns' skill in capturing the essence of the Dutch countryside.</p>
      <p>Created when Luns was about 29 years old, this painting likely reflects the influence of his time in Brussels, where he worked as a painter and became a member of the Pour l'Art society. The Belgian and Dutch landscape traditions, with their emphasis on light and atmosphere, are evident in this work.</p>
      <p>The composition of "Landscape with Trees" reveals Luns' thoughtful approach to nature painting. The careful arrangement of trees, the subtle gradations of color in the sky, and the sense of depth achieved through his use of perspective all contribute to the painting's tranquil atmosphere.</p>
      <p>This landscape was painted during a significant period in Luns' career. In 1908, just two years before this work, he had become the head teacher at the Academy of Fine Arts and Technical Sciences in Rotterdam. His growing reputation as both an artist and an educator is reflected in the confidence and maturity of this painting.</p>
      <p>While Luns would go on to be known primarily for his portraits and his writings on art, works like "Landscape with Trees" remind us of his broader talents and his deep appreciation for the natural world. This painting stands as a testament to Luns' ability to find beauty and inspiration in diverse subjects, a quality that would serve him well throughout his multifaceted career as an artist, educator, and writer.</p>
    `,
    imageUrl: "https://www.simonis-buunk.nl/images/art/large/22390.jpg"
  }
]

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const post = blogPosts.find(post => post.id === parseInt(id || ''))

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <AnimateOnScroll>
        <h1 className="text-4xl font-bold mb-4 text-primary">{post.title}</h1>
        <p className="text-secondary mb-8">{post.date}</p>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <img src={post.imageUrl} alt={post.title} className="w-full max-w-3xl mx-auto mb-12 rounded-lg shadow-lg" />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <div className="prose prose-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
      </AnimateOnScroll>
    </div>
  )
}

export default BlogPost

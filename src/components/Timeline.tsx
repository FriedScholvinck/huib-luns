import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const timelineEvents = [
  { year: 1881, event: 'Born on June 6 in Paris to Dutch parents.' },
  { year: 1898, event: 'Began studying drawing at the Rijksnormaalschool voor Teekenonderwijzers in Amsterdam.' },
  { year: 1902, event: 'Continued studies at the Rijksakademie van beeldende kunsten in Amsterdam.' },
  { year: 1900, event: 'Worked as a painter in Brussels and joined the art society Pour l\'Art.' },
  { year: 1908, event: 'Returned to the Netherlands, became a head teacher at the Academy of Visual Arts in Rotterdam.' },
  { year: 1918, event: 'Appointed Director of the Koninklijke School voor Kunst, Techniek en Ambacht in \'s-Hertogenbosch.' },
  { year: 1923, event: 'Became Director of the Rijksnormaalschool voor Teekenonderwijzers in Amsterdam.' },
  { year: 1931, event: 'Appointed professor at the Technical University of Delft, focusing on drawing and the history of painting and sculpture.' },
  { year: 1942, event: 'Passed away on February 24 in Amsterdam.' },
]

const Timeline: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [isInView, controls])

  return (
    <div ref={ref} className="bg-gunmetal-400 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-periwinkle-300 text-center">The Life of Huib Luns</h2>
        <div className="relative">
          {timelineEvents.map((item, index) => (
            <motion.div
              key={item.year}
              className="mb-24 flex items-center"
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, z: 1 },
                hidden: { opacity: 0, x: -100, z: 0 }
              }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="w-32 text-right mr-8">
                <span className="text-2xl font-bold text-liver-400">{item.year}</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-periwinkle-400 to-periwinkle-600 mr-8 shadow-md"></div>
              <div className="flex-1 bg-dim_gray-300 p-6 rounded-lg shadow-lg">
                <p className="text-periwinkle-100 text-lg">{item.event}</p>
              </div>
            </motion.div>
          ))}
          <div className="absolute left-[8.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-periwinkle-400 to-periwinkle-600"></div>
        </div>
        <motion.div
          className="mt-24 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, z: 1 },
            hidden: { opacity: 0, y: 50, z: 0 }
          }}
          transition={{ duration: 0.8, delay: timelineEvents.length * 0.2 }}
        >
          <p className="text-periwinkle-100 text-lg max-w-3xl mx-auto">
            Throughout his career, Huib Luns worked as a painter, illustrator, and art educator. He was also known for his travel books and lectures on art, and he influenced many students in the Dutch art scene. His artistic legacy includes paintings, etchings, lithographs, and sculptures.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Timeline
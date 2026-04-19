import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const crops = [
  { name: 'Tomato',        classes: 10, emoji: '🍅' },
  { name: 'Apple',         classes: 4,  emoji: '🍎' },
  { name: 'Corn',          classes: 4,  emoji: '🌽' },
  { name: 'Grape',         classes: 4,  emoji: '🍇' },
  { name: 'Potato',        classes: 3,  emoji: '🥔' },
  { name: 'Bell Pepper',   classes: 2,  emoji: '🌶️' },
  { name: 'Strawberry',    classes: 2,  emoji: '🍓' },
  { name: 'Peach',         classes: 2,  emoji: '🍑' },
  { name: 'Cherry',        classes: 2,  emoji: '🍒' },
  { name: 'Blueberry',     classes: 2,  emoji: '🫐' },
  { name: 'Squash',        classes: 1,  emoji: '🎃' },
  { name: 'Raspberry',     classes: 2,  emoji: '🍓' },
  { name: 'Soybean',       classes: 1,  emoji: '🫘' },
  { name: 'Orange',        classes: 1,  emoji: '🍊' },
  { name: 'Mango',         classes: 2,  emoji: '🥭' },
  { name: 'Cassava',       classes: 3,  emoji: '🌿' },
  { name: 'Rice',          classes: 3,  emoji: '🌾' },
  { name: 'Wheat',         classes: 2,  emoji: '🌾' },
  { name: 'Coffee',        classes: 2,  emoji: '☕' },
  { name: 'Citrus',        classes: 2,  emoji: '🍋' },
  { name: 'Guava',         classes: 2,  emoji: '🍈' },
  { name: 'Banana',        classes: 2,  emoji: '🍌' },
]

export default function CropGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
      {crops.map((crop, i) => (
        <motion.div
          key={crop.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.03 }}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-forest-50 dark:hover:bg-forest-950/50 border border-[var(--border)] hover:border-forest-300 dark:hover:border-forest-700 transition-all cursor-default group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">{crop.emoji}</span>
          <span className="text-xs font-medium text-center leading-tight">{crop.name}</span>
          <span className="text-[10px] font-mono text-[var(--text-secondary)]">
            {crop.classes} {crop.classes === 1 ? 'class' : 'classes'}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

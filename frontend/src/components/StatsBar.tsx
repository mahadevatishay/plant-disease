import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '95.9%', label: 'Test Accuracy', sub: 'EfficientNet-B4' },
  { value: '87K', label: 'Training Images', sub: '38 disease classes' },
  { value: '22ms', label: 'Mobile Inference', sub: 'Snapdragon 778G' },
  { value: '22', label: 'Crop Types', sub: 'Apple to Tomato' },
  { value: '19M', label: 'Parameters', sub: 'vs 25.6M ResNet-50' },
  { value: '22MB', label: 'TFLite Model', sub: 'INT8 quantised' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="bg-[var(--bg-primary)] px-4 py-5 flex flex-col gap-0.5"
        >
          <span className="font-display font-bold text-2xl text-forest-700 dark:text-forest-400 leading-none">
            {s.value}
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)] mt-1">{s.label}</span>
          <span className="text-xs text-[var(--text-secondary)]">{s.sub}</span>
        </motion.div>
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  tag?: string
  title: string
  titleAccent?: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeading({ tag, title, titleAccent, subtitle, center = false }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${center ? 'text-center' : ''}`}
    >
      {tag && (
        <div className={`mb-3 ${center ? 'flex justify-center' : ''}`}>
          <span className="tag bg-forest-100 dark:bg-forest-950 text-forest-700 dark:text-forest-400 border border-forest-200 dark:border-forest-800">
            {tag}
          </span>
        </div>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">
        {title}{' '}
        {titleAccent && (
          <span className="gradient-text">{titleAccent}</span>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[var(--text-secondary)] text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

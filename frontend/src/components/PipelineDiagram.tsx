import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, Layers, Cpu, Smartphone, Globe, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Database,
    label: 'Dataset',
    desc: '87,318 images\n22 crops · 38 classes',
    color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-900',
  },
  {
    icon: Layers,
    label: 'Training',
    desc: 'Transfer learning\nGradual unfreezing',
    color: 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-900',
  },
  {
    icon: Cpu,
    label: 'EfficientNet-B4',
    desc: '95.9% accuracy\n19M parameters',
    color: 'bg-forest-100 dark:bg-forest-950 text-forest-700 dark:text-forest-400',
    border: 'border-forest-200 dark:border-forest-900',
  },
  {
    icon: Cpu,
    label: 'TFLite Export',
    desc: 'INT8 quantisation\n76MB → 22MB',
    color: 'bg-soil-light/20 dark:bg-soil-dark/20 text-soil-DEFAULT dark:text-soil-light',
    border: 'border-soil-light/30 dark:border-soil-dark/30',
  },
  {
    icon: Smartphone,
    label: 'Edge Deploy',
    desc: '22ms inference\nOffline capable',
    color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-900',
  },
  {
    icon: Globe,
    label: 'FastAPI + React',
    desc: 'Docker · REST API\nWeb + Mobile',
    color: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-900',
  },
]

export default function PipelineDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="w-full">
      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-center gap-0 overflow-x-auto pb-2">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="flex items-center shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${step.border} bg-[var(--bg-primary)] min-w-[130px] text-center`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm leading-tight">{step.label}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 whitespace-pre-line leading-snug">
                    {step.desc}
                  </p>
                </div>
                <div className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full ${step.color}`}>
                  Step {i + 1}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="mx-2 text-[var(--text-secondary)]"
                >
                  <ArrowRight size={16} />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: grid */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${step.border} bg-[var(--bg-primary)] text-center`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">{step.label}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 whitespace-pre-line leading-snug">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

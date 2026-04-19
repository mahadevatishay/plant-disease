import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const models = [
  { name: 'MobileNetV2',       params: '3.4M',  flops: '0.30G',  acc: 91.6, f1: '0.908', highlight: false },
  { name: 'EfficientNet-B0',   params: '5.3M',  flops: '0.39G',  acc: 93.2, f1: '0.924', highlight: false },
  { name: 'EfficientNet-B1',   params: '7.8M',  flops: '0.70G',  acc: 93.9, f1: '0.932', highlight: false },
  { name: 'EfficientNet-B2',   params: '9.2M',  flops: '1.00G',  acc: 94.6, f1: '0.940', highlight: false },
  { name: 'EfficientNet-B3',   params: '12.0M', flops: '1.80G',  acc: 95.3, f1: '0.948', highlight: false },
  { name: 'EfficientNet-B4',   params: '19.0M', flops: '4.20G',  acc: 95.9, f1: '0.954', highlight: true  },
  { name: 'EfficientNet-B5',   params: '30.0M', flops: '9.90G',  acc: 96.1, f1: '0.957', highlight: false },
  { name: 'EfficientNet-B6',   params: '43.0M', flops: '19.00G', acc: 96.2, f1: '0.958', highlight: false },
  { name: 'EfficientNet-B7',   params: '66.0M', flops: '37.00G', acc: 96.3, f1: '0.959', highlight: false },
  { name: 'ResNet-50',         params: '25.6M', flops: '4.10G',  acc: 93.8, f1: '0.931', highlight: false },
]

export default function ModelComparisonTable() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
            {['Model', 'Params', 'FLOPs', 'Accuracy', 'F1 Score', ''].map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => (
            <motion.tr
              key={m.name}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={`border-b border-[var(--border)] last:border-0 transition-colors
                ${m.highlight
                  ? 'bg-forest-50 dark:bg-forest-950/50'
                  : 'hover:bg-[var(--bg-secondary)]'
                }`}
            >
              <td className="px-4 py-3 font-medium font-mono text-xs">
                <span className={m.highlight ? 'text-forest-700 dark:text-forest-400 font-bold' : ''}>
                  {m.name}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">{m.params}</td>
              <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">{m.flops}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-20 h-1.5 rounded-full bg-bark-200 dark:bg-forest-900 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${m.highlight ? 'bg-forest-500' : 'bg-bark-300 dark:bg-forest-800'}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${((m.acc - 88) / 10) * 100}%` } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.04 }}
                    />
                  </div>
                  <span className={`font-mono text-xs ${m.highlight ? 'text-forest-700 dark:text-forest-400 font-bold' : ''}`}>
                    {m.acc}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">{m.f1}</td>
              <td className="px-4 py-3">
                {m.highlight && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-400">
                    <Star size={10} fill="currentColor" />
                    Recommended
                  </span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

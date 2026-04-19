import PageWrapper from '../components/PageWrapper'
import Predictor from '../components/Predictor'
import { Cpu, Wifi, WifiOff } from 'lucide-react'

export default function Demo() {
  return (
    <PageWrapper>
      <section className="pt-28 pb-20 min-h-screen">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="tag bg-forest-100 dark:bg-forest-950 text-forest-700 dark:text-forest-400 border border-forest-200 dark:border-forest-800 mb-4 inline-flex">
              Live Demo
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Plant Disease{' '}
              <span className="gradient-text">Detector</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Upload a clear photo of a plant leaf. Our EfficientNet-B4 model will identify any disease, cause, symptoms, and recommended treatment.
            </p>
          </div>

          {/* Server status badges */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-xs">
              <Cpu size={13} className="text-forest-500" />
              <span className="font-mono">EfficientNet-B4</span>
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-xs">
              <Wifi size={13} className="text-blue-500" />
              <span>FastAPI :5000</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-xs">
              <WifiOff size={13} className="text-soil-light" />
              <span>Falls back to demo mode if offline</span>
            </div>
          </div>

          {/* Main Predictor */}
          <div className="max-w-4xl mx-auto card-glass p-6 md:p-8">
            <Predictor />
          </div>

          {/* Tips */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tip: '📸', title: 'Clear photo', desc: 'Use natural light. Fill the frame with the affected leaf. Avoid blurry or dark images.' },
              { tip: '🍃', title: 'Single leaf', desc: 'Focus on one leaf showing disease symptoms. Avoid capturing the whole plant.' },
              { tip: '🔍', title: 'Show symptoms', desc: 'Include visible lesions, spots, or discoloration. Both sides of the leaf help accuracy.' },
            ].map(t => (
              <div key={t.title} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm">
                <div className="text-2xl mb-2">{t.tip}</div>
                <div className="font-semibold mb-1">{t.title}</div>
                <div className="text-[var(--text-secondary)] text-xs leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

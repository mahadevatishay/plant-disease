import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, AlertCircle, CheckCircle2, Loader2,
  ChevronDown, RefreshCw, Info, Pill, Bug, FlaskConical
} from 'lucide-react'
import { predictDisease, getMockPrediction, type PredictionResult } from '../utils/api'

interface Props {
  compact?: boolean
}

export default function Predictor({ compact = false }: Props) {
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usedMock, setUsedMock] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).')
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File too large. Please upload an image under 10MB.')
      return
    }
    setFile(f)
    setResult(null)
    setError(null)
    setUsedMock(false)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }, [processFile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const handlePredict = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await predictDisease(file)
      setResult(res)
      setUsedMock(false)
    } catch {
      // Backend unavailable — use mock for demo
      const mock = await getMockPrediction(file)
      setResult(mock)
      setUsedMock(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPreview(null)
    setFile(null)
    setResult(null)
    setError(null)
    setUsedMock(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const confidencePct = result ? Math.round(result.confidence * 100) : 0
  const confidenceColor =
    confidencePct >= 90 ? 'bg-forest-500' :
    confidencePct >= 70 ? 'bg-soil-light' :
    'bg-red-500'

  return (
    <div className={`w-full ${compact ? '' : 'max-w-4xl mx-auto'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <div className="flex flex-col gap-4">
          {!preview ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center select-none
                ${compact ? 'h-52' : 'h-72'}
                ${dragging
                  ? 'border-forest-500 bg-forest-50 dark:bg-forest-950 drop-zone-active scale-[1.01]'
                  : 'border-bark-300 dark:border-forest-800 hover:border-forest-500 dark:hover:border-forest-600 hover:bg-forest-50/50 dark:hover:bg-forest-950/30'
                }`}
            >
              <motion.div
                animate={{ y: dragging ? -6 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex flex-col items-center gap-3"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  dragging ? 'bg-forest-100 dark:bg-forest-900' : 'bg-bark-100 dark:bg-forest-900/50'
                }`}>
                  <Upload size={24} className={dragging ? 'text-forest-600' : 'text-bark-400 dark:text-forest-600'} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--text-primary)]">
                    {dragging ? 'Drop your leaf image' : 'Upload a leaf image'}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Drag & drop or click · JPG, PNG, WEBP · max 10MB
                  </p>
                </div>
              </motion.div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                aria-label="Upload leaf image"
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]">
              <img
                src={preview}
                alt="Uploaded leaf"
                className={`w-full object-cover ${compact ? 'h-52' : 'h-72'}`}
              />
              {loading && (
                <div className="absolute inset-0 bg-forest-950/60 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-forest-400/30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-forest-400 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-white text-sm font-medium">Analyzing leaf...</p>
                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-forest-400 to-transparent opacity-70"
                      animate={{ y: [0, 280] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 p-1.5 bg-bark-900/70 hover:bg-bark-900 text-white rounded-lg transition-colors backdrop-blur-sm"
                aria-label="Remove image"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {file && !loading && !result && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handlePredict}
              className="btn-primary w-full justify-center"
            >
              <FlaskConical size={16} />
              Analyze Disease
            </motion.button>
          )}

          {result && (
            <button onClick={handleReset} className="btn-secondary w-full justify-center text-sm">
              <RefreshCw size={14} />
              Scan Another Leaf
            </button>
          )}
        </div>

        {/* Result Panel */}
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-[var(--border)] text-[var(--text-secondary)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-3">
                  <Info size={20} className="opacity-40" />
                </div>
                <p className="text-sm">Upload a leaf image to see the AI diagnosis here.</p>
                <p className="text-xs mt-1 opacity-60">Supports 22 crop types · 38 disease classes</p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-[var(--bg-secondary)]"
              >
                <Loader2 size={32} className="text-forest-500 animate-spin" />
                <div className="text-center">
                  <p className="font-medium text-sm">Running EfficientNet-B4</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">22ms on-device inference</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex-1 flex flex-col gap-4"
              >
                {/* Disease header */}
                <div className={`p-4 rounded-2xl border ${
                  result.is_healthy
                    ? 'bg-forest-50 dark:bg-forest-950/40 border-forest-200 dark:border-forest-800'
                    : 'bg-soil-light/10 dark:bg-soil-dark/20 border-soil-light/30 dark:border-soil-dark/30'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {result.is_healthy
                          ? <CheckCircle2 size={16} className="text-forest-600" />
                          : <AlertCircle size={16} className="text-soil-light" />
                        }
                        <span className={`text-xs font-mono font-medium uppercase tracking-wider ${
                          result.is_healthy ? 'text-forest-600' : 'text-soil-DEFAULT'
                        }`}>
                          {result.is_healthy ? 'Healthy' : 'Disease Detected'}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg leading-snug">
                        {result.disease}
                      </h3>
                      {result.plant_type && (
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          Plant: {result.plant_type}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-2xl text-forest-700 dark:text-forest-400">
                        {confidencePct}%
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">confidence</div>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-bark-200 dark:bg-forest-900 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${confidenceColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${confidencePct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Cause */}
                <div className="card-glass p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug size={14} className="text-soil-light" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Cause</span>
                  </div>
                  <p className="text-sm">{result.cause}</p>
                </div>

                {/* Symptoms */}
                <div className="card-glass p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={14} className="text-soil-light" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Symptoms</span>
                  </div>
                  <ul className="space-y-1.5">
                    {result.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div className="card-glass p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill size={14} className="text-forest-500" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Treatment</span>
                  </div>
                  <ul className="space-y-1.5">
                    {result.treatment.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 font-mono text-xs text-forest-500 shrink-0">0{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternatives */}
                {result.alternatives && result.alternatives.length > 0 && (
                  <details className="card-glass">
                    <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-medium list-none">
                      <span>Other possibilities</span>
                      <ChevronDown size={14} className="text-[var(--text-secondary)]" />
                    </summary>
                    <div className="px-4 pb-4 space-y-2">
                      {result.alternatives.map((a, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">{a.disease}</span>
                          <span className="font-mono text-xs">{Math.round(a.confidence * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {usedMock && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-soil-light/10 border border-soil-light/20 text-xs text-soil-DEFAULT">
                    <Info size={13} className="mt-0.5 shrink-0" />
                    Demo mode — backend offline. Showing mock prediction. Start FastAPI server at port 5000 for real results.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Github, Zap, Shield, Smartphone,
  Globe, BarChart3, Leaf, ExternalLink
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Predictor from '../components/Predictor'
import StatsBar from '../components/StatsBar'
import ModelComparisonTable from '../components/ModelComparisonTable'
import PipelineDiagram from '../components/PipelineDiagram'
import CropGrid from '../components/CropGrid'
import SectionHeading from '../components/SectionHeading'

const features = [
  {
    icon: Zap,
    title: 'Real-Time Inference',
    desc: 'EfficientNet-B4 with INT8 quantisation runs in just 22ms on a mid-tier Android phone. No latency, instant diagnosis in the field.',
    color: 'text-soil-light',
    bg: 'bg-soil-light/10 dark:bg-soil-dark/20',
  },
  {
    icon: Shield,
    title: '95.9% Accuracy',
    desc: 'Trained on 87K leaf images across 38 disease classes. Outperforms ResNet-50 by 2.1 percentage points at equivalent compute.',
    color: 'text-forest-600 dark:text-forest-400',
    bg: 'bg-forest-100 dark:bg-forest-950',
  },
  {
    icon: Smartphone,
    title: 'Edge AI Ready',
    desc: 'TFLite model is 22MB after INT8 quantisation. Runs offline on Raspberry Pi, Jetson Nano, or any Android device without internet.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: Globe,
    title: '22 Crop Types',
    desc: 'Comprehensive coverage: tomato, apple, grape, corn, potato and 17 more. 38 distinct disease classes plus healthy variants.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    icon: BarChart3,
    title: 'Full Diagnosis',
    desc: 'Beyond just disease name — receive cause, symptoms, treatment recommendations and alternative predictions with confidence scores.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: Leaf,
    title: 'Production Stack',
    desc: 'FastAPI backend in Docker, React frontend, REST API at /predict. Deploy to Railway/Render backend + Vercel frontend in minutes.',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950',
  },
]

export default function Home() {
  const featRef = useRef(null)
  const featInView = useInView(featRef, { once: true, margin: '-60px' })

  return (
    <PageWrapper>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col pt-24 pb-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-forest-300/20 dark:bg-forest-900/30 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-leaf-light/10 dark:bg-forest-800/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-soil-light/10 dark:bg-soil-dark/10 blur-3xl" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="section-container relative z-10 flex-1 flex flex-col">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <a
              href="https://arxiv.org/abs/1905.11946"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-400 text-xs font-medium hover:border-forest-400 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
              Built on EfficientNet — NeurIPS 2019
              <ExternalLink size={11} />
            </a>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-4xl mx-auto mb-6"
          >
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Detect plant{' '}
              <span className="relative inline-block">
                <span className="gradient-text">disease</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C40 2 80 2 100 2C120 2 160 2 198 6" stroke="#84cc16" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              in 22 milliseconds
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload a leaf photo. Get instant AI diagnosis — disease name, cause, symptoms, and treatment recommendations. 95.9% accuracy across 22 crops and 38 disease classes.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <Link to="/demo" className="btn-primary text-base px-8 py-3.5">
              Try Live Demo
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/mahadevatishay/plant-disease.git"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3.5"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <StatsBar />
          </motion.div>

          {/* Inline demo preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="card-glass p-6 md:p-8 noise-overlay"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-xl">Quick Diagnosis</h2>
                <p className="text-sm text-[var(--text-secondary)]">Upload a leaf — get results instantly</p>
              </div>
              <Link to="/demo" className="text-sm text-forest-600 dark:text-forest-400 hover:underline flex items-center gap-1">
                Full demo <ArrowRight size={13} />
              </Link>
            </div>
            <Predictor compact />
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="section-container">
          <SectionHeading
            tag="What it does"
            title="Everything a farmer"
            titleAccent="needs in the field"
            subtitle="From edge AI to full treatment recommendations — built for real agricultural conditions, not just lab benchmarks."
            center
          />
          <div ref={featRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={featInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-glass p-6 hover:shadow-lg hover:shadow-forest-900/10 dark:hover:shadow-forest-950/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg}`}>
                    <Icon size={18} className={f.color} />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24">
        <div className="section-container">
          <SectionHeading
            tag="Architecture"
            title="From image to"
            titleAccent="diagnosis"
            subtitle="A complete end-to-end pipeline — from raw Kaggle data to a deployed API in Docker, running on your phone in offline mode."
          />
          <PipelineDiagram />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Compound Scaling',
                body: 'EfficientNet scales depth, width, and resolution simultaneously using a fixed compound coefficient φ — unlike traditional models that scale a single dimension.',
              },
              {
                step: '02',
                title: 'Squeeze-and-Excitation',
                body: 'Disease patterns occupy just 2–5% of a leaf image. SE attention suppresses irrelevant background channels and amplifies texture anomalies — key for accuracy over ResNet.',
              },
              {
                step: '03',
                title: 'INT8 Quantisation',
                body: 'Post-training INT8 quantisation shrinks the model from 76MB to 22MB with <0.4% accuracy drop. The Snapdragon DSP accelerates 8-bit operations for a 3.2× speedup.',
              },
            ].map(item => (
              <div key={item.step} className="card-glass p-6">
                <div className="font-mono text-4xl font-bold text-forest-200 dark:text-forest-900 mb-3 leading-none">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODEL RESULTS ─── */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="section-container">
          <SectionHeading
            tag="Benchmark Results"
            title="EfficientNet-B4 vs"
            titleAccent="all competitors"
            subtitle="Full comparison across all EfficientNet variants, MobileNetV2, and ResNet-50. Trained under identical conditions for a true apples-to-apples comparison."
          />
          <ModelComparisonTable />

          {/* Latency table */}
          <div className="mt-8">
            <h3 className="font-display font-bold text-lg mb-4">Inference Latency — EfficientNet-B4</h3>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
                    {['Hardware', 'Float32', 'INT8 TFLite', 'Speed-up'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { hw: 'NVIDIA Tesla T4 (GPU)', f32: '9 ms', int8: '6 ms', su: '1.5×' },
                    { hw: 'Intel i7-10700 (CPU)', f32: '58 ms', int8: '31 ms', su: '1.9×' },
                    { hw: 'Snapdragon 778G (mobile)', f32: '71 ms', int8: '22 ms', su: '3.2×', highlight: true },
                  ].map(row => (
                    <tr key={row.hw} className={`border-b border-[var(--border)] last:border-0 ${row.highlight ? 'bg-forest-50 dark:bg-forest-950/40' : ''}`}>
                      <td className="px-4 py-3 font-medium">{row.hw}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">{row.f32}</td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-forest-700 dark:text-forest-400">{row.int8}</td>
                      <td className="px-4 py-3">
                        <span className={`tag ${row.highlight ? 'bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-400' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}`}>
                          {row.su}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUPPORTED CROPS ─── */}
      <section className="py-24">
        <div className="section-container">
          <SectionHeading
            tag="Coverage"
            title="22 crop types,"
            titleAccent="38 disease classes"
            subtitle="From tomato late blight to apple cedar rust — comprehensive coverage of the most economically critical crops globally."
          />
          <CropGrid />
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16">
        <div className="section-container">
          <div className="relative rounded-3xl overflow-hidden bg-forest-700 dark:bg-forest-900 p-10 md:p-14 text-center noise-overlay">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-forest-600/40 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-leaf-light/20 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to diagnose your crops?
              </h2>
              <p className="text-forest-200 text-lg mb-8 max-w-xl mx-auto">
                Upload a leaf photo and get a full AI-powered diagnosis in seconds. No sign-up required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-forest-800 font-semibold rounded-xl hover:bg-forest-50 transition-colors shadow-lg"
                >
                  Start Free Demo <ArrowRight size={16} />
                </Link>
                <a
                  href="https://github.com/tinh2044/PlantDisease_classification"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-forest-400 text-white font-semibold rounded-xl hover:border-white transition-colors"
                >
                  <Github size={16} /> GitHub Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

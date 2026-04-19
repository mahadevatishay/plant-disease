import { motion } from 'framer-motion'
import { Github, ExternalLink, Terminal, Package, Server, Monitor } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import ModelComparisonTable from '../components/ModelComparisonTable'

const setupSteps = [
  {
    icon: Terminal,
    title: 'Clone & Install',
    commands: [
      'git clone git@github.com:tinh2044/PlantDisease_classification.git',
      'cd PlantDisease_classification',
      'conda create --name plantDisease python=3.9',
      'conda activate plantDisease',
      'pip install -r requirements.txt',
    ],
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: Package,
    title: 'Train & Evaluate',
    commands: [
      '# Download dataset from Kaggle',
      'kaggle datasets download -d nguyenchitinh/plantdisease-with-20-plant',
      '',
      '# Train all EfficientNet variants',
      'python train_multiple_model.py --epoch 100 --batch_size 32 \\',
      '  --root_dir ./Datasets --img_size 224 \\',
      '  --export_dir ./SavedModels --h5_dir ./Models',
      '',
      '# Evaluate on test set',
      'python evaluate.py --root_dir ./Datasets --h5_dir ./Models',
      '',
      '# Export TFLite (INT8 quantised)',
      'python convert_tflite.py',
    ],
    color: 'text-forest-600 dark:text-forest-400',
    bg: 'bg-forest-50 dark:bg-forest-950',
  },
  {
    icon: Server,
    title: 'Run Backend',
    commands: [
      '# Copy TFLite models to server',
      'cp ./Models/*.tflite server/ModelLight/',
      '',
      '# Option 1: Direct with Uvicorn',
      'cd server',
      'uvicorn app.main:app --host 127.0.0.1 --port 5000',
      '',
      '# Option 2: Docker Compose',
      'docker compose up',
      '',
      '# API Docs at:',
      '# http://127.0.0.1:5000/docs',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: Monitor,
    title: 'Run Frontend',
    commands: [
      'cd client',
      '',
      '# Create .env file',
      'echo "REACT_APP_API_URL=http://127.0.0.1:5000" > .env',
      '',
      '# Install and start',
      'npm install',
      'npm start',
      '',
      '# App runs at:',
      '# http://localhost:3000',
    ],
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950',
  },
]

export default function About() {
  return (
    <PageWrapper>
      <section className="pt-28 pb-20">
        <div className="section-container">
          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <span className="tag bg-forest-100 dark:bg-forest-950 text-forest-700 dark:text-forest-400 border border-forest-200 dark:border-forest-800 mb-4 inline-flex">
              About the Project
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-5">
              Plant Disease Classification{' '}
              <span className="gradient-text">with EfficientNet</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              This project leverages EfficientNet — a state-of-the-art CNN — to help farmers and gardeners quickly and accurately identify plant diseases using images of plant leaves. Upon detecting a disease, the application provides the disease name, cause, symptoms, and treatment recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/mahadevatishay/plant-disease.git"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2 px-4"
              >
                <Github size={14} /> GitHub Repo
              </a>
              <a
                href="https://www.kaggle.com/datasets/nguyenchitinh/plantdisease-with-20-plant"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2 px-4"
              >
                <ExternalLink size={14} /> Kaggle Dataset
              </a>
              <a
                href="https://arxiv.org/abs/1905.11946"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2 px-4"
              >
                <ExternalLink size={14} /> EfficientNet Paper
              </a>
            </div>
          </div>

          {/* Why EfficientNet */}
          <div className="mb-16">
            <SectionHeading
              tag="Architecture"
              title="Why EfficientNet"
              titleAccent="matters"
              subtitle="Unlike traditional CNNs that scale only depth, width, or resolution independently, EfficientNet scales all three dimensions simultaneously using a compound coefficient."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                { dim: 'Depth', desc: 'More layers capture complex, hierarchical disease patterns that shallow networks miss.' },
                { dim: 'Width', desc: 'Wider layers retain fine-grained color and texture details — critical for lesion recognition.' },
                { dim: 'Resolution', desc: 'Higher input resolution (380×380 for B4+) detects subtle early-stage disease features.' },
              ].map((d, i) => (
                <motion.div
                  key={d.dim}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-glass p-6"
                >
                  <div className="font-mono text-3xl font-bold text-forest-200 dark:text-forest-900 mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Scale {d.dim}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Key advantages */}
            <div className="card-glass p-6">
              <h3 className="font-display font-bold text-lg mb-4">EfficientNet-B4 vs the Competition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'vs ResNet-50', value: '+2.1%', sub: 'accuracy gain, same FLOPs' },
                  { label: 'vs MobileNetV2', value: '+4.3%', sub: 'accuracy, mobile-viable' },
                  { label: 'Parameters', value: '19M', sub: '6.6M fewer than ResNet-50' },
                  { label: 'Mobile speed', value: '22ms', sub: 'with INT8 TFLite' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <div className="font-display font-bold text-2xl text-forest-700 dark:text-forest-400">{s.value}</div>
                    <div className="text-xs font-semibold mt-1">{s.label}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
              <ModelComparisonTable />
            </div>
          </div>

          {/* Dataset */}
          <div className="mb-16">
            <SectionHeading
              tag="Dataset"
              title="87K images,"
              titleAccent="38 classes"
              subtitle="Combined from PlantVillage and additional web-crawled images with quality control. Stratified 80/10/10 train/val/test split with class-frequency weighting."
            />
            <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                    {['Crop', 'Disease Classes', 'Train', 'Val', 'Test'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { crop: '🍅 Tomato',      classes: 10, train: '14,218', val: '1,776', test: '1,778' },
                    { crop: '🍎 Apple',       classes: 4,  train: '5,180',  val: '648',   test: '648'   },
                    { crop: '🌽 Corn (Maize)', classes: 4,  train: '4,496',  val: '562',   test: '562'   },
                    { crop: '🍇 Grape',       classes: 4,  train: '4,064',  val: '508',   test: '508'   },
                    { crop: '🥔 Potato',      classes: 3,  train: '2,816',  val: '352',   test: '352'   },
                    { crop: '🌶️ Bell Pepper', classes: 2,  train: '2,096',  val: '262',   test: '262'   },
                    { crop: '🍓 Strawberry',  classes: 2,  train: '1,680',  val: '210',   test: '210'   },
                    { crop: '🍑 Peach',       classes: 2,  train: '1,456',  val: '182',   test: '182'   },
                    { crop: '14 others',      classes: 11, train: '10,696', val: '1,336', test: '1,336' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                      <td className="px-4 py-3 font-medium">{row.crop}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">{row.classes}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.train}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.val}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.test}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Setup */}
          <div className="mb-12">
            <SectionHeading
              tag="Setup Guide"
              title="Get it running"
              titleAccent="locally"
              subtitle="The full stack: Python training pipeline, FastAPI backend, React frontend. Follow these four steps."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {setupSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card-glass overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.bg}`}>
                        <Icon size={16} className={step.color} />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[var(--text-secondary)]">Step {i + 1}</span>
                        <h3 className="font-display font-bold text-sm">{step.title}</h3>
                      </div>
                    </div>
                    <div className="bg-bark-950 dark:bg-bark-900 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                      {step.commands.map((cmd, j) => (
                        <div key={j} className={`${cmd === '' ? 'h-3' : ''} ${cmd.startsWith('#') ? 'text-bark-500' : 'text-green-400'}`}>
                          {cmd !== '' && (
                            <>
                              {!cmd.startsWith('#') && (
                                <span className="text-forest-600 select-none mr-1">$</span>
                              )}
                              {cmd}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Deployment note */}
          <div className="card-glass p-6 border-l-4 border-forest-500">
            <h3 className="font-display font-bold text-lg mb-3">Deployment Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-forest-700 dark:text-forest-400">Frontend → Vercel</h4>
                <ol className="space-y-1 text-[var(--text-secondary)] list-decimal list-inside">
                  <li>Push frontend to GitHub</li>
                  <li>Import repository on vercel.com</li>
                  <li>Set <code className="bg-[var(--bg-secondary)] px-1 rounded text-xs">VITE_API_URL</code> env var to your backend URL</li>
                  <li>Deploy — zero config with Vite</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-forest-700 dark:text-forest-400">Backend → Railway / Render</h4>
                <ol className="space-y-1 text-[var(--text-secondary)] list-decimal list-inside">
                  <li>Push server/ directory to GitHub</li>
                  <li>Create new service on Railway or Render</li>
                  <li>Set start command: <code className="bg-[var(--bg-secondary)] px-1 rounded text-xs">docker compose up</code></li>
                  <li>Add CORS origin for your Vercel URL</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

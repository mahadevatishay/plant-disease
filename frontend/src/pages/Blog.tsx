import { motion } from 'framer-motion'
import { BookOpen, Users, ExternalLink, Calendar, Tag } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'

const authors = [
  { name: 'Chhavi Gupta',  affiliation: 'B.E. CSE · Chitkara University', email: 'chhavi1459.be22@chitkara.edu.in' },
  { name: 'Kanika Gupta',  affiliation: 'B.E. CSE · Chitkara University', email: 'kanika1736.be22@chitkara.edu.in' },
  { name: 'Kunisha Dhir',  affiliation: 'B.E. CSE · Chitkara University', email: 'kunisha528.be22@chitkara.edu.in' },
]

const sections = [
  {
    heading: 'I. Introduction',
    body: `Plant diseases account for 20–40% of yearly crop loss, with financial damage surpassing $220 billion annually. For a small-scale grower in India, Sub-Saharan Africa, or Southeast Asia, losing a quarter of crops is devastating. Preventive measures require either a specialist on the farm or an effective diagnostic tool.

Deep learning has made the second option viable. The PlantVillage dataset (54K labeled leaf images, 26 diseases, 14 crops) demonstrated that fine-tuned CNNs can achieve near-perfect results — but only under controlled lighting with uniform backgrounds. Testing on actual field images revealed accuracy drops of ~31 percentage points. ResNet-50 and VGG-16 were also not designed for edge devices like a Raspberry Pi or affordable Android smartphone.

EfficientNet sits intriguingly between high-accuracy benchmarks and real-world hardware. By scaling depth, width, and resolution simultaneously under a fixed computational budget, it covers a vast accuracy vs efficiency space — and even its largest variants are more frugal than ResNet-50.`,
  },
  {
    heading: 'III. Methodology',
    body: `The dataset comprises 87,318 RGB images across 38 classes for 22 crop types, combining PlantVillage with web-crawled images. After quality control (removing blurry and misclassified images), the data was split 80/10/10 stratified by class.

Augmentation policy: random horizontal/vertical flipping, rotation ±30°, brightness/contrast ±0.2, random zoom 0.8–1.2×, and Gaussian blur (p=0.2, σ∈[0.1,1.0]) to simulate smartphone blur. Images rescaled to 224×224 (B0–B3) or 380×380 (B4+) and normalised on ImageNet statistics.

Architecture: EfficientNet scales depth, width, and resolution using compound coefficient φ with constants α=1.2, β=1.1, γ=1.15. The fundamental unit is MBConv — depthwise separable convolution with Squeeze-and-Excitation attention.

Training: Transfer learning from ImageNet weights. New head: Global Avg Pool → BatchNorm → Dropout(0.4) → Dense(38, softmax). Gradual unfreezing after 5 warm-up epochs. Adam optimizer with cosine LR annealing (ηmax=1e-3, ηmin=1e-6, T=100 epochs). Label smoothing ε=0.1. Class-frequency weighting for imbalanced classes. Early stopping patience=15. Training B4 took ~7 hours on a single NVIDIA Tesla T4.`,
  },
  {
    heading: 'IV. Results',
    body: `EfficientNet-B4 achieves 95.9% top-1 accuracy and F1=0.954 — the recommended model. While B5–B7 score marginally higher, B5 uses 58% more parameters and 2× the FLOPs for just +0.2% gain. This trade-off is irrational for smartphone deployment.

ResNet-50 reference: near-identical FLOPs (4.1G vs 4.2G), but 2.1 percentage points lower accuracy — a meaningful difference when distinguishing between similar diseases like Tomato Early Blight and Tomato Target Spot.

Confusion analysis: The model never confuses crops (no Grape→Tomato errors). All confusions are within-crop: primarily Tomato Early Blight vs Tomato Target Spot (similar concentric ring lesions). Grape classes achieve near-perfect F1≈0.981. Surprisingly, Potato Late Blight achieved F1=0.971 — water-soaked dark brown lesions appear clearly separable at the pixel level.

Inference latency with INT8 TFLite on Snapdragon 778G: 22ms (3.2× speedup vs Float32). The Hexagon DSP's native 8-bit multiply-accumulate operations explain the disproportionate mobile speedup.

Ablation study: Removing ImageNet pre-training costs 4.5 percentage points and 2.5× slower convergence. Class weighting contributes 1.2 points. Cosine decay and label smoothing add smaller but synergistic improvements.`,
  },
  {
    heading: 'V. Discussion',
    body: `The performance gap between B4 and ResNet-50 (at equivalent FLOPs) is attributed to Squeeze-and-Excitation attention. Disease patterns occupy 2–5% of a leaf image. SE suppresses uniform background channels (green leaf tissue) and amplifies channels sensitive to specific textures or color anomalies. ResNet-50 lacks this mechanism.

Domain shift is real and not solved: Testing B4 on 380 real field images from Haryana farmers yielded 89.3% accuracy — a 6.6-point drop. Field images have direct sunlight washing out color, mud altering texture, stem occlusions, and non-standard angles. Gaussian blur augmentation helped marginally. 89.3% accuracy on true field images likely better represents what a farmer will experience in practice.

Practical deployment: The TFLite model runs fully offline at 22ms — crucial for rural India where cellular coverage is unreliable. A drone with Jetson Nano could theoretically classify leaves at ~12fps in float32. An ESP32-S3 running MobileNetV2 every few minutes on solar power could send LoRaWAN disease alerts.`,
  },
  {
    heading: 'VI. Conclusion & Future Work',
    body: `EfficientNet-B4 trained on 87K leaf images achieves 95.9% accuracy across 38 disease classes, outperforming ResNet-50 by 2.1 points at equivalent compute, running in 22ms on a mid-tier Android device.

The 6.6-point domain-shift gap (95.9% → 89.3% on real field images) is the most important limitation. Future priorities: (1) collecting more field data using semi-supervised methods to leverage unlabeled agricultural imagery; (2) spatial localisation — identifying which region of the leaf is affected, not just the class; (3) expanding to wheat, rice, and soybean — crops providing a large fraction of calories in South and Southeast Asia but currently underrepresented in datasets.`,
  },
]

export default function Blog() {
  return (
    <PageWrapper>
      <section className="pt-28 pb-20">
        <div className="section-container max-w-4xl">
          {/* Paper header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="tag bg-forest-100 dark:bg-forest-950 text-forest-700 dark:text-forest-400 border border-forest-200 dark:border-forest-800">
                Research Paper
              </span>
              <span className="tag bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]">
                <Calendar size={10} className="mr-1" /> 2024
              </span>
              <span className="tag bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]">
                <Tag size={10} className="mr-1" /> Deep Learning · AgriTech
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
              Efficient Plant Disease Classification Using EfficientNet: A Scalable Pipeline for Real-Time Agricultural Applications
            </h1>

            {/* Authors */}
            <div className="flex flex-wrap gap-4 mb-8">
              {authors.map(a => (
                <div key={a.name} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-full bg-forest-200 dark:bg-forest-900 flex items-center justify-center text-xs font-bold text-forest-700 dark:text-forest-400">
                    {a.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{a.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{a.affiliation}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Abstract */}
            <div className="p-6 rounded-2xl border-l-4 border-forest-500 bg-forest-50/50 dark:bg-forest-950/30 border border-forest-200/50 dark:border-forest-800/50">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={16} className="text-forest-600" />
                <span className="font-semibold text-sm uppercase tracking-widest text-forest-600 dark:text-forest-400">Abstract</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Each year, plant pathogens silently destroy between 20 and 40% of global crop production. Automated leaf image detection could provide a helping hand, but current state-of-the-art models typically prioritise benchmark metrics on carefully prepped images, while remaining entirely impractical on cheap mobile devices. This paper asks: can we design a model that is accurate and realistic?
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mt-3">
                We finetune the entire EfficientNet series (B0–B7) on a dataset of about 87,000 leaves across 22 crops and 38 diseases. B4 strikes a balance at 95.9% classification accuracy with 19M parameters, outperforming ResNet-50 by 2.4 percentage points while also being smaller. Following INT8 quantisation, our TFLite-based model runs on a mid-level Android device in 22ms — fast enough for a farmer in a field. We provide a Dockerised FastAPI with React front-end, providing disease predictions, cause, symptoms, and treatment recommendations. Field pictures from Haryana lowered accuracy by ~6 percentage points, but we made steps towards real-world practicality.
              </p>
            </div>

            {/* Index terms */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['plant disease classification', 'EfficientNet', 'convolutional neural networks', 'transfer learning', 'TensorFlow Lite', 'precision agriculture', 'edge AI deployment'].map(t => (
                <span key={t} className="tag bg-bark-100 dark:bg-bark-900 text-bark-600 dark:text-bark-400 border border-bark-200 dark:border-bark-800">
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="https://arxiv.org/abs/1905.11946" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-4">
                <ExternalLink size={13} /> EfficientNet Paper (arXiv)
              </a>
              <a href="https://www.kaggle.com/datasets/nguyenchitinh/plantdisease-with-20-plant" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-4">
                <ExternalLink size={13} /> Kaggle Dataset
              </a>
            </div>
          </div>

          {/* Paper sections */}
          <SectionHeading tag="Full Paper" title="Paper" titleAccent="Sections" />
          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-glass p-6"
              >
                <h2 className="font-display font-bold text-xl mb-4 text-forest-700 dark:text-forest-400">
                  {s.heading}
                </h2>
                <div className="space-y-3">
                  {s.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-[var(--text-secondary)]">{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* References */}
          <div className="mt-10 card-glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-forest-500" />
              <h2 className="font-display font-bold text-lg">Key References</h2>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {[
                'Tan, M. & Le, Q.V. — EfficientNet: Rethinking Model Scaling for CNNs. ICML 2019.',
                'Hughes, D.P. & Salathé, M. — PlantVillage: Open access repository for plant disease diagnostics.',
                'Mohanty, S.P. et al. — Using deep learning for image-based plant disease detection. Frontiers in Plant Science, 2016.',
                'Atila, Ü. et al. — Plant leaf disease classification using EfficientNet. Ecological Informatics, 2021.',
                'Hu, J., Shen, L. & Sun, G. — Squeeze-and-Excitation Networks. CVPR 2018.',
                'Yosinski, J. et al. — How transferable are features in deep neural networks? NeurIPS 2014.',
                'FAO — The State of Food and Agriculture 2021. Rome, Italy.',
              ].map((ref, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-forest-500 shrink-0 mt-0.5">[{i + 1}]</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

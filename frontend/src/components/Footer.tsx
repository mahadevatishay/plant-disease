import { Link } from 'react-router-dom'
import { Github, Leaf, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-forest-700 rounded-lg flex items-center justify-center">
                <Leaf size={14} className="text-white" />
              </div>
              <span className="font-display font-bold text-base">LeafScan AI</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              EfficientNet-B4 powered plant disease detection. 95.9% accuracy across 22 crops and 38 disease classes.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-[var(--text-secondary)]">
              <MapPin size={13} />
              <span>Gurugram, Haryana, India</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-secondary)]">
              <Mail size={13} />
              <a href="mailto:atishay@leafscan.ai" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
                atishay@leafscan.ai
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3 uppercase tracking-widest text-[var(--text-secondary)]">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Live Demo', to: '/demo' },
                { label: 'About Project', to: '/about' },
                { label: 'Research Paper', to: '/blog' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[var(--text-secondary)] hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3 uppercase tracking-widest text-[var(--text-secondary)]">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'GitHub Repository', href: 'https://github.com/tinh2044/PlantDisease_classification' },
                { label: 'Kaggle Dataset', href: 'https://www.kaggle.com/datasets/nguyenchitinh/plantdisease-with-20-plant' },
                { label: 'EfficientNet Paper', href: 'https://arxiv.org/abs/1905.11946' },
                { label: 'API Docs (FastAPI)', href: 'http://127.0.0.1:5000/docs' },
              ].map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-forest-600 dark:hover:text-forest-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            © 2024 LeafScan AI · Built by Atishay Jain · Gurugram
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tinh2044/PlantDisease_classification"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-secondary)] hover:text-forest-600 dark:hover:text-forest-400 transition-colors"
            >
              <Github size={18} />
            </a>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              v1.0 · EfficientNet-B4 · TFLite
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

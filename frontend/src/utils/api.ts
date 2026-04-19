import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export interface PredictionResult {
  disease: string
  confidence: number
  cause: string
  symptoms: string[]
  treatment: string[]
  alternatives?: Array<{ disease: string; confidence: number }>
  plant_type?: string
  is_healthy?: boolean
}

export async function predictDisease(file: File): Promise<PredictionResult> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post(`${BASE_URL}/predict`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  })

  return response.data
}

// Mock fallback for demo (when backend is offline)
export function getMockPrediction(filename: string): PredictionResult {
  const mockDiseases = [
    {
      disease: 'Tomato Late Blight',
      plant_type: 'Tomato',
      confidence: 0.956,
      cause: 'Phytophthora infestans (water mold)',
      symptoms: [
        'Dark, water-soaked lesions on leaves',
        'White mold on the underside of leaves in humid conditions',
        'Brown-to-black lesions on stems',
        'Rapid collapse of affected tissue',
      ],
      treatment: [
        'Apply copper-based fungicides (e.g., Bordeaux mixture)',
        'Remove and destroy infected plant parts immediately',
        'Improve air circulation by pruning',
        'Avoid overhead irrigation; water at the base',
        'Plant resistant varieties in future seasons',
      ],
      alternatives: [
        { disease: 'Tomato Early Blight', confidence: 0.031 },
        { disease: 'Tomato Leaf Mold', confidence: 0.008 },
      ],
      is_healthy: false,
    },
    {
      disease: 'Apple Cedar Rust',
      plant_type: 'Apple',
      confidence: 0.923,
      cause: 'Gymnosporangium juniperi-virginianae (fungal pathogen)',
      symptoms: [
        'Bright orange-yellow spots on upper leaf surface',
        'Tube-like spore structures on leaf undersides',
        'Premature defoliation in severe cases',
        'Reduced fruit quality and yield',
      ],
      treatment: [
        'Apply myclobutanil or trifloxystrobin fungicides early',
        'Remove nearby juniper hosts if possible',
        'Plant rust-resistant apple varieties',
        'Prune and destroy infected tissue',
      ],
      alternatives: [
        { disease: 'Apple Scab', confidence: 0.052 },
        { disease: 'Apple Black Rot', confidence: 0.015 },
      ],
      is_healthy: false,
    },
    {
      disease: 'Healthy Leaf',
      plant_type: 'Bell Pepper',
      confidence: 0.991,
      cause: 'No pathogen detected',
      symptoms: ['No visible symptoms of disease', 'Normal leaf coloration and texture'],
      treatment: ['Continue regular monitoring', 'Maintain good agricultural practices'],
      alternatives: [
        { disease: 'Bell Pepper Bacterial Spot', confidence: 0.006 },
        { disease: 'Nutrient Deficiency', confidence: 0.003 },
      ],
      is_healthy: true,
    },
  ]

  const idx = filename.length % mockDiseases.length
  return mockDiseases[idx]
}

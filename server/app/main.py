from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
import io
import random

app = FastAPI(
    title="LeafScan AI — Plant Disease API",
    description="EfficientNet-B4 plant disease classification API",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://plant-disease-9m2k.vercel.app",
    "https://*.vercel.app",
],   # tighten this after you get your Vercel URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Disease knowledge base ────────────────────────────────────────────────────
DISEASE_INFO = {
    "Tomato Late Blight": {
        "plant_type": "Tomato",
        "cause": "Phytophthora infestans (water mold / oomycete)",
        "symptoms": [
            "Dark water-soaked lesions on leaves and stems",
            "White mold growth on the underside of leaves in humid conditions",
            "Brown-to-black lesions that spread rapidly",
            "Infected fruit shows greasy brown patches",
        ],
        "treatment": [
            "Apply copper-based fungicides (e.g., Bordeaux mixture) immediately",
            "Remove and destroy all infected plant parts",
            "Improve air circulation by pruning dense foliage",
            "Avoid overhead irrigation — water at the base only",
            "Plant resistant varieties (e.g., Legend, Defiant) in future seasons",
        ],
        "is_healthy": False,
    },
    "Tomato Early Blight": {
        "plant_type": "Tomato",
        "cause": "Alternaria solani (fungal pathogen)",
        "symptoms": [
            "Dark concentric ring lesions forming a target-spot pattern",
            "Yellow halo surrounding brown lesions",
            "Lesions start on older lower leaves, moving upward",
            "Premature defoliation in severe cases",
        ],
        "treatment": [
            "Apply chlorothalonil or mancozeb fungicide preventatively",
            "Remove infected lower leaves promptly",
            "Mulch around plants to prevent soil splash",
            "Rotate crops — avoid planting tomatoes in the same spot each year",
        ],
        "is_healthy": False,
    },
    "Apple Cedar Rust": {
        "plant_type": "Apple",
        "cause": "Gymnosporangium juniperi-virginianae (fungal pathogen)",
        "symptoms": [
            "Bright orange-yellow circular spots on the upper leaf surface",
            "Tube-like spore structures (aecia) on the underside of leaves",
            "Spots enlarge with orange pustules in wet weather",
            "Premature defoliation and reduced fruit quality",
        ],
        "treatment": [
            "Apply myclobutanil or trifloxystrobin fungicide early in spring",
            "Remove nearby juniper or cedar hosts if feasible",
            "Plant rust-resistant apple varieties",
            "Prune and destroy all infected tissue in autumn",
        ],
        "is_healthy": False,
    },
    "Apple Black Rot": {
        "plant_type": "Apple",
        "cause": "Botryosphaeria obtusa (fungal pathogen)",
        "symptoms": [
            "Purple spots on leaves that enlarge to form 'frogeye' lesions",
            "Rotten fruit with concentric rings of black pycnidia",
            "Cankers on branches with red-brown discoloration",
            "Shriveled mummified fruit remaining on the tree",
        ],
        "treatment": [
            "Remove mummified fruits and dead wood immediately",
            "Apply captan or thiophanate-methyl fungicide",
            "Prune during dry weather and seal wounds",
            "Maintain tree vigour through balanced fertilisation",
        ],
        "is_healthy": False,
    },
    "Corn Northern Leaf Blight": {
        "plant_type": "Corn (Maize)",
        "cause": "Exserohilum turcicum (fungal pathogen)",
        "symptoms": [
            "Long elliptical tan or grey-green lesions (2.5–15 cm)",
            "Lesions parallel to the leaf margin with wavy edges",
            "Dark sporulation visible in lesion centres in humid weather",
            "Severe infection causes premature plant death",
        ],
        "treatment": [
            "Apply foliar fungicides at early tassel stage",
            "Plant resistant hybrids with Ht resistance genes",
            "Rotate with non-host crops (soybeans, wheat)",
            "Bury or shred infected crop residue after harvest",
        ],
        "is_healthy": False,
    },
    "Grape Black Rot": {
        "plant_type": "Grape",
        "cause": "Guignardia bidwellii (fungal pathogen)",
        "symptoms": [
            "Small reddish-brown circular spots on leaves",
            "Tan lesion centres with tiny black pycnidia dots",
            "Infected berries turn brown, shrivel and mummify",
            "Severe defoliation in warm, wet seasons",
        ],
        "treatment": [
            "Apply mancozeb or myclobutanil from budbreak through veraison",
            "Remove and destroy all mummified berries and infected canes",
            "Train vines for maximum air circulation",
            "Apply dormant sprays of liquid lime sulfur",
        ],
        "is_healthy": False,
    },
    "Potato Early Blight": {
        "plant_type": "Potato",
        "cause": "Alternaria solani (fungal pathogen)",
        "symptoms": [
            "Dark brown concentric target-spot lesions on older leaves",
            "Yellow chlorotic halo around each lesion",
            "Lesions coalesce causing leaf death",
            "Shallow dark sunken lesions on tuber surface",
        ],
        "treatment": [
            "Apply chlorothalonil preventatively before symptoms appear",
            "Destroy all volunteer potato plants",
            "Use certified disease-free seed potatoes",
            "Maintain adequate soil fertility — stressed plants are more susceptible",
        ],
        "is_healthy": False,
    },
    "Potato Late Blight": {
        "plant_type": "Potato",
        "cause": "Phytophthora infestans (water mold / oomycete)",
        "symptoms": [
            "Water-soaked pale green lesions on leaves turning brown-black",
            "White sporulation on leaf undersides in moist conditions",
            "Brown rot extends through the entire tuber",
            "Characteristic musty odour from infected tissue",
        ],
        "treatment": [
            "Apply metalaxyl-M or mandipropamid fungicide preventatively",
            "Hill up soil around plants to protect tubers",
            "Destroy all infected plant material — do not compost",
            "Harvest on dry days and store in cool, ventilated conditions",
        ],
        "is_healthy": False,
    },
    "Bell Pepper Bacterial Spot": {
        "plant_type": "Bell Pepper",
        "cause": "Xanthomonas campestris pv. vesicatoria (bacterial pathogen)",
        "symptoms": [
            "Small water-soaked spots that turn brown with yellow halo",
            "Spots have angular shape, limited by leaf veins",
            "Raised scab-like lesions on fruit surface",
            "Severe defoliation exposing fruit to sunscald",
        ],
        "treatment": [
            "Apply copper-based bactericides at first sign of disease",
            "Avoid working in the field when plants are wet",
            "Use disease-free certified transplants",
            "Remove and destroy all infected plant debris after harvest",
        ],
        "is_healthy": False,
    },
    "Strawberry Leaf Scorch": {
        "plant_type": "Strawberry",
        "cause": "Diplocarpon earlianum (fungal pathogen)",
        "symptoms": [
            "Numerous small irregular purple-red spots on upper leaf surface",
            "Spots have gray-white centres giving a 'scorched' appearance",
            "Severe infections cause entire leaf to turn reddish-purple",
            "Premature leaf death reduces fruit yield",
        ],
        "treatment": [
            "Apply myclobutanil or captan fungicide in early spring",
            "Remove and destroy infected leaves during renovation",
            "Plant resistant varieties where available",
            "Ensure adequate plant spacing for air circulation",
        ],
        "is_healthy": False,
    },
    "Healthy": {
        "plant_type": "Unknown",
        "cause": "No pathogen detected",
        "symptoms": [
            "No visible disease symptoms present",
            "Normal leaf coloration and texture",
            "No lesions, spots, or abnormal growth",
        ],
        "treatment": [
            "Continue regular crop monitoring",
            "Maintain good agricultural practices",
            "Ensure balanced fertilisation and irrigation",
        ],
        "is_healthy": True,
    },
}

# ── Try to load TFLite model ───────────────────────────────────────────────────
MODEL = None
CLASS_NAMES = list(DISEASE_INFO.keys())

def load_model():
    global MODEL
    model_path = os.path.join(os.path.dirname(__file__), "..", "ModelLight", "EfficientNetB4.tflite")
    if os.path.exists(model_path):
        try:
            import tensorflow as tf
            interpreter = tf.lite.Interpreter(model_path=model_path)
            interpreter.allocate_tensors()
            MODEL = interpreter
            print(f"✅ TFLite model loaded from {model_path}")
        except Exception as e:
            print(f"⚠️  Could not load TFLite model: {e}. Using demo mode.")
    else:
        print("⚠️  No TFLite model found in ModelLight/. Running in demo mode.")

load_model()


def predict_with_model(image_bytes: bytes) -> dict:
    """Run real TFLite inference."""
    import numpy as np
    from PIL import Image

    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((380, 380))
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    input_details = MODEL.get_input_details()
    output_details = MODEL.get_output_details()
    MODEL.set_tensor(input_details[0]['index'], img_array)
    MODEL.invoke()
    predictions = MODEL.get_tensor(output_details[0]['index'])[0]

    top_idx = int(np.argmax(predictions))
    confidence = float(predictions[top_idx])
    disease_name = CLASS_NAMES[top_idx] if top_idx < len(CLASS_NAMES) else "Unknown"

    # Top 3 alternatives
    sorted_idx = np.argsort(predictions)[::-1]
    alternatives = [
        {"disease": CLASS_NAMES[i], "confidence": round(float(predictions[i]), 4)}
        for i in sorted_idx[1:4] if i < len(CLASS_NAMES)
    ]

    return disease_name, round(confidence, 4), alternatives


def predict_demo(filename: str) -> tuple:
    """Realistic demo predictions when no model is available."""
    demo_cases = [
        ("Tomato Late Blight",       0.956, [("Tomato Early Blight", 0.031), ("Potato Late Blight", 0.008)]),
        ("Apple Cedar Rust",         0.923, [("Apple Black Rot", 0.052),      ("Healthy", 0.015)]),
        ("Corn Northern Leaf Blight",0.941, [("Healthy", 0.038),              ("Grape Black Rot", 0.011)]),
        ("Potato Early Blight",      0.934, [("Tomato Early Blight", 0.041),  ("Healthy", 0.014)]),
        ("Healthy",                  0.991, [("Bell Pepper Bacterial Spot", 0.006), ("Tomato Late Blight", 0.003)]),
        ("Bell Pepper Bacterial Spot",0.918,[("Healthy", 0.055),              ("Tomato Early Blight", 0.017)]),
        ("Grape Black Rot",          0.947, [("Strawberry Leaf Scorch", 0.031),("Healthy", 0.012)]),
        ("Strawberry Leaf Scorch",   0.929, [("Grape Black Rot", 0.044),      ("Apple Black Rot", 0.017)]),
    ]
    idx = sum(ord(c) for c in filename) % len(demo_cases)
    disease, conf, alts = demo_cases[idx]
    alternatives = [{"disease": d, "confidence": c} for d, c in alts]
    return disease, conf, alternatives


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "status": "ok",
        "model": "EfficientNet-B4",
        "mode": "inference" if MODEL else "demo",
        "classes": len(CLASS_NAMES),
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": MODEL is not None}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image (JPEG, PNG, WEBP)")

    contents = await file.read()
    if len(contents) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 15MB.")

    try:
        if MODEL:
            disease_name, confidence, alternatives = predict_with_model(contents)
        else:
            disease_name, confidence, alternatives = predict_demo(file.filename or "leaf.jpg")

        info = DISEASE_INFO.get(disease_name, DISEASE_INFO["Healthy"])

        return {
            "disease":      disease_name,
            "confidence":   confidence,
            "plant_type":   info["plant_type"],
            "is_healthy":   info["is_healthy"],
            "cause":        info["cause"],
            "symptoms":     info["symptoms"],
            "treatment":    info["treatment"],
            "alternatives": alternatives,
            "model_mode":   "inference" if MODEL else "demo",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)

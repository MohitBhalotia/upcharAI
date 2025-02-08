import os
import uuid
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = load_model("./model.h5", compile=False)
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
print("Model Loaded Successfully!")  # Debugging line

# Allowed formats
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}

# Disease classes
classes = [
    "Actinic Keratoses",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Melanocytic Nevi",
    "Vascular naevus"
]

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Image Preprocessing Function
def preprocess_image(image) -> np.ndarray:
    img = load_img(image, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Reshape to (1, 224, 224, 3)
    img_array = img_array.astype("float32") / 255.0  # Normalize
    print(f"Processed Image Shape: {img_array.shape}")
    return img_array

# Prediction Function
def predict(image_path: str) -> dict:
    try:
        img_array = preprocess_image(image_path)
        result = model.predict(img_array)[0]

        print(f"Model Raw Output: {result}")  # Debugging line

        if len(result) != len(classes):
            return {"error": f"Model output length mismatch: Expected {len(classes)}, Got {len(result)}"}

        max_index = np.argmax(result)
        disease = classes[max_index]
        confidence = round(float(result[max_index]) * 100, 2)

        return {"disease": disease, "confidence": confidence}
    except Exception as e:
        return {"error": f"Prediction error: {str(e)}"}

# API Endpoint for Image Prediction
@app.post("/predict-via-image")
async def predict_image(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        return JSONResponse(content={"error": "Only jpg, jpeg, and png files are allowed."}, status_code=400)

    target_dir = os.path.join(os.getcwd(), "static/images")
    os.makedirs(target_dir, exist_ok=True)

    file_ext = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_ext}"
    img_path = os.path.join(target_dir, unique_filename)

    try:
        with open(img_path, "wb") as buffer:
            buffer.write(file.file.read())

        prediction = predict(img_path)
        print(prediction)

        return JSONResponse(content={"prediction": f"{prediction['disease']} with {prediction['confidence']}% confidence"})
    except Exception as e:
        return JSONResponse(content={"error": f"Internal Server Error: {str(e)}"}, status_code=500)

# Run FastAPI Server
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=6000)

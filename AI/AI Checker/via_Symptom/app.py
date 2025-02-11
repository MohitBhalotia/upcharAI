from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from neo4j import GraphDatabase
from groq import Groq
import os
import json  # ✅ Importing json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Neo4j connection
uri = os.getenv("NEO4J_URI")
user = "neo4j"
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(uri, auth=(user, password))

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_SYMPTOM"))

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for symptom input
class SymptomsRequest(BaseModel):
    symptoms: list[str]

def query_database(query, parameters=None):
    with driver.session() as session:
        result = session.run(query, parameters)
        return result.data()

def find_diseases_by_symptoms(symptoms_list):
    query = """
    MATCH (condition:Condition)-[:HAS_SYMPTOM]->(symptom:Symptom)
    WHERE symptom.name IN $symptoms
    WITH condition, COUNT(DISTINCT symptom) AS symptom_count
    WHERE symptom_count = SIZE($symptoms)
    RETURN condition.name AS DiseaseName;
    """
    parameters = {"symptoms": symptoms_list}
    result = query_database(query, parameters)
    return [d["DiseaseName"] for d in result]

def get_disease_details(disease_name):
    query = """
    MATCH (condition:Condition {name: $disease_name})
    OPTIONAL MATCH (condition)-[:MANAGED_BY]->(doctor:Management)
    OPTIONAL MATCH (condition)-[:TREATED_WITH]->(treatment:Treatment)
    OPTIONAL MATCH (condition)-[:REQUIRES_TEST]->(test:Test)
    OPTIONAL MATCH (condition)-[:BELONGS_TO]->(category:Department)
    RETURN 
        condition.name AS DiseaseName,
        COLLECT(DISTINCT doctor.name) AS ManagedBy,
        COLLECT(DISTINCT treatment.name) AS TreatedWith,
        COLLECT(DISTINCT test.name) AS RequiresTest,
        COLLECT(DISTINCT category.name) AS BelongsTo;
    """
    parameters = {"disease_name": disease_name}
    result = query_database(query, parameters)
    return result[0] if result else None

@app.post("/predict-via-symptoms")
def predict_disease(request: SymptomsRequest):
    disease_names = find_diseases_by_symptoms(request.symptoms)
    
    if not disease_names:
        raise HTTPException(status_code=404, detail="No diseases found matching all given symptoms.")
    
    diseases_info = []
    for disease in disease_names:
        disease_info = get_disease_details(disease)
        if disease_info:
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": (
                            "Provide a concise, structured response in bullet points with the following details:\n"
                            f"- *Disease:* {disease_info['DiseaseName']}\n"
                            f"- *Home Remedies:* {', '.join(disease_info['ManagedBy'])}\n"
                            f"- *Treated With:* {', '.join(disease_info['TreatedWith'])}\n"
                            f"- *Requires Test:* {', '.join(disease_info['RequiresTest'])}\n"
                            f"- *Comes Under:* {', '.join(disease_info['BelongsTo'])}\n\n"
                            "End the response with:\n\nSincerely,\nUpcharAI"
                        )
                    }
                ],
                model="llama-3.3-70b-versatile",
            )
            response_text = chat_completion.choices[0].message.content
            
            diseases_info.append({
                "disease": disease_info["DiseaseName"],
                "formatted_response": response_text
            })
    
    return Response(content=json.dumps(diseases_info), media_type="application/json")

# Run FastAPI on port 8008
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8008)

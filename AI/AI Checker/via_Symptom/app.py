from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from neo4j import GraphDatabase
from groq import Groq
import os
import json
from dotenv import load_dotenv

# Load environment variables and get variables
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

# Helper function to query the Neo4j database
def query_database(query, parameters=None):
    with driver.session() as session:
        result = session.run(query, parameters)
        return result.data()

# Find diseases that match given symptoms
def find_diseases_by_symptoms(symptoms_list):
    query = """
    MATCH (condition:Condition)-[:HAS_SYMPTOM]->(symptom:Symptom)
    WHERE symptom.name IN $symptoms
    WITH condition, COUNT(DISTINCT symptom) AS matched_symptoms
    RETURN condition.name AS DiseaseName
    ORDER BY matched_symptoms DESC
    LIMIT 3;
    """
    parameters = {"symptoms": symptoms_list}
    result = query_database(query, parameters)
    
    return [d["DiseaseName"] for d in result]

# Get details for a specific disease
def get_disease_details(disease_name):
    query = """
    MATCH (condition:Condition {name: $disease_name})
    OPTIONAL MATCH (condition)-[:MANAGED_BY]->(doctor:Management)
    OPTIONAL MATCH (condition)-[:TREATED_WITH]->(treatment:Treatment)
    OPTIONAL MATCH (condition)-[:REQUIRES_TEST]->(test:Test)
    OPTIONAL MATCH (condition)-[:BELONGS_TO]->(category:Department)
    OPTIONAL MATCH (condition)-[:HAS_SYMPTOM]->(symptom:Symptom)
    RETURN 
        condition.name AS DiseaseName,
        COLLECT(DISTINCT doctor.name) AS ManagedBy,
        COLLECT(DISTINCT treatment.name) AS TreatedWith,
        COLLECT(DISTINCT test.name) AS RequiresTest,
        COLLECT(DISTINCT category.name) AS BelongsTo,
        COLLECT(DISTINCT symptom.name) AS Symptom;
    """
    parameters = {"disease_name": disease_name}
    result = query_database(query, parameters)
    
    return result[0] if result else None

@app.post("/predict-via-symptoms")
def predict_disease(request: SymptomsRequest):
    disease_names = find_diseases_by_symptoms(request.symptoms)
    
    if not disease_names:
        raise HTTPException(status_code=404, detail="No diseases found matching all given symptoms.")
    
    final_output = []

    for disease in disease_names:
        disease_info = get_disease_details(disease)
        if disease_info:
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": (
                            "Provide a concise, structured response in bullet points with the following details:\n\n"
<<<<<<< HEAD
                            f"* Disease: {disease_info['DiseaseName']}\n"
                            f"* Home Remedies:\n" + 
                            "".join([f"  * {remedy}\n" for remedy in disease_info['ManagedBy']]) + 
                            f"* Treated With:\n" + 
                            "".join([f"  * {treatment}\n" for treatment in disease_info['TreatedWith']]) + 
                            f"* Requires Test:\n" + 
                            "".join([f"  * {test}\n" for test in disease_info['RequiresTest']]) + 
                            f"* Comes Under: {', '.join(disease_info['BelongsTo'])}\n\n"
                            "Sincerely,\nUpcharAI"
=======
                            f"*Disease:* {disease_info['DiseaseName']}\n\n"
                            f"*Home Remedies:*\n\n" + 
                            "".join([f"- {remedy}\n\n" for remedy in disease_info['ManagedBy']]) + "\n"
                            f"*Treated With:*\n\n" + 
                            "".join([f"- {treatment}\n\n" for treatment in disease_info['TreatedWith']]) + "\n"
                            f"*Requires Test:*\n\n" + 
                            "".join([f"- {test}\n\n" for test in disease_info['RequiresTest']]) + "\n"
                            f"*Comes Under:* {', '.join(disease_info['BelongsTo'])}\n\n"
                            "---\n\n*Sincerely,\n\nUpcharAI*"
>>>>>>> c341245224ec9e1ee41588116290d5a597f5b761
                        )
                    }
                ],
                model="llama-3.3-70b-versatile",
            )
<<<<<<< HEAD
            output = chat_completion.choices[0].message.content
            
            # Ensure correct dictionary structure
            disease_detail = {
                disease_info['DiseaseName']: output,
                "Category": disease_info['BelongsTo']
            }
            
            final_output.append(disease_detail)
=======
            response_text = chat_completion.choices[0].message.content
            diseases_info.append({
                "disease": disease_info["DiseaseName"],
                "formatted_response": response_text
            })
>>>>>>> c341245224ec9e1ee41588116290d5a597f5b761
    
    return Response(content=json.dumps(final_output), media_type="application/json")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost",port=8008)

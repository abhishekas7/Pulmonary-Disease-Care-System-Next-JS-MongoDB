import spacy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import med7

nlp = spacy.load("en_core_web_sm")
med7 = med7.load_model()

app = FastAPI()


class Payload(BaseModel):
    payload: str


class Prescription(BaseModel):
    name: str
    medication: str
    dosage: str
    duration: str


def extract_prescription(payload):
    doc = nlp(payload)
    name = ""
    medication = ""
    dosage = ""
    duration = ""

    # Extract name using SpaCy NER
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            break

    # Extract medication, dosage, and duration using Med7 BioNER model
    entities = med7.predict(payload)
    for entity in entities:
        if entity['category'] == 'Drug':
            medication = entity['word']
            dosage = entity['dosage']
            duration = entity['duration']
            break

    prescription = Prescription(name=name, medication=medication, dosage=dosage, duration=duration)
    return prescription


@app.post('/data')
async def process_data(payload: Payload):
    # extract prescription from payload
    prescription = extract_prescription(payload.payload)
    print(prescription)
    return {"prescription": prescription}


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

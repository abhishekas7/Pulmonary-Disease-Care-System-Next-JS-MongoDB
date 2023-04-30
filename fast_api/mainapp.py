from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch
import spacy

app = FastAPI()

# allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/data")
async def classify_entities(request: Request):
    request_body = await request.json()
    print(request_body)
    # text = request_body.get("text")

    nlp = spacy.load("en_core_med7_lg")
    # print(nlp)
    # tokenizer = AutoTokenizer.from_pretrained("emilyalsentzer/Bio_ClinicalBERT")
    # model = AutoModelForTokenClassification.from_pretrained("emilyalsentzer/Bio_ClinicalBERT")
    # doc = nlp(text)
    # tokens = tokenizer.tokenize(text)
    # token_ids = tokenizer.convert_tokens_to_ids(tokens)
    # token_tensor = torch.tensor([token_ids])
    # outputs = model(token_tensor)[0]
    # predictions = torch.argmax(outputs, axis=2)
    # entities = []
    # for i, token in enumerate(doc):
    #     label = predictions[0][i].item()
    #     if label != 0:
    #         entities.append({
    #             "text": token.text,
    #             "start": token.idx,
    #             "end": token.idx + len(token.text),
    #             "label": nlp.vocab.strings[label]
    #         })
    # return JSONResponse({"entities": entities})
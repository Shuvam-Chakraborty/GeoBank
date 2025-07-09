from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "api_outputs")

def load_json(file_name):
    with open(os.path.join(MODEL_DIR, file_name), "r") as f:
        return json.load(f)

@app.get("/classification_results")
def get_classification():
    return JSONResponse(content=load_json("classification_results.json"))

@app.get("/regression_results")
def get_regression():
    return JSONResponse(content=load_json("regression_results.json"))

@app.get("/anomaly_summary")
def get_anomaly():
    return JSONResponse(content=load_json("anomaly_summary.json"))

@app.get("/lime_explanations")
def get_lime():
    return JSONResponse(content=load_json("lime_explanations_summary.json"))

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega chave da API do .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Lista os modelos disponíveis
print("📦 Modelos disponíveis para sua chave:")
for model in genai.list_models():
    print("-", model.name)

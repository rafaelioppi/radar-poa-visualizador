import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image
import numpy as np

# 🔐 Carrega chave da API do .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 📥 Baixa a imagem do radar
url = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_1.png"
with open("radar_poa_1.png", "wb") as f:
    f.write(requests.get(url).content)

# 🧠 Função de fallback local baseada em cores
def gerar_previsao_por_cor(r, g, b):
    if r > 150 and g < 100 and b < 100:
        return "🌩️ Chuva intensa ou tempestade detectada. Evite áreas abertas."
    elif g > 150 and r < 100:
        return "🌦️ Chuva leve predominante. Tempo instável."
    elif r > 100 and g > 100:
        return "🌧️ Chuva moderada se espalhando pela região."
    else:
        return "☁️ Sem atividade significativa detectada."

# 🔄 Função principal reutilizável
def gerar_previsao():
    try:
        model = genai.GenerativeModel("models/gemini-2.5-flash-image")

        response = model.generate_content([
            "Analise esta imagem de radar meteorológico e gere uma previsão do tempo para Porto Alegre.",
            {
                "mime_type": "image/png",
                "data": open("radar_poa_1.png", "rb").read()
            }
        ])

        return response.text

    except Exception as e:
        print("⚠️ Falha ao usar IA. Usando fallback local.")
        print("🔧 Erro:", str(e))

        # 🖼️ Análise local da imagem
        img = Image.open("radar_poa_1.png").convert("RGB")
        pixels = np.array(img).reshape(-1, 3)
        r, g, b = np.mean(pixels, axis=0).astype(int)

        return gerar_previsao_por_cor(r, g, b)

# 🧪 Execução direta (para testes locais)
if __name__ == "__main__":
    print("✅ Previsão gerada:")
    print(gerar_previsao())

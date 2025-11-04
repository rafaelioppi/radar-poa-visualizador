import requests
import base64

# Configurações
API_KEY = "SUA_CHAVE_DE_API"
IMAGE_URL = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_1.png"
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent"

# Baixa e codifica a imagem
response = requests.get(IMAGE_URL)
image_base64 = base64.b64encode(response.content).decode("utf-8")

# Monta o payload
payload = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Analise esta imagem de radar meteorológico e gere uma previsão do tempo para Porto Alegre."
                },
                {
                    "inline_data": {
                        "mime_type": "image/png",
                        "data": image_base64
                    }
                }
            ]
        }
    ]
}

# Envia para Gemini Vision
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

res = requests.post(ENDPOINT, headers=headers, json=payload)

# Exibe a previsão gerada
print(res.json()["candidates"][0]["content"]["parts"][0]["text"])

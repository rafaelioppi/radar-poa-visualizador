import requests

url = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_1.png"
with open("radar_poa_1.png", "wb") as f:
    f.write(requests.get(url).content)

print("✅ Imagem salva como radar_poa_1.png")

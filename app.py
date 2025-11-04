from flask import Flask, jsonify, send_from_directory
from gemini_previsao import gerar_previsao
from flask import Flask, jsonify, send_from_directory, request

import os
import requests

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

@app.route("/previsao")
def previsao():
    index = request.args.get("index", default=1, type=int)
    texto = gerar_previsao(index)
    return jsonify({"previsao": texto})

@app.route("/radar/<int:index>")
def radar(index):
    url = f"https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_{index}.png"
    local_path = f"data/radar_poa_{index}.png"

    try:
        with open(local_path, "wb") as f:
            f.write(requests.get(url).content)
        return send_from_directory("data", f"radar_poa_{index}.png")
    except Exception as e:
        return f"Erro ao baixar imagem: {str(e)}", 500

# ✅ Inicia o servidor
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

from flask import Flask, jsonify, send_from_directory
from gemini_previsao import gerar_previsao
import os

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/previsao")
def previsao():
    texto = gerar_previsao()
    return jsonify({"previsao": texto})

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

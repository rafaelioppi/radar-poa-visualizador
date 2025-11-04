#!/bin/bash

echo "🚀 Iniciando Radar POA Visualizador..."

# Atualiza pip e instala dependências
pip install --upgrade pip
pip install -r requirements.txt
pip install torch==2.7.1+cpu -f https://download.pytorch.org/whl/torch_stable.html

# Carrega variáveis do .env (se existir)
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
  echo "✅ Variáveis de ambiente carregadas."
fi

# Executa o servidor Flask
python app.py

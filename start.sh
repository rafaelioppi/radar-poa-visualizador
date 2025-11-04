#!/bin/bash

echo "🚀 Iniciando Radar POA Visualizador..."

# Ativa ambiente virtual se existir
if [ -d "venv" ]; then
  source venv/bin/activate
  echo "✅ Ambiente virtual ativado."
else
  echo "⚠️ Nenhum ambiente virtual encontrado. Rodando com Python global."
fi

# Carrega variáveis do .env
export $(grep -v '^#' .env | xargs)

# Verifica se app.py existe
if [ ! -f "app.py" ]; then
  echo "❌ Arquivo app.py não encontrado. Abortando."
  exit 1
fi

# Executa o servidor Flask
python app.py

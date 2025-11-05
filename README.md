#🌦️ Radar POA Interativo
Radar POA Interativo é uma aplicação web que permite visualizar imagens de radar meteorológico da região de Porto Alegre de forma dinâmica e intuitiva. Ideal para acompanhar a evolução das condições climáticas ao longo do tempo.

🔗 Acesso ao Projeto
O projeto está disponível online via Render: 👉 radar-poa-visualizador.onrender.com

📸 Funcionalidades
Exibição sequencial de 24 imagens de radar

Controles de navegação: anterior, próximo, play e pause

Zoom interativo para análise detalhada

Barra de progresso com marcações por frame

Atualização automática das imagens com cache busting

🧠 Tecnologias Utilizadas
HTML5 – estrutura da página

CSS3 – estilização responsiva

JavaScript (Vanilla) – lógica de navegação e interatividade

Python 3 – backend e automações

🚀 Execução Local
Para rodar o projeto localmente:

bash
# Clone o repositório
git clone https://github.com/rafaelioppi/radar-poa.git

# Acesse a pasta do projeto
cd radar-poa

# Execute no terminal: bash start.sh

🗂 Estrutura do Projeto
Código
radar-poa-visualizador/
├── index.html           # Página principal
├── style.css            # Estilos visuais
├── script.js            # Navegação e zoom
├── app.py               # Servidor backend em Python
├── baixar_imagem.py     # Download automático das imagens
├── gemini_previsao.py   # Integração com modelo de previsão
├── start.sh             # Script de inicialização
├── requirements.txt     # Dependências Python
├── render.yaml          # Configuração de deploy
├── package.json         # Configuração Node.js
📡 Fonte das Imagens
As imagens de radar são carregadas diretamente do servidor da Climatempo:

Código
https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_{index}.png
📌 Observações
Este projeto tem fins educacionais e demonstrativos. As imagens utilizadas são públicas, mas qualquer uso comercial deve respeitar os termos da fonte original.

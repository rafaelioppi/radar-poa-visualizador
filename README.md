# 🌦️ Radar POA Interativo

**Radar POA Interativo** é uma aplicação web que permite visualizar imagens de radar meteorológico da região de **Porto Alegre** de forma dinâmica e intuitiva. Ideal para acompanhar a evolução das condições climáticas ao longo do tempo.

---

## 🔗 Acesso ao Projeto

👉 [radar-poa-visualizador.onrender.com](https://radar-poa-visualizador.onrender.com)

---

## 📸 Funcionalidades

- Exibição sequencial de **24 imagens de radar**
- Controles de navegação: **anterior**, **próximo**, **play**, **pause**
- **Zoom interativo** para análise detalhada
- **Barra de progresso** com marcações por frame
- **Atualização automática** das imagens com cache busting

---

## 🧠 Tecnologias Utilizadas

- **HTML5** – estrutura da página  
- **CSS3** – estilização responsiva  
- **JavaScript (Vanilla)** – interatividade e navegação  
- **Python 3** – backend e automações

---

## 🚀 Execução Local

```bash
# Clone o repositório
git clone https://github.com/rafaelioppi/radar-poa.git

# Acesse a pasta do projeto
cd radar-poa

# Execute o script de inicialização
bash start.sh
🗂 Estrutura do Projeto
Código
radar-poa-visualizador/
├── index.html           # Página principal da aplicação
├── style.css            # Estilos visuais responsivos
├── script.js            # Navegação e zoom nas imagens
├── app.py               # Backend em Python
├── baixar_imagem.py     # Download automático das imagens de radar
├── gemini_previsao.py   # Integração com modelo de previsão via Gemini
├── start.sh             # Script de inicialização do projeto
├── requirements.txt     # Lista de dependências Python
├── render.yaml          # Configuração para deploy no Render
├── package.json         # Configuração do ambiente Node.js
📡 Fonte das Imagens
As imagens de radar são carregadas diretamente do servidor da Climatempo:

📌 Observações
Este projeto tem fins educacionais e demonstrativos. As imagens utilizadas são públicas, mas qualquer uso comercial deve respeitar os termos da fonte original.

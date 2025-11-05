# 🌦️ Radar POA Interativo

Este é um projeto web que exibe imagens de radar meteorológico de Porto Alegre de forma interativa, permitindo visualizar a evolução das condições climáticas ao longo do tempo.

---

## 🔗 Acesso ao projeto

O projeto está hospedado no Render.  
Você pode acessá-lo diretamente aqui:  
**👉 [Radar POA Interativo](https://radar-poa-visualizador.onrender.com/)**

---

## 📸 Funcionalidades

- Visualização sequencial de 24 imagens de radar
- Controles de navegação: anterior, próximo, play, pause
- Zoom interativo na imagem
- Barra de progresso com marcações para cada frame
- Atualização automática da imagem com cache busting

---

## 🧠 Tecnologias utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript Vanilla**

---

## 🚀 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/radar-poa.git
Acesse a pasta do projeto:
bash
cd radar-poa
Abra o arquivo index.html em seu navegador.

📁 Estrutura do projeto
Código
radar-poa/
├── index.html        # Página principal
├── style.css         # Estilos visuais
└── script.js         # Lógica de navegação e zoom
📡 Fonte das imagens
As imagens de radar são carregadas diretamente do servidor da Climatempo:

Código
https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_{index}.png
📌 Observações
Este projeto é apenas para fins educacionais e demonstrativos. As imagens são públicas, mas o uso comercial deve respeitar os termos da fonte original.

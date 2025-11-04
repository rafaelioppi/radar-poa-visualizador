const totalImages = 24;
const baseUrl = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_";

let index = 1;
let interval = null;

const radarImage = document.getElementById("radarImage");
const progressBar = document.getElementById("progressBar");
const zoomRange = document.getElementById("zoomRange");
const previsaoTexto = document.getElementById("previsaoTexto");

// 🔍 Gera texto de previsão com base nas cores médias
function gerarPrevisaoPorCor(r, g, b) {
  let texto = "";
  let classe = "";

  if (r > 150 && g < 100 && b < 100) {
    texto = "🌩️ Chuva intensa ou tempestade detectada. Evite áreas abertas.";
    classe = "previsao-intensa";
  } else if (g > 150 && r < 100) {
    texto = "🌦️ Chuva leve predominante. Tempo instável.";
    classe = "previsao-leve";
  } else if (r > 100 && g > 100) {
    texto = "🌧️ Chuva moderada se espalhando pela região.";
    classe = "previsao-moderada";
  } else {
    texto = "☁️ Sem atividade significativa detectada.";
    classe = "previsao-leve";
  }

  previsaoTexto.textContent = texto;
  previsaoTexto.className = classe;
}

// 🖼️ Analisa a imagem atual do radar
function analisarImagemRadar() {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = radarImage.src;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let r = 0, g = 0, b = 0;
    const totalPixels = imageData.length / 4;

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    r = Math.round(r / totalPixels);
    g = Math.round(g / totalPixels);
    b = Math.round(b / totalPixels);

    gerarPrevisaoPorCor(r, g, b);
  };
}

// 🔄 Atualiza imagem do radar e analisa
function updateImage() {
  radarImage.src = `${baseUrl}${index}.png?nocache=${Date.now()}`;
  progressBar.value = index;

  radarImage.onload = () => {
    analisarImagemRadar();
  };
}

// ⏪ Imagem anterior
function next() {
  index = index > 1 ? index - 1 : totalImages;
  updateImage();
}

// ⏩ Próxima imagem
function prev() {
  index = index < totalImages ? index + 1 : 1;
  updateImage();
}

// ▶️ Inicia animação
function play() {
  if (!interval) {
    interval = setInterval(next, 2000);
  }
}

// ⏸️ Pausa animação
function pause() {
  clearInterval(interval);
  interval = null;
}

// 🎚️ Controle de imagem manual
progressBar.addEventListener("input", () => {
  index = parseInt(progressBar.value);
  updateImage();
});

// 🔍 Zoom na imagem
zoomRange.addEventListener("input", () => {
  const scale = parseFloat(zoomRange.value);
  radarImage.style.transform = `scale(${scale})`;
});

// 🚀 Inicializa ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  index = 1;
  progressBar.value = index;
  updateImage();
});
fetch("/previsao")
  .then(res => res.json())
  .then(data => {
    previsaoTexto.textContent = data.previsao;
  })
  .catch(() => {
    previsaoTexto.textContent = "Erro ao obter previsão.";
  });

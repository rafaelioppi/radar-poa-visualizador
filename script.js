const totalImages = 24;
const baseUrl = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_";

let index = 1;
let interval = null;

const radarImage = document.getElementById("radarImage");
const progressBar = document.getElementById("progressBar");
const zoomRange = document.getElementById("zoomRange");
const previsaoTexto = document.getElementById("previsaoTexto");
const historico = document.getElementById("historicoPrevisoes");
const botaoAtualizar = document.getElementById("forcarAnalise");

// 🔍 Gera texto de previsão com base nas cores médias
function gerarPrevisaoPorCor(r, g, b) {
  let texto = "";
  let classe = "";

  if (r > 200 && g < 80 && b < 80) {
    texto = "🌩️ Tempestade severa detectada. Risco de granizo.";
    classe = "previsao-intensa";
  } else if (r > 180 && g > 100 && b < 50) {
    texto = "🌧️ Chuva forte na região. Fique atento.";
    classe = "previsao-moderada";
  } else if (r > 150 && g > 150 && b < 80) {
    texto = "🌦️ Chuva moderada se espalhando.";
    classe = "previsao-leve";
  } else if (g > 120 && b < 100) {
    texto = "🌦️ Chuva leve predominante.";
    classe = "previsao-leve";
  } else if (b > 150 && g > 150) {
    texto = "☁️ Céu nublado com possibilidade de chuvisco.";
    classe = "previsao-leve";
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
 radarImage.src = `/radar/${index}?nocache=${Date.now()}`;
 progressBar.value = index;

  radarImage.onload = () => {
    analisarImagemRadar();
  };
}

// ⏩ Próxima imagem
function next() {
  index = index < totalImages ? index + 1 : 1;
  progressBar.value = index;
  updateImage();
}

// ⏪ Imagem anterior
function prev() {
  index = index > 1 ? index - 1 : totalImages;
  progressBar.value = index;
  updateImage();
}

// ▶️ Inicia animação
function play() {
  if (!interval) {
    interval = setInterval(() => {
      next();
    }, 500); // velocidade da animação
  }
}

// ⏸️ Pausa animação
function pause() {
  clearInterval(interval);
  interval = null;
}

// 📜 Adiciona previsão ao histórico com data e hora
function adicionarAoHistorico(texto) {
  const item = document.createElement("li");
  const agora = new Date();
  const horario = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const data = agora.toLocaleDateString("pt-BR");
  item.textContent = `[${data} ${horario}] ${texto}`;
  historico.prepend(item);
}

// 🌦️ Busca previsão do back-end
function buscarPrevisao() {
  fetch(`/previsao?index=${index}`)
    .then(res => res.json())
    .then(data => {
      previsaoTexto.textContent = data.previsao;
      adicionarAoHistorico(data.previsao);
    })
    .catch(() => {
      previsaoTexto.textContent = "Erro ao obter previsão.";
    });
}


// 🎚️ Controle manual da imagem
progressBar.addEventListener("input", () => {
  index = parseInt(progressBar.value);
  updateImage();
});

// 🔍 Zoom na imagem
zoomRange.addEventListener("input", () => {
  const scale = parseFloat(zoomRange.value);
  radarImage.style.transform = `scale(${scale})`;
});

// 🔄 Botão para forçar nova análise
botaoAtualizar.addEventListener("click", () => {
  buscarPrevisao();
});

// 🚀 Inicializa ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  index = 1;
  progressBar.value = index;
  updateImage();
  buscarPrevisao();
});

const totalImages = 24;
const baseUrl = "https://statics.climatempo.com.br/radar_poa/pngs/latest/radar_poa_";

let index = 1;
let interval = null;

const radarImage = document.getElementById("radarImage");
const progressBar = document.getElementById("progressBar");
const zoomRange = document.getElementById("zoomRange");

function updateImage() {
  radarImage.src = `${baseUrl}${index}.png?nocache=${Date.now()}`;
  progressBar.value = index;
}

function next() {
  index = index > 1 ? index - 1 : totalImages;
  updateImage();
}

function prev() {
  index = index < totalImages ? index + 1 : 1;
  updateImage();
}

function play() {
  if (!interval) {
    interval = setInterval(next, 2000);
  }
}

function pause() {
  clearInterval(interval);
  interval = null;
}

progressBar.addEventListener("input", function () {
  index = parseInt(this.value);
  updateImage();
});

zoomRange.addEventListener("input", function () {
  const scale = parseFloat(this.value);
  radarImage.style.transform = `scale(${scale})`;
});

window.addEventListener("DOMContentLoaded", () => {
  index = 1;
  progressBar.value = index;
  updateImage();
});

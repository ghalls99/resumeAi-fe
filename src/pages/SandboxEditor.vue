<template>
  <div class="background">

  <div ref="fabricCanvasWrapper" class="fabric-canvas-wrapper">
    <canvas id="theCanvas"></canvas>
  </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { fabric } from 'fabric';

const fabricCanvasWrapper = ref(null);
let canvas = null;

onMounted(() => {
  initializeCanvas();
  window.addEventListener('resize', resizeCanvas);
});

function initializeCanvas() {
  canvas = new fabric.Canvas('theCanvas')

  canvas.setWidth(794)
  canvas.setHeight(1123);



  const stylesList = [{ title: { 'fontSize': 40 } }, { text: { 'fontSize': 12 } }, { header: { 'fontSize': 12 } }, { subtitle: { 'fontSize': 16 } }]
  const template = {
    "name": { "style": "title", "left": 50, "top": 50, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 300, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "email": { "style": "text", "left": 500, "top": 50, "mobileLeft": 1000, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "address": { "style": "text", "left": 500, "top": 60, "mobileLeft": 1000, "mobileTop": 100, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "state": { "style": "text", "left": 500, "top": 70, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "role": { "style": "subtitle", "left": 50, "top": 100, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "phone": { "style": "text", "left": 500, "top": 80, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
    "bio": { "style": "text", "left": 50, "top": 230, "mobileLeft": 50, "mobileTop": 500, "desktopWidth": 500, "desktopHeight": 200, "mobileWidth": 100, "mobileHeight": 50 },
    "intro": { "style": "text", "left": 50, "top": 200, "mobileLeft": 50, "mobileTop": 500, "desktopWidth": 500, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
  }

  const resumeData = {
    "name": "Garrett Halls",
    "email": "garrett@hallsnet.com",
    "address": "Utah County",
    "role": "Software Engineer",
    "city": "Utah County",
    "state": "Utah",
    "postal": "",
    "intro":"INTRODUCTION",
    "phone": "8014251650",
    "bio": "Software engineer with 5 years of experience in business to business, business to customer, and saas product development. Has primarily focused on the creation of new features, alongside with the maintenance and the analysis of said features. Has built scalable data pipelines that streamline analysis processes, while creating algorithms that help normalize, clean, and store data for short term and long term use cases.",
  }

  Object.keys(template).reduce((prev, curr) => {
    const style = stylesList.find(item => item[template[curr].style]);

    const iTextSample = new fabric.Textbox(resumeData[curr] || 'no text found', {
      left: Math.round(template[curr].left), // Ensure integer values
      top: Math.round(template[curr].top), // Ensure integer values
      width: Math.round(template[curr].desktopWidth), // Ensure integer values
      height: Math.round(template[curr].desktopHeight), // Ensure integer values
      fill: 'blue',
      ...style[template[curr].style]
    });


    canvas.add(iTextSample);


  }, []);

  resizeCanvas();

  canvas.renderAll()

}

function resizeCanvas() {
  if (!fabricCanvasWrapper.value || !canvas) return;

  const ratio = canvas.getWidth() / canvas.getHeight();
  const containerWidth = fabricCanvasWrapper.value.clientWidth;

  const scale = containerWidth / canvas.getWidth();
  const zoom = canvas.getZoom() * scale;
  canvas.setDimensions({ width: containerWidth, height: containerWidth / ratio });
  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
}
</script>
  
<style scoped>

.background {
  background-color: #F9FBFD;
}
.fabric-canvas-wrapper {
  margin: 0 auto;
  max-width: 1000px;

  /* Your styles here */
}

#theCanvas {
  background-color: #ffffff;
  border: .25px solid lightgrey;
}
</style>
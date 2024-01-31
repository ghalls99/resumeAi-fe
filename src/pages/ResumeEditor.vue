<template>
    <div class="fabric-canvas-wrapper">
        <canvas id="theCanvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { fabric } from 'fabric';

const canvasRef = ref(null);

onMounted(() => {
    const canvas = new fabric.Canvas('theCanvas');
    canvasRef.value = canvas; // Store canvas reference for resizing
    canvas.backgroundColor = '#000000';
    canvas.renderAll();

    const square = new fabric.Textbox('Some text here', {
        left: 500,
        top: 50,
        fill: 'blue',
        width: 200,
        height: 50,
    });
    canvas.add(square);



    const stylesList = [{ title: { 'fontSize': 46,  } }, { text: { 'fontSize': 9 } }, { header: { 'fontSize': 9 } }, { subtitle: { 'fontSize': 9 } }]
    const template = {
        "name": { "style": "title", "left": 50, "top": 50, "width": 200, "height": 50 },
        "email": { "style": "text", "left": 500, "top": 50, "width": 200, "height": 50 },
        "address": { "style": "text", "left": 500, "top": 60, "width": 200, "height": 50 },
        "state": { "style": "text", "left": 500, "top": 70, "width": 200, "height": 50 },
        "role": { "style": "subtitle", "left": 50, "top": 150, "width": 200, "height": 50 },
        "phone": { "style": "text", "left": 500, "top": 80, "width": 200, "height": 50 },
        "bio": { "style": "text", "left": 50, "top": 300, "width": 500, "height": 50 },
    }

    const resumeData = {
        "name": "Garrett Halls",
        "email": "garrett@hallsnet.com",
        "address": "Utah County",
        "role": "Software Engineer",
        "city": "Utah County",
        "state": "Utah",
        "postal": "",
        "phone": "8014251650",
        "bio": "Software engineer with 5 years of experience in business to business, business to customer, and saas product development. Has primarily focused on the creation of new features, alongside with the maintenance and the analysis of said features. Has built scalable data pipelines that streamline analysis processes, while creating algorithms that help normalize, clean, and store data for short term and long term use cases.",
    }
    Object.keys(template).reduce((prev, curr) => {
        const style = stylesList.find((item) => {
            return Object.keys(item)[0] === template[curr].style
        })

        canvas.add(new fabric.Textbox(resumeData[curr] === '' ? 'no text found'  : resumeData[curr], {
            left: template[curr].left,
            top: template[curr].top,
            width: template[curr].width,
            height: template[curr].height,
            fill: 'blue',
            ...style[template[curr].style]
        }));
    }, [])



    // Call resize function initially and on window resize
    resizeCanvas(square);
    window.addEventListener('resize', resizeCanvas(square));
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas(null));
});

function resizeCanvas() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const outerCanvasContainer = document.getElementsByClassName('fabric-canvas-wrapper')[0];
    if (!outerCanvasContainer) return;

    const padding = window.innerWidth < 768 ? 20 : 25;
    const a4Ratio = 297 / 210;
    const availableWidth = outerCanvasContainer.clientWidth - padding * 2;
    const availableHeight = Math.min(outerCanvasContainer.clientHeight, window.innerHeight) - padding * 2;

    let newCanvasWidth = availableWidth;
    let newCanvasHeight = newCanvasWidth * a4Ratio;

    if (newCanvasHeight > availableHeight) {
        newCanvasHeight = availableHeight;
        newCanvasWidth = newCanvasHeight / a4Ratio;
    }

    canvas.setDimensions({ width: newCanvasWidth, height: newCanvasHeight });

    const scale = newCanvasWidth / 794; // Original A4 width in pixels
    canvas.getObjects().forEach(obj => {
        // Apply scaling and repositioning to all objects
        obj.set({
            left: obj.left * scale + padding,
            top: obj.top * scale + padding,
            scaleX: scale,
            scaleY: scale,
        }).setCoords(); // Update the object's coordinates
    });

    canvas.renderAll();
}
</script>

<style scoped>
.fabric-canvas-wrapper {
    width: 100%;
    /* Use the full width of the container */
    height: 90vh;
    /* Optional: Adjust the height as needed */
    display: flex;
    /* Center the canvas within the wrapper */
    justify-content: center;
    align-items: center;
}

canvas {
    display: block;
    /* Remove bottom margin/gap */
    /* No need to set width/height here, it's set dynamically */
}</style>
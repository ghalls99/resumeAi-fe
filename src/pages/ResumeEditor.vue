<template>
    <div class="fabric-canvas-wrapper">
        <canvas id="theCanvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { fabric } from 'fabric';

const canvasRef = ref(null);

function adjustCanvasForHighDPI(canvas) {
    let dpi = window.devicePixelRatio;
    let styleHeight = +getComputedStyle(canvas.getElement()).getPropertyValue("height").slice(0, -2);
    let styleWidth = +getComputedStyle(canvas.getElement()).getPropertyValue("width").slice(0, -2);

    // Scale the canvas's drawing buffer to match the device's pixel ratio
    canvas.getElement().setAttribute('width', styleWidth * dpi);
    canvas.getElement().setAttribute('height', styleHeight * dpi);

    let canvasWidth = canvas.getWidth();
    let canvasHeight = canvas.getHeight();

    // Adjust canvas size without affecting the drawing size
    canvas.setDimensions({ width: canvasWidth, height: canvasHeight });
    canvas.getContext('2d').scale(dpi, dpi);
}

onMounted(() => {
    const canvas = new fabric.Canvas('theCanvas');
    canvasRef.value = canvas; // Store canvas reference for resizing
    canvas.backgroundColor = '#F2F2F2';
    canvas.renderAll();

    // Call the DPI adjustment function right after initializing the canvas
    adjustCanvasForHighDPI(canvas);

    // Setup a resize event listener to adjust the canvas when the window size changes
    window.addEventListener('resize', () => adjustCanvasForHighDPI(canvas));
    const windowWidth = window.innerWidth
    const stylesList = [{ title: { 'fontSize': window.innerWidth > 768 ? 25 : 10 } }, { text: { 'fontSize': 5 } }, { header: { 'fontSize': 9 } }, { subtitle: { 'fontSize': 9 } }]
    const template = {
        "name": { "style": "title", "left": 50, "top": 50, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 300, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "email": { "style": "text", "left": 500, "top": 50, "mobileLeft": 1000, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "address": { "style": "text", "left": 500, "top": 60, "mobileLeft": 1000, "mobileTop": 100, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "state": { "style": "text", "left": 500, "top": 70, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "role": { "style": "subtitle", "left": 50, "top": 150, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "phone": { "style": "text", "left": 500, "top": 80, "mobileLeft": 50, "mobileTop": 50, "desktopWidth": 200, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
        "bio": { "style": "text", "left": 50, "top": 300, "mobileLeft": 50, "mobileTop":  500, "desktopWidth": 500, "desktopHeight": 50, "mobileWidth": 200, "mobileHeight": 50 },
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
        const style = stylesList.find(item => item[template[curr].style]);
        let text = undefined;
        if (windowWidth > 768) {
            text = new fabric.Textbox(resumeData[curr] || 'no text found', {
                left: Math.round(template[curr].left), // Ensure integer values
                top: Math.round(template[curr].top), // Ensure integer values
                width:  Math.round(template[curr].desktopWidth),
                height: Math.round(template[curr].desktopHeight), // Ensure integer values
                fill: 'blue',
                ...style[template[curr].style]
            });


        } else {
            console.log('on mobile')
            text = new fabric.Textbox(resumeData[curr] || 'no text found', {
                left: Math.round(template[curr].mobileLeft), // Ensure integer values
                top: Math.round(template[curr].mobileTop), // Ensure integer values
                width: Math.round(template[curr].mobileWidth), // Ensure integer values
                height: Math.round(template[curr].mobileHeight), // Ensure integer values
                fill: 'blue',
                ...style[template[curr].style]
            });
        }
        // Adjust for high-DPI displays
        text.set({
            scaleX: window.devicePixelRatio,
            scaleY: window.devicePixelRatio,
            fontSize: text.fontSize * window.devicePixelRatio
        });

        canvas.add(text);


    }, []);






    // Call resize function initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas());
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
}
</style>
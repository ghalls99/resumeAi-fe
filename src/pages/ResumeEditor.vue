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

    const square = new fabric.Rect({
        left: 50,
        top: 50,
        fill: 'blue',
        width: 50,
        height: 50,
    });
    canvas.add(square);

    // Call resize function initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
});

function resizeCanvas() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const outerCanvasContainer = document.getElementsByClassName('fabric-canvas-wrapper')[0];
    if (!outerCanvasContainer) return;

    // Define padding dynamically: less for desktop, more for mobile
    const padding = window.innerWidth < 768 ? 10 : 10; // Adjust these values as needed

    // A4 aspect ratio
    const a4Ratio = 297 / 210;

    // Calculate the available space considering padding
    const availableWidth = outerCanvasContainer.clientWidth - padding * 2;
    const availableHeight = Math.min(outerCanvasContainer.clientHeight, window.innerHeight) - padding * 2;

    // Calculate new canvas dimensions while maintaining the A4 ratio
    let newCanvasWidth = availableWidth;
    let newCanvasHeight = newCanvasWidth * a4Ratio;

    // Check if the canvas height exceeds the available height
    if (newCanvasHeight > availableHeight) {
        // If it does, recalculate both width and height based on the available height
        newCanvasHeight = availableHeight;
        newCanvasWidth = newCanvasHeight / a4Ratio;
    }

    // Update canvas dimensions
    canvas.setDimensions({ width: newCanvasWidth, height: newCanvasHeight });

    // Adjust canvas content scale and position
    const scale = newCanvasWidth / 794; // Original A4 width in pixels
    canvas.getObjects().forEach(obj => {
        obj.set({
            scaleX: obj.scaleX * scale,
            scaleY: obj.scaleY * scale,
            left: obj.left * scale + padding, // Adjust for new scale and padding
            top: obj.top * scale + padding, // Adjust for new scale and padding
        }).setCoords(); // Update coordinates of the object's corners
    });

    canvas.renderAll();
} 
</script>

<style scoped>
.fabric-canvas-wrapper {
    width: 100%; /* Use the full width of the container */
    height: 100vh; /* Optional: Adjust the height as needed */
    display: flex; /* Center the canvas within the wrapper */
    justify-content: center;
    align-items: center;
}

canvas {
    display: block; /* Remove bottom margin/gap */
    /* No need to set width/height here, it's set dynamically */
}
</style>
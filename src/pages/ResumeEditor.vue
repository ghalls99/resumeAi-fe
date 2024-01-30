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

    // Define padding, more for mobile and less (or none) for desktop
    const padding = window.innerWidth < 768 ? 20 : 40; // Example: 20px for mobile, 10px for desktop

    // A4 aspect ratio
    const a4Ratio = 297 / 210;

    // Adjusted container dimensions considering padding
    const containerWidth = outerCanvasContainer.clientWidth - padding * 2;
    // Use the innerHeight to consider the viewport height, subtracting padding and an arbitrary value to ensure no scrolling
    const containerHeight = Math.min(outerCanvasContainer.clientHeight, window.innerHeight - padding * 2 - 100);

    // Calculate new canvas dimensions while maintaining A4 ratio
    let newCanvasWidth = containerWidth;
    let newCanvasHeight = newCanvasWidth * a4Ratio;

    // Ensure the canvas height doesn't exceed the container height
    if (newCanvasHeight > containerHeight) {
        newCanvasHeight = containerHeight;
        newCanvasWidth = newCanvasHeight / a4Ratio;
    }

    // Update canvas dimensions
    canvas.setDimensions({ width: newCanvasWidth, height: newCanvasHeight });

    // Scale and reposition the canvas content
    const scale = newCanvasWidth / 794; // Original A4 width in pixels
    canvas.getObjects().forEach(obj => {
        obj.set({
            scaleX: obj.scaleX * scale,
            scaleY: obj.scaleY * scale,
            left: obj.left * scale + padding, // Adjust for new scale and padding
            top: obj.top * scale + padding, // Adjust for new scale and padding
        });
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
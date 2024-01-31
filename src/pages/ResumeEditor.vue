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
    resizeCanvas(square);
    window.addEventListener('resize', resizeCanvas(square));
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas(null));
});

const originalSquare = {
    left: 50,
    top: 50,
    width: 50,
    height: 50,
};

function resizeCanvas(square) {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const outerCanvasContainer = document.getElementsByClassName('fabric-canvas-wrapper')[0];
    if (!outerCanvasContainer) return;

    // Define padding dynamically
    const padding = window.innerWidth < 768 ? 20 : 25;

    // A4 aspect ratio
    const a4Ratio = 297 / 210;

    // Calculate the available space considering padding
    const availableWidth = outerCanvasContainer.clientWidth - padding * 2;
    const availableHeight = Math.min(outerCanvasContainer.clientHeight, window.innerHeight) - padding * 2;

    // Calculate new canvas dimensions
    let newCanvasWidth = availableWidth;
    let newCanvasHeight = newCanvasWidth * a4Ratio;

    // Adjust dimensions based on available height
    if (newCanvasHeight > availableHeight) {
        newCanvasHeight = availableHeight;
        newCanvasWidth = newCanvasHeight / a4Ratio;
    }

    // Update canvas dimensions
    canvas.setDimensions({ width: newCanvasWidth, height: newCanvasHeight });

    // Scale and reposition objects based on the original properties
    const scale = newCanvasWidth / 794; // Original A4 width in pixels
    canvas.getObjects().forEach(obj => {
        const original = obj === square ? originalSquare : undefined; // Replace 'square' with your square object reference
        if (original) {
            obj.set({
                left: original.left * scale + padding,
                top: original.top * scale + padding,
                scaleX: scale,
                scaleY: scale,
                width: original.width,
                height: original.height,
            }).setCoords(); // Update the object's coordinates
        }
    });

    canvas.renderAll();
}
</script>

<style scoped>
.fabric-canvas-wrapper {
    width: 100%; /* Use the full width of the container */
    height: 90vh; /* Optional: Adjust the height as needed */
    display: flex; /* Center the canvas within the wrapper */
    justify-content: center;
    align-items: center;
}

canvas {
    display: block; /* Remove bottom margin/gap */
    /* No need to set width/height here, it's set dynamically */
}
</style>
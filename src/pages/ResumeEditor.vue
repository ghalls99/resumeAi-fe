<template>
    <div class="background ">

        <div ref="fabricCanvasWrapper" class="fabric-canvas-wrapper">
            <div class="pt-5 pb-3 d-flex justify-content-end">
                <button class="btn btn-primary" @click="exportToPdf()">Export</button>
            </div>
            <canvas id="theCanvas"></canvas>
        </div>
    </div>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';
const fabricCanvasWrapper = ref(null);
let canvas = null;
let zoomStartScale = 1; // Starting scale for zoom gestures
let pausePanning;
let currentX;
let currentY;
let xChange;
let yChange;
let lastX;
let lastY;


onMounted(() => {
    initializeCanvas();
    window.addEventListener('resize', resizeCanvas);
});

function initializeCanvas() {
    canvas = new fabric.Canvas('theCanvas')


    canvas.setWidth(800)
    canvas.setHeight(1123);

    canvas.on({
        'touch:gesture': function(e) {
            if (e.e.touches && e.e.touches.length == 2) {
                pausePanning = true;
                var point = new fabric.Point(e.self.x, e.self.y);
                if (e.self.state == "start") {
                    zoomStartScale = self.canvas.getZoom();
                }
                var delta = zoomStartScale * e.self.scale;
                self.canvas.zoomToPoint(point, delta);
                pausePanning = false;
            }
        },
        'object:selected': function() {
            pausePanning = true;
        },
        'selection:cleared': function() {
            console.log('cleared')
            pausePanning = false;
        },
        'touch:drag': function(e) {
            console.log('something')
            if (pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
                currentX = e.e.layerX;
                currentY = e.e.layerY;
                xChange = currentX - lastX;
                yChange = currentY - lastY;

                if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                    var delta = new fabric.Point(xChange, yChange);
                    canvas.relativePan(delta);
                }

                lastX = e.e.layerX;
                lastY = e.e.layerY;
            }
        }
    });

    
    const stylesList = [{ title: { 'fontSize': 40, 'fontFamily': 'Open Sans' } }, { text: { 'fontSize': 10, 'fontFamily': 'Open Sans', 'fontWeight': 300 } }, { header: { 'fontSize': 12, 'fill': '#2079c7', 'fontFamily': 'Open Sans' } }, { subtitle: { 'fontSize': 16, 'fontFamily': 'Open Sans' } }, { subHeader: { 'fontSize': 10, 'fontWeight': 400, 'fontFamily': 'Open Sans' } }]
    const template = {
        "name": { "style": "title", "left": 50, "top": 50, "width": 300, "height": 50, },
        "email": { "style": "text", "left": 550, "top": 50, "width": 100, "height": 50, },
        "address": { "style": "text", "left": 550, "top": 63, "width": 100, "height": 50, },
        "state": { "style": "text", "left": 550, "top": 75, "width": 100, "height": 50, },
        "role": { "style": "subtitle", "left": 50, "top": 100, "width": 150, "height": 50, },
        "phone": { "style": "text", "left": 550, "top": 85, "width": 100, "height": 50, },
        "bio": { "style": "text", "left": 50, "top": 180, "width": 400, "height": 200, },
        "intro": { "style": "header", "left": 50, "top": 150, "width": 100, "height": 50, },
        "companyName": { "style": "subHeader", "left": 50, "top": 100, "width": 100, "height": 50, },
        "companyRole": { "style": "text", "left": 50, "top": 200, "width": 100, "height": 50, },
        "period": { "style": "text", "left": 50, "top": 200, "width": 100, "height": 50, },
        "task": { "style": "text", "left": 60, "top": 200, "width": 400, "height": 50, },
        "university": { "style": "subHeader", "left": 50, "top": 200, "width": 300, "height": 50, },
        "degree": { "style": "text", "left": 50, "top": 200, "width": 300, "height": 50, },
        "major": { "style": "text", "left": 50, "top": 200, "width": 300, "height": 50, },
        "summary": { "style": "text", "left": 50, "top": 200, "width": 300, "height": 50, },
        "skillTitle": { "style": "header", "left": 550, "top": 120, "width": 300, "height": 50, },
        "listItem": { "style": "text", "left": 550, "top": 10, "width": 300, "height": 50, },

    }

    const resumeData = {
        "name": "Garrett Halls",
        "email": "garrett@hallsnet.com",
        "address": "Utah County",
        "role": "Software Engineer",
        "city": "Utah County",
        "state": "Utah",
        "postal": "",
        "intro": "INTRODUCTION",
        "educationTitle": "EDUCATION",
        "phone": "8014251650",
        "bio": "Software engineer with 5 years of experience in business to business, business to customer, and saas product development. Has primarily focused on the creation of new features, alongside with the maintenance and the analysis of said features. Has built scalable data pipelines that streamline analysis processes, while creating algorithms that help normalize, clean, and store data for short term and long term use cases.",
        "jobExperiences": [
            {
                "intro": 'JOB EXPERIENCES',
                "companyName": "LemonSqueezy",
                "companyRole": "Contract Developer",
                "period": "2023 - 2023",
                "tasks": [
                    { task: "test" },
                    { task: "test2" },
                    { task: "test3" },
                ]
            },
            {
                "companyName": "Bullfrog Spas",
                "companyRole": "Full Stack Developer",
                "period": "2021 - 2022",
                "tasks": [
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                ]
            },
            {
                "companyName": "Really long string of text that has no value or meaning",
                "companyRole": "Full Stack Developer",
                "period": "2022 - 2023",
                "tasks": [
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                    { task: "Migrated and consolidated the customer data from six different databases into the AWS ecosystem, reducing data storage costs by 80%." },
                ]
            }
        ],
        "education": [
            {
                "intro": 'EDUCATION',
                "university": "Utah Valley University",
                "degree": "Bachelor's",
                "major": "Web Design and Development",
                "period": "2019 - 2023",
                "summary": "Studied Web Design and User Experience design while maintaining a heavy understanding of digital marketing and data analysis."
            },
            {
                "university": "BYU-Idaho",
                "degree": "Associate's",
                "major": "General Studies",
                "period": "2017 - 2019",
                "summary": "Focused Son Object Oriented programming while pursuing a General’s degree."
            }
        ],
        "skillSection": [
            { "skillTitle": "Languages", "list": [{ listItem: "C#" }, { listItem: "Python" }] },
            {
                "skillTitle": "Frameworks & Libraries",
                "list": [{ listItem: "C#" }, { listItem: "Python" }]
            },
            {
                "skillTitle": "Database Technologies",
                "list": [{ listItem: "C#" }, { listItem: "Python" }]
            },
            {
                "skillTitle": "Design Tools",
                "list": [{ listItem: "C#" }, { listItem: "Python" }]
            },
            {
                "skillTitle": "Other Skills",
                "list": [{ listItem: "C#" }, { listItem: "Python" }]
            }
        ]
    }

    function processResumeData(data, template) {
        let currentTop = 0
        Object.keys(data).forEach((key) => {
            // Check if the current item is an array (e.g., jobExperiences)
            if (Array.isArray(data[key])) {
                if (key === 'skillSection') {
                    return handleArraySet(data[key], 150)
                }
                currentTop = handleArraySet(data[key], currentTop + 40)
            }
            else {
                // Handle simple properties here
                if (template[key]) { // Ensure the template for this item exists
                    const textBox = createTextBox(data[key], key, null, template, stylesList)
                    canvas.add(textBox);
                    currentTop = textBox.getScaledHeight() + 160
                }
            }
        });
    }

    function handleArraySet(array, startY = 0) {
        let currentTop = startY;

        array.forEach((item, itemIndex) => {

            // Apply groupSpacing only between job sections, not between tasks
            if (itemIndex > 0) { // Check if it's not the first job section
                const groupSpacing = 20; // Space between different job groups
                currentTop += groupSpacing;
            }

            const itemSpacing = 5; // Space between items within a group
            const taskSpacing = -10; // Tighter spacing specifically for tasks within a job


            Object.keys(item).forEach((itemKey) => {
                if (itemKey === 'list') {
                    // Concatenate listItem values
                    const concatenatedListItems = item[itemKey].map(listItem => listItem.listItem).join(', ');

                    const textBox = createTextBox(concatenatedListItems, 'listItem', currentTop, template, stylesList)

                    canvas.add(textBox);
                    currentTop += textBox.getScaledHeight() + 10; // Adjust spacing as needed
                    return;
                }
                try {
                    // Handle nested arrays, like tasks within a job experience
                    if (Array.isArray(item[itemKey])) {
                        currentTop = handleArraySet(item[itemKey], currentTop); // Recursively handle nested arrays
                        return;
                    }

                    if (itemKey === 'task') {
                        item[itemKey] = `• ${item[itemKey]}`
                    }

                    const textBox = createTextBox(item[itemKey], itemKey, currentTop, template, stylesList)
                    canvas.add(textBox);

                    // Increment 'currentTop' for the next item
                    // Use taskSpacing for tasks within the same job for tighter grouping
                    const isArray = Array.isArray(item[itemKey])
                    console.log(`${isArray}`)
                    currentTop += textBox.getScaledHeight() + (itemKey === 'task' ? taskSpacing : itemSpacing);
                } catch (error) {
                    console.error(`Failed processing item at index ${itemIndex} with key '${itemKey}': ${error}`);
                }
            });
        });

        return currentTop; // Return the updated 'currentTop' for nested calls
    }

    processResumeData(resumeData, template);

    resizeCanvas();


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

function createTextBox(text, key, currentTop, template, stylesList) {
    const templateConfig = template[key] || {};
    const style = stylesList.find(styleItem => styleItem[templateConfig.style]) || {};

    return new fabric.Textbox(text, {
        left: Math.round(templateConfig.left || 0),
        top: Math.round(currentTop || templateConfig.top || 0),
        width: Math.round(templateConfig.width || 0),
        height: Math.round(templateConfig.height || 0),
        ...style[templateConfig.style],
    });
}

function exportToPdf() {
    let width = canvas.width;
    let height = canvas.height;

    // Determine the orientation based on canvas dimensions
    const orientation = width > height ? 'l' : 'p';
    var pdf = new jsPDF(orientation, 'px', [width, height]);

    // Only JPEG is supported by jsPDF for better performance

    // First add texts
    canvas.getObjects().forEach((obj) => {
        if (obj.type === 'text') {
            const size = obj.fontSize * 0.75; // Convert pixels to points
            pdf.setFontSize(size);
            const textPosition = obj.calcTransformMatrix();
            pdf.text(obj.text, textPosition[4], textPosition[5], {
                baseline: 'top',
                angle: -obj.angle,
            });
        }
    });

    // Get the dimensions from the PDF to ensure the image fits within the page
    width = pdf.internal.pageSize.getWidth();
    height = pdf.internal.pageSize.getHeight();

    const highQuality = exportHighQualityImage(canvas, 2)

    // Add the canvas image to the PDF
    pdf.addImage(highQuality, 'JPEG', 0, 0, width, height);

    // Save the PDF
    pdf.save("download.pdf");
}

function exportHighQualityImage(canvas, pixelRatio) {
    const originalDimensions = { width: canvas.width, height: canvas.height };

    // Resize the canvas to the desired pixel ratio
    canvas.setDimensions({
        width: originalDimensions.width * pixelRatio,
        height: originalDimensions.height * pixelRatio
    });

    // Scale all the canvas contents by the same pixel ratio
    canvas.getObjects().forEach((obj) => {
        const scaleX = obj.scaleX;
        const scaleY = obj.scaleY;
        const left = obj.left;
        const top = obj.top;

        const tempScaleX = scaleX * pixelRatio;
        const tempScaleY = scaleY * pixelRatio;
        const tempLeft = left * pixelRatio;
        const tempTop = top * pixelRatio;

        obj.set({ scaleX: tempScaleX, scaleY: tempScaleY, left: tempLeft, top: tempTop });
        obj.setCoords();
    });
    // Export the canvas as a data URL
    const dataURL = canvas.toDataURL({
        format: 'img/jpeg',
        quality: 1
    });

    // Reset the canvas to its original dimensions and re-scale the objects
    canvas.setDimensions(originalDimensions);
    canvas.getObjects().forEach((obj) => {
        obj.set({
            scaleX: obj.scaleX / pixelRatio,
            scaleY: obj.scaleY / pixelRatio,
            left: obj.left / pixelRatio,
            top: obj.top / pixelRatio
        });
        obj.setCoords();
    });
    // Use the data URL as needed (e.g., to display or download the image)
    return dataURL;
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
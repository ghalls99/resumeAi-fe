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


    canvas.setWidth(800)
    canvas.setHeight(1123);



    const stylesList = [{ title: { 'fontSize': 40, } }, { text: { 'fontSize': 12 } }, { header: { 'fontSize': 12, 'fill': '#2079c7' } }, { subtitle: { 'fontSize': 16 } }]
    const template = {
        "name": { "style": "title", "left": 50, "top": 50, "width": 300, "height": 50, },
        "email": { "style": "text", "left": 550, "top": 50, "width": 200, "height": 50, },
        "address": { "style": "text", "left": 550, "top": 63, "width": 200, "height": 50, },
        "state": { "style": "text", "left": 550, "top": 75, "width": 200, "height": 50, },
        "role": { "style": "subtitle", "left": 50, "top": 100, "width": 200, "height": 50, },
        "phone": { "style": "text", "left": 550, "top": 85, "width": 200, "height": 50, },
        "bio": { "style": "text", "left": 50, "top": 180, "width": 400, "height": 200, },
        "intro": { "style": "header", "left": 50, "top": 150, "width": 500, "height": 50, },
        "companyName": { "style": "text", "left": 50, "top": 100, "width": 500, "height": 50, },
        "companyRole": { "style": "text", "left": 50, "top": 200, "width": 500, "height": 50, },
        "period": { "style": "text", "left": 50, "top": 200, "width": 500, "height": 50, },
        "task": { "style": "text", "left": 50, "top": 200, "width": 400, "height": 50, },
        "university": { "style": "text", "left": 50, "top": 200, "width": 400, "height": 50, },
        "degree": { "style": "text", "left": 50, "top": 200, "width": 400, "height": 50, },
        "major": { "style": "text", "left": 50, "top": 200, "width": 400, "height": 50, },
        "summary": { "style": "text", "left": 50, "top": 200, "width": 400, "height": 50, },
        "skillTitle": { "style": "header", "left": 550, "top": 120, "width": 400, "height": 50, },
        "listItem": { "style": "text", "left": 550, "top": 10, "width": 400, "height": 50, },



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
        "phone": "8014251650",
        "bio": "Software engineer with 5 years of experience in business to business, business to customer, and saas product development. Has primarily focused on the creation of new features, alongside with the maintenance and the analysis of said features. Has built scalable data pipelines that streamline analysis processes, while creating algorithms that help normalize, clean, and store data for short term and long term use cases.",
        "jobExperiences": [
            {
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
                "companyName": "PolicyScout ",
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
                "summary": "Focused on Object Oriented programming while pursuing a General’s degree."
            }
        ],
        "rightSideSection": [
            { "skillTitle": "Languages", "list": [{listItem: "C#"}, {listItem:"Python"}] },
            {
                "skillTitle": "Frameworks & Libraries",
                "list": [{listItem: "C#"}, {listItem:"Python"}]
            },
            {
                "skillTitle": "Database Technologies",
                "list": [{listItem: "C#"}, {listItem:"Python"}]
            },
            {
                "skillTitle": "Design Tools",
                "list": [{listItem: "C#"}, {listItem:"Python"}]
            },
            {
                "skillTitle": "Other Skills",
                "list": [{listItem: "C#"}, {listItem:"Python"}]
            }
        ]
    }

    function processResumeData(data, template) {
        let currentTop = 0
        Object.keys(data).forEach((key) => {
            // Check if the current item is an array (e.g., jobExperiences)
            if (Array.isArray(data[key])) {
                console.log('running this')
                if(key === 'rightSideSection') {
                    return handleArraySet(data[key], 150)
                }
                currentTop = handleArraySet(data[key], currentTop)
            }
            else {
                // Handle simple properties here
                if (template[key]) { // Ensure the template for this item exists
                    const style = stylesList.find(item => item[template[key].style]) || {};
                    const iTextSample = new fabric.Textbox(data[key] || 'no text found', {
                        left: Math.round(template[key].left), // Ensure integer values
                        top: Math.round(template[key].top), // Ensure integer values
                        width: Math.round(template[key].width), // Ensure integer values
                        height: Math.round(template[key].height), // Ensure integer values
                        ...style[template[key].style],
                    });

                    canvas.add(iTextSample);
                    currentTop = iTextSample.getScaledHeight() + 200
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

            const itemSpacing = 2; // Space between items within a group
            const taskSpacing = 2; // Tighter spacing specifically for tasks within a job

            Object.keys(item).forEach((itemKey) => {
                try {
                    // Handle nested arrays, like tasks within a job experience
                    if (Array.isArray(item[itemKey])) {
                        currentTop += 1; // Use taskSpacing before starting tasks for tighter grouping
                        currentTop = handleArraySet(item[itemKey], currentTop); // Recursively handle nested arrays
                        return;
                    }

                    // Calculate the 'top' position based on the current item index and spacing
                    const style = stylesList.find(styleItem => styleItem[template[itemKey]?.style]) || {};
                    const iTextSample = new fabric.Textbox(item[itemKey] || 'no text found', {
                        left: Math.round(template[itemKey]?.left || 0),
                        top: currentTop, // Use the dynamically calculated 'top' position
                        width: Math.round(template[itemKey]?.width || 0),
                        height: Math.round(template[itemKey]?.height || 0),
                        ...style[template[itemKey]?.style],
                    });

                    canvas.add(iTextSample);

                    // Increment 'currentTop' for the next item
                    // Use taskSpacing for tasks within the same job for tighter grouping
                    currentTop += iTextSample.getScaledHeight() + (Array.isArray(item[itemKey]) ? taskSpacing : itemSpacing);
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
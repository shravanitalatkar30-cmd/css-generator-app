// 1. Select elements from the DOM
const slider = document.getElementById('radius-slider');
const radiusVal = document.getElementById('radius-val');
const previewBox = document.getElementById('preview-box');
const cssOutput = document.getElementById('css-code');

// 2. Function to update UI components
function updateBorderRadius() {
    const value = slider.value;
    
    // Update the number text on the screen
    radiusVal.innerText = value;
    
    // Update the visual shape of the box
    previewBox.style.borderRadius = `${value}px`;
    
    // Update the code inside the textarea
    cssOutput.value = `border-radius: ${value}px;`;
}

// 3. Listen for slider movement
slider.addEventListener('input', updateBorderRadius);

// 4. Run once on load to ensure sync
updateBorderRadius();const templateSelect = document.getElementById('template-select');
const radiusSlider = document.getElementById('radius-slider');
const radiusVal = document.getElementById('radius-val');
const previewContainer = document.getElementById('preview-container');
const previewItems = document.querySelectorAll('.preview-item');
const cssOutput = document.getElementById('css-code');

function updateApp() {
    const layout = templateSelect.value;
    const radius = radiusSlider.value;

    // 1. Update Layout Class
    previewContainer.className = ''; // Clear old classes
    previewContainer.classList.add(`${layout}-template`);

    // 2. Update Border Radius for all items
    previewItems.forEach(item => {
        item.style.borderRadius = `${radius}px`;
    });

    // 3. Update Text display
    radiusVal.innerText = radius;

    // 4. Generate CSS Code Snippet
    let layoutCSS = "";
    if(layout === 'card') layoutCSS = "display: block;";
    if(layout === 'grid') layoutCSS = "display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: 15px;";
    if(layout === 'columns') layoutCSS = "display: flex;\ngap: 15px;";

    cssOutput.value = `/* Container Styles */\n.container {\n  ${layoutCSS}\n}\n\n/* Item Styles */\n.item {\n  border-radius: ${radius}px;\n  background-color: #3498db;\n}`;
}

// Event Listeners
templateSelect.addEventListener('change', updateApp);
radiusSlider.addEventListener('input', updateApp);

// Initialize on load
updateApp();
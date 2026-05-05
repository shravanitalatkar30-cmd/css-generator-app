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
updateBorderRadius();
// 1. Selecting the elements from HTML
const slider = document.getElementById('radius-slider');
const radiusVal = document.getElementById('radius-val');
const previewBox = document.getElementById('preview-box');
const cssOutput = document.getElementById('css-code');

// 2. Creating the function that updates the box
slider.addEventListener('input', () => {
    const value = slider.value; // Gets the number from slider
    
    radiusVal.innerText = value; // Updates the number on screen
    previewBox.style.borderRadius = `${value}px`; // Changes the box shape
    cssOutput.value = `border-radius: ${value}px;`; // Shows the code to copy
});

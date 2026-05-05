const templateSelect = document.getElementById('template-select');
const bgColorInput = document.getElementById('bg-color');
const itemColorInput = document.getElementById('item-color');
const radiusSlider = document.getElementById('radius-slider');
const paddingSlider = document.getElementById('padding-slider');

const radiusVal = document.getElementById('radius-val');
const paddingVal = document.getElementById('padding-val');

const previewContainer = document.getElementById('preview-container');
const previewItems = document.querySelectorAll('.preview-item');
const cssOutput = document.getElementById('css-code');

function updateApp() {
    const layout = templateSelect.value;
    const radius = radiusSlider.value;
    const padding = paddingSlider.value;
    const bgColor = bgColorInput.value;
    const itemColor = itemColorInput.value;

    // 1. Update Preview Container
    previewContainer.className = '';
    previewContainer.classList.add(`${layout}-template`);
    previewContainer.style.backgroundColor = bgColor;
    previewContainer.style.padding = `${padding}px`;

    // 2. Update Items
    previewItems.forEach(item => {
        item.style.borderRadius = `${radius}px`;
        item.style.backgroundColor = itemColor;
    });

    // 3. Update Text labels
    radiusVal.innerText = radius;
    paddingVal.innerText = padding;

    // 4. Generate Dynamic CSS
    const cssText = `/* Container Styles */
.container {
  display: ${layout === 'grid' ? 'grid' : layout === 'columns' ? 'flex' : 'block'};
  ${layout === 'grid' ? 'grid-template-columns: 1fr 1fr;' : ''}
  gap: 15px;
  padding: ${padding}px;
  background-color: ${bgColor};
}

/* Item Styles */
.item {
  background-color: ${itemColor};
  border-radius: ${radius}px;
}`;

    cssOutput.value = cssText;
}

// Event Listeners for all inputs
[templateSelect, bgColorInput, itemColorInput, radiusSlider, paddingSlider].forEach(input => {
    input.addEventListener('input', updateApp);
});

// Run once to initialize
updateApp();
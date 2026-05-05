// Select Elements
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
const copyBtn = document.getElementById('copy-btn');

// Update Function
function updateGenerator() {
    const config = {
        layout: templateSelect.value,
        radius: radiusSlider.value,
        padding: paddingSlider.value,
        bg: bgColorInput.value,
        item: itemColorInput.value
    };

    // Update Labels
    radiusVal.innerText = config.radius;
    paddingVal.innerText = config.padding;

    // Apply Preview Styles
    previewContainer.className = `${config.layout}-template`;
    previewContainer.style.backgroundColor = config.bg;
    previewContainer.style.padding = `${config.padding}px`;

    previewItems.forEach(item => {
        item.style.borderRadius = `${config.radius}px`;
        item.style.backgroundColor = config.item;
    });

    // Generate Code String
    const code = `.container {
  display: ${config.layout === 'grid' ? 'grid' : config.layout === 'columns' ? 'flex' : 'block'};
  ${config.layout === 'grid' ? 'grid-template-columns: 1fr 1fr;' : ''}
  gap: 15px;
  padding: ${config.padding}px;
  background-color: ${config.bg};
}

.item {
  border-radius: ${config.radius}px;
  background-color: ${config.item};
}`;

    cssOutput.value = code;
}

// Copy to Clipboard Logic
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(cssOutput.value);
        
        // Success Feedback
        copyBtn.innerText = "Copied!";
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.innerText = "Copy to Clipboard";
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

// Event Listeners
[templateSelect, bgColorInput, itemColorInput, radiusSlider, paddingSlider].forEach(el => {
    el.addEventListener('input', updateGenerator);
});

copyBtn.addEventListener('click', copyToClipboard);

// Initialize
updateGenerator();
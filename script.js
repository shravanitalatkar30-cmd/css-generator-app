// 1. Element Selectors
const inputs = {
    template: document.getElementById('template-select'),
    bg: document.getElementById('bg-color'),
    item: document.getElementById('item-color'),
    radius: document.getElementById('radius-slider'),
    padding: document.getElementById('padding-slider')
};

const displays = {
    radius: document.getElementById('radius-val'),
    padding: document.getElementById('padding-val'),
    preview: document.getElementById('preview-container'),
    items: document.querySelectorAll('.preview-item'),
    output: document.getElementById('css-code'),
    copyBtn: document.getElementById('copy-btn')
};

// 2. Main Logic Function: Generates and applies CSS based on inputs
function generateCSS() {
    // Capture user selections
    const config = {
        layout: inputs.template.value,
        bgColor: inputs.bg.value,
        itemColor: inputs.item.value,
        radius: inputs.radius.value,
        padding: inputs.padding.value
    };

    // Update UI Displays (Text labels)
    displays.radius.innerText = config.radius;
    displays.padding.innerText = config.padding;

    // Apply styles to Preview
    displays.preview.className = `${config.layout}-template`;
    displays.preview.style.backgroundColor = config.bgColor;
    displays.preview.style.padding = `${config.padding}px`;

    displays.items.forEach(item => {
        item.style.backgroundColor = config.itemColor;
        item.style.borderRadius = `${config.radius}px`;
    });

    // Construct the CSS Rule String
    const generatedCode = `/* CSS Generated for ${config.layout} */
.container {
  display: ${config.layout === 'grid' ? 'grid' : config.layout === 'columns' ? 'flex' : 'block'};
  ${config.layout === 'grid' ? 'grid-template-columns: 1fr 1fr;' : ''}
  gap: 15px;
  padding: ${config.padding}px;
  background-color: ${config.bgColor};
}

.item {
  background-color: ${config.itemColor};
  border-radius: ${config.radius}px;
  color: white;
  padding: 10px;
}`;

    // Display the code in the text area
    displays.output.value = generatedCode;
}

// 3. Logic Function: Copy to Clipboard
function copyToClipboard() {
    displays.output.select();
    document.execCommand('copy');
    
    // Simple visual feedback
    const originalText = displays.copyBtn.innerText;
    displays.copyBtn.innerText = "✓ Copied!";
    displays.copyBtn.style.background = "#1e90ff";
    
    setTimeout(() => {
        displays.copyBtn.innerText = originalText;
        displays.copyBtn.style.background = "#05c46b";
    }, 2000);
}

// 4. Event Listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', generateCSS);
});

displays.copyBtn.addEventListener('click', copyToClipboard);

// Initialize on page load
generateCSS();
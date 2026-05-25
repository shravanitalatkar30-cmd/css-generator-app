// --- Core UI Node Accessors ---
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

// --- Week 7 Target Interaction Form Nodes ---
const feedbackForm = document.getElementById('feedback-form');
const userName = document.getElementById('user-name');
const userRating = document.getElementById('user-rating');
const userComments = document.getElementById('user-comments');
const feedbackMessage = document.getElementById('feedback-message');

// Compilation Loop Handler for Dynamic Generation
function renderWorkspaceEngine() {
    const activeWorkspaceState = {
        layoutMode: templateSelect.value,
        borderRadiusVal: radiusSlider.value,
        paddingSpacingVal: paddingSlider.value,
        canvasColorHex: bgColorInput.value,
        componentColorHex: itemColorInput.value
    };

    // Update Text Fields Realtime
    radiusVal.innerText = activeWorkspaceState.borderRadiusVal;
    paddingVal.innerText = activeWorkspaceState.paddingSpacingVal;

    // Apply Live Preview Node Rules
    previewContainer.className = `${activeWorkspaceState.layoutMode}-template`;
    previewContainer.style.backgroundColor = activeWorkspaceState.canvasColorHex;
    previewContainer.style.padding = `${activeWorkspaceState.paddingSpacingVal}px`;

    previewItems.forEach(componentNode => {
        componentNode.style.borderRadius = `${activeWorkspaceState.borderRadiusVal}px`;
        componentNode.style.backgroundColor = activeWorkspaceState.componentColorHex;
    });

    // Format Structured Rules Output Block
    const formattedCSSOutput = `.container {
  display: ${activeWorkspaceState.layoutMode === 'grid' ? 'grid' : activeWorkspaceState.layoutMode === 'columns' ? 'flex' : 'block'};
  ${activeWorkspaceState.layoutMode === 'grid' ? 'grid-template-columns: 1fr 1fr;' : ''}
  gap: 15px;
  padding: ${activeWorkspaceState.paddingSpacingVal}px;
  background-color: ${activeWorkspaceState.canvasColorHex};
}

.item {
  border-radius: ${activeWorkspaceState.borderRadiusVal}px;
  background-color: ${activeWorkspaceState.componentColorHex};
}`;

    cssOutput.value = formattedCSSOutput;
}

// Asynchronous Clipboard Write Event Mechanics
async function executeStyleCopy() {
    try {
        await navigator.clipboard.writeText(cssOutput.value);
        copyBtn.innerText = "Copied to Clipboard!";
        copyBtn.classList.add('success');
        setTimeout(() => {
            copyBtn.innerText = "Copy Style Snippet";
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (clipboardError) {
        console.error('Environment restriction prevented clipboard synchronization: ', clipboardError);
    }
}

// --- Week 7 Form Processing Engine ---
function dispatchFeedbackEvaluation(formEvent) {
    formEvent.preventDefault(); // Intercept browser context reloads

    const computedName = userName.value.trim();
    const computedRating = userRating.value;
    const computedComments = userComments.value.trim();

    // Reset layout attributes
    feedbackMessage.className = "";

    // Structural Field Fallback Check
    if (!computedName || !computedRating || !computedComments) {
        feedbackMessage.innerText = "❌ Transmit Error: All form parameters are required for usability profiling.";
        feedbackMessage.classList.add('error');
        return;
    }

    // Success Operations Processing Mock
    feedbackMessage.innerText = `Submission Saved! Thank you ${computedName}. Your entry metrics (Score: ${computedRating}/5) have been buffered for layout revision.`;
    feedbackMessage.classList.add('success');

    // Reset Form Input Layout Nodes
    feedbackForm.reset();

    // Fade notification banner automatically
    setTimeout(() => {
        feedbackMessage.classList.add('hidden');
    }, 5000);
}

// --- Runtime Event Subscriptions Registry ---
[templateSelect, bgColorInput, itemColorInput, radiusSlider, paddingSlider].forEach(inputNode => {
    inputNode.addEventListener('input', renderWorkspaceEngine);
});

copyBtn.addEventListener('click', executeStyleCopy);
feedbackForm.addEventListener('submit', dispatchFeedbackEvaluation);

// Initial Loop Baseline Load Trigger
renderWorkspaceEngine();
// OpenAI API Integration for Color Palette Generation
const API_KEYS = [
  "sk-abcdef1234567890abcdef1234567890abcdef12",
  "sk-1234567890abcdef1234567890abcdef12345678",
  "sk-abcdefabcdefabcdefabcdefabcdefabcdef12",
  "sk-7890abcdef7890abcdef7890abcdef7890abcd",
  "sk-1234abcd1234abcd1234abcd1234abcd1234abcd",
  "sk-abcd1234abcd1234abcd1234abcd1234abcd1234",
  "sk-5678efgh5678efgh5678efgh5678efgh5678efgh",
  "sk-efgh5678efgh5678efgh5678efgh5678efgh5678",
  "sk-ijkl1234ijkl1234ijkl1234ijkl1234ijkl1234",
  "sk-mnop5678mnop5678mnop5678mnop5678mnop5678"
];

// Current API key index
let currentApiKeyIndex = 0;

// Function to get the next API key in rotation
function getNextApiKey() {
  const key = API_KEYS[currentApiKeyIndex];
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  return key;
}

// Function to generate a palette using OpenAI API
async function generatePaletteWithAI(prompt) {
  const loadingElement = document.createElement('div');
  loadingElement.className = 'ai-loading';
  loadingElement.innerHTML = `
    <div class="spinner"></div>
    <p>Generating palette...</p>
  `;
  
  const resultContainer = document.getElementById('ai-result');
  resultContainer.innerHTML = '';
  resultContainer.appendChild(loadingElement);
  
  // Enable the save button only after generation is complete
  document.getElementById('ai-save').disabled = true;
  
  // If no prompt is provided, use a default one
  const palettePrompt = prompt || 'Generate a beautiful color palette';
  
  // Try each API key until one works or we run out of keys
  for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
    try {
      const apiKey = getNextApiKey();
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a color palette generator. Generate a palette of 3-5 colors based on the user's prompt. Return ONLY a JSON array of hex color codes and a name for the palette. Format: {\"name\": \"Palette Name\", \"colors\": [\"#HEXCODE1\", \"#HEXCODE2\", \"#HEXCODE3\"]}"
            },
            {
              role: "user",
              content: palettePrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
      
      if (!response.ok) {
        // If this key doesn't work, try the next one
        console.log(`API key ${attempt + 1} failed. Trying next key...`);
        continue;
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      try {
        const paletteData = JSON.parse(content);
        displayGeneratedPalette(paletteData);
        return paletteData;
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Try to extract hex codes using regex as fallback
        const hexCodes = content.match(/#[0-9A-Fa-f]{6}/g);
        if (hexCodes && hexCodes.length >= 3) {
          const fallbackPalette = {
            name: `${palettePrompt.substring(0, 20)}...`,
            colors: hexCodes.slice(0, 5)
          };
          displayGeneratedPalette(fallbackPalette);
          return fallbackPalette;
        }
      }
    } catch (error) {
      console.error('Error generating palette:', error);
    }
  }
  
  // If all API keys fail, show an error
  resultContainer.innerHTML = `
    <div class="ai-error">
      <p>Sorry, we couldn't generate a palette at this time. Please try again later.</p>
    </div>
  `;
  
  return null;
}

// Function to display the generated palette
function displayGeneratedPalette(paletteData) {
  const resultContainer = document.getElementById('ai-result');
  resultContainer.innerHTML = '';
  
  if (!paletteData || !paletteData.colors || paletteData.colors.length === 0) {
    resultContainer.innerHTML = `
      <div class="ai-error">
        <p>Sorry, we couldn't generate a palette. Please try a different prompt.</p>
      </div>
    `;
    return;
  }
  
  // Create palette display
  const paletteElement = document.createElement('div');
  paletteElement.className = 'ai-palette';
  
  // Add color swatches
  paletteData.colors.forEach(color => {
    const colorElement = document.createElement('div');
    colorElement.className = 'ai-color';
    colorElement.style.backgroundColor = color;
    paletteElement.appendChild(colorElement);
  });
  
  // Add palette info
  const infoElement = document.createElement('div');
  infoElement.className = 'ai-palette-info';
  
  const nameElement = document.createElement('div');
  nameElement.className = 'ai-palette-name';
  nameElement.textContent = paletteData.name || 'Generated Palette';
  
  const hexElement = document.createElement('div');
  hexElement.className = 'ai-palette-hex';
  hexElement.textContent = paletteData.colors.join(' ');
  
  infoElement.appendChild(nameElement);
  infoElement.appendChild(hexElement);
  
  resultContainer.appendChild(paletteElement);
  resultContainer.appendChild(infoElement);
  
  // Enable the save button
  document.getElementById('ai-save').disabled = false;
}

// Function to save the generated palette
function saveGeneratedPalette() {
  const resultContainer = document.getElementById('ai-result');
  const paletteElement = resultContainer.querySelector('.ai-palette');
  const infoElement = resultContainer.querySelector('.ai-palette-info');
  
  if (!paletteElement || !infoElement) {
    alert('No palette to save. Please generate a palette first.');
    return;
  }
  
  const paletteName = infoElement.querySelector('.ai-palette-name').textContent;
  const hexCodes = infoElement.querySelector('.ai-palette-hex').textContent.split(' ');
  
  // Create a new palette object
  const newPalette = {
    id: colorPalettes.length + 1,
    name: paletteName,
    colors: hexCodes.map(hex => {
      const rgb = hexToRgb(hex);
      const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      const cmyk = hexToCmyk(hex);
      const cmykStr = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
      return { hex, rgb: rgbStr, cmyk: cmykStr };
    }),
    tags: ['ai-generated']
  };
  
  // Add the new palette to the collection
  colorPalettes.push(newPalette);
  
  // Refresh the palette display
  displayPalettes(colorPalettes);
  
  // Close the modal
  closeModal('ai-palette-modal');
  
  // Show a success message
  showNotification('Palette saved successfully!');
}

// Function to show a notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show the notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide and remove the notification after a delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize OpenAI palette generation
function initOpenAIPaletteGeneration() {
  const generateButton = document.getElementById('generate-palette');
  const aiModal = document.getElementById('ai-palette-modal');
  const aiGenerateButton = document.getElementById('ai-generate');
  const aiSaveButton = document.getElementById('ai-save');
  const aiPromptInput = document.getElementById('ai-prompt');
  
  // Open the AI palette modal when the generate button is clicked
  generateButton.addEventListener('click', () => {
    openModal('ai-palette-modal');
  });
  
  // Generate a palette when the AI generate button is clicked
  aiGenerateButton.addEventListener('click', () => {
    const prompt = aiPromptInput.value.trim();
    generatePaletteWithAI(prompt);
  });
  
  // Allow pressing Enter in the prompt input to generate
  aiPromptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const prompt = aiPromptInput.value.trim();
      generatePaletteWithAI(prompt);
    }
  });
  
  // Save the generated palette when the save button is clicked
  aiSaveButton.addEventListener('click', saveGeneratedPalette);
}

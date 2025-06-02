// Main JavaScript for Color Palette Website
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the application
  initApp();
});

// Global variables
let currentView = 'all'; // Default view
let currentVisualization = 'fluid-waves'; // Default visualization
let favorites = loadFavorites();
let filteredPalettes = [...colorPalettes];
let currentSort = 'name'; // Default sort

// Initialize the application
function initApp() {
  // Set up event listeners
  setupEventListeners();
  
  // Initialize the UI
  initializeUI();
  
  // Display palettes
  displayPalettes(colorPalettes);
  
  // Initialize OpenAI palette generation
  initOpenAIPaletteGeneration();
  
  // Check for dark mode preference
  checkDarkModePreference();
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const closeSidebar = document.getElementById('close-sidebar');
  
  mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    mobileMenuToggle.classList.toggle('active');
  });
  
  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('show');
    mobileMenuToggle.classList.remove('active');
  });
  
  // Navigation items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      currentView = item.dataset.view;
      updateView();
    });
  });
  
  // Visualization options
  const vizOptions = document.querySelectorAll('.viz-option');
  vizOptions.forEach(option => {
    option.addEventListener('click', () => {
      vizOptions.forEach(viz => viz.classList.remove('active'));
      option.classList.add('active');
      currentVisualization = option.dataset.viz;
      updateVisualization();
    });
  });
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleDarkMode);
  
  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterPalettes(searchTerm);
  });
  
  // Sort options
  const sortOptions = document.querySelectorAll('.sort-option');
  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(sort => sort.classList.remove('active'));
      option.classList.add('active');
      currentSort = option.dataset.sort;
      sortPalettes(currentSort);
      
      // Close the dropdown
      option.closest('.dropdown-menu').classList.remove('show');
    });
  });
  
  // Dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = toggle.nextElementSibling;
      dropdown.classList.toggle('show');
      toggle.classList.toggle('active');
      
      // Close other dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.nextElementSibling.classList.remove('show');
          otherToggle.classList.remove('active');
        }
      });
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    
    dropdownToggles.forEach(toggle => {
      toggle.classList.remove('active');
    });
  });
  
  // Modal close buttons
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal.id);
    });
  });
  
  // Modal backdrops
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.modal');
      closeModal(modal.id);
    });
  });
  
  // Prevent closing when clicking on modal content
  const modalContents = document.querySelectorAll('.modal-content');
  modalContents.forEach(content => {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}

// Initialize the UI
function initializeUI() {
  // Populate tag filters
  populateTagFilters();
}

// Populate tag filters
function populateTagFilters() {
  const tagFiltersContainer = document.getElementById('tag-filters');
  
  // Clear existing filters
  tagFiltersContainer.innerHTML = '';
  
  // Add all tags
  allTags.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.className = 'filter-tag';
    tagElement.textContent = tag;
    tagElement.dataset.tag = tag;
    
    tagElement.addEventListener('click', () => {
      tagElement.classList.toggle('active');
      filterByTags();
    });
    
    tagFiltersContainer.appendChild(tagElement);
  });
}

// Filter palettes by tags
function filterByTags() {
  const activeTags = Array.from(document.querySelectorAll('.filter-tag.active')).map(tag => tag.dataset.tag);
  
  if (activeTags.length === 0) {
    // If no tags are selected, show all palettes
    filteredPalettes = [...colorPalettes];
  } else {
    // Filter palettes that have at least one of the selected tags
    filteredPalettes = colorPalettes.filter(palette => {
      return palette.tags.some(tag => activeTags.includes(tag));
    });
  }
  
  // Apply current sort
  sortPalettes(currentSort);
  
  // Update the view
  updateView();
}

// Filter palettes by search term
function filterPalettes(searchTerm) {
  if (!searchTerm) {
    filteredPalettes = [...colorPalettes];
  } else {
    filteredPalettes = colorPalettes.filter(palette => {
      // Search in name
      if (palette.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      
      // Search in tags
      if (palette.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return true;
      }
      
      // Search in colors
      if (palette.colors.some(color => color.hex.toLowerCase().includes(searchTerm))) {
        return true;
      }
      
      return false;
    });
  }
  
  // Apply current sort
  sortPalettes(currentSort);
  
  // Update the view
  updateView();
}

// Sort palettes
function sortPalettes(sortBy) {
  switch (sortBy) {
    case 'name':
      filteredPalettes.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'id':
      filteredPalettes.sort((a, b) => a.id - b.id);
      break;
    case 'random':
      shuffleArray(filteredPalettes);
      break;
  }
  
  // Update the view
  updateView();
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Update the current view
function updateView() {
  const paletteGrid = document.getElementById('palette-grid');
  const singleColorGrid = document.getElementById('single-color-grid');
  
  switch (currentView) {
    case 'single-colors':
      paletteGrid.style.display = 'none';
      singleColorGrid.style.display = 'grid';
      displaySingleColors(allColors);
      break;
    case 'all':
      paletteGrid.style.display = 'grid';
      singleColorGrid.style.display = 'none';
      displayPalettes(filteredPalettes);
      break;
    case 'trending':
      paletteGrid.style.display = 'grid';
      singleColorGrid.style.display = 'none';
      // For demo purposes, trending is just the first 10 palettes
      displayPalettes(filteredPalettes.slice(0, 10));
      break;
    case 'favorites':
      paletteGrid.style.display = 'grid';
      singleColorGrid.style.display = 'none';
      displayFavorites();
      break;
  }
}

// Update visualization
function updateVisualization() {
  // This would update any active visualizations
  const visualizationContainers = document.querySelectorAll('.visualization-container');
  visualizationContainers.forEach(container => {
    if (container.dataset.palette) {
      const palette = JSON.parse(container.dataset.palette);
      renderVisualization(container, palette.colors.map(c => c.hex), currentVisualization);
    }
  });
}

// Display palettes
function displayPalettes(palettes) {
  const paletteGrid = document.getElementById('palette-grid');
  
  // Clear existing palettes
  paletteGrid.innerHTML = '';
  
  // Add palettes
  palettes.forEach(palette => {
    const paletteCard = document.createElement('div');
    paletteCard.className = 'palette-card glass';
    paletteCard.dataset.id = palette.id;
    
    const paletteColors = document.createElement('div');
    paletteColors.className = 'palette-colors';
    
    palette.colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'palette-color';
      colorDiv.style.backgroundColor = color.hex;
      paletteColors.appendChild(colorDiv);
    });
    
    const paletteInfo = document.createElement('div');
    paletteInfo.className = 'palette-info';
    
    const paletteName = document.createElement('h3');
    paletteName.className = 'palette-name';
    paletteName.textContent = palette.name;
    
    const paletteTags = document.createElement('div');
    paletteTags.className = 'palette-tags';
    
    palette.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'palette-tag';
      tagSpan.textContent = tag;
      paletteTags.appendChild(tagSpan);
    });
    
    paletteInfo.appendChild(paletteName);
    paletteInfo.appendChild(paletteTags);
    
    paletteCard.appendChild(paletteColors);
    paletteCard.appendChild(paletteInfo);
    
    // Add click event to show palette detail
    paletteCard.addEventListener('click', () => {
      showPaletteDetail(palette);
    });
    
    paletteGrid.appendChild(paletteCard);
  });
}

// Display single colors
function displaySingleColors(colors) {
  const singleColorGrid = document.getElementById('single-color-grid');
  
  // Clear existing colors
  singleColorGrid.innerHTML = '';
  
  // Add unique colors (no duplicates)
  const uniqueColors = [];
  const uniqueHexCodes = new Set();
  
  colors.forEach(color => {
    if (!uniqueHexCodes.has(color.hex)) {
      uniqueHexCodes.add(color.hex);
      uniqueColors.push(color);
    }
  });
  
  // Display unique colors
  uniqueColors.forEach(color => {
    const colorCard = document.createElement('div');
    colorCard.className = 'color-card glass';
    
    const colorSwatch = document.createElement('div');
    colorSwatch.className = 'color-swatch';
    colorSwatch.style.backgroundColor = color.hex;
    
    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-info';
    
    const colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = color.name || getColorName(color.hex);
    
    const colorHex = document.createElement('div');
    colorHex.className = 'color-hex';
    colorHex.textContent = color.hex;
    
    colorInfo.appendChild(colorName);
    colorInfo.appendChild(colorHex);
    
    colorCard.appendChild(colorSwatch);
    colorCard.appendChild(colorInfo);
    
    // Add click event to show color detail
    colorCard.addEventListener('click', () => {
      showColorDetail(color);
    });
    
    singleColorGrid.appendChild(colorCard);
  });
}

// Display favorites
function displayFavorites() {
  const favoritePalettes = colorPalettes.filter(palette => favorites.includes(palette.id.toString()));
  displayPalettes(favoritePalettes);
}

// Show palette detail
function showPaletteDetail(palette) {
  const modal = document.getElementById('palette-detail');
  const detailName = document.getElementById('detail-name');
  const detailTags = document.getElementById('detail-tags');
  const detailColors = document.getElementById('detail-colors');
  const visualizationContainer = modal.querySelector('.visualization-container');
  const favoriteButton = modal.querySelector('.favorite-button');
  
  // Set palette name
  detailName.textContent = palette.name;
  
  // Set tags
  detailTags.innerHTML = '';
  palette.tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tag;
    detailTags.appendChild(tagSpan);
  });
  
  // Set colors
  detailColors.innerHTML = '';
  palette.colors.forEach(color => {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    
    const colorSwatch = document.createElement('div');
    colorSwatch.className = 'color-item-swatch';
    colorSwatch.style.backgroundColor = color.hex;
    
    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-item-info';
    
    const colorHex = document.createElement('div');
    colorHex.className = 'color-item-hex';
    colorHex.textContent = color.hex;
    
    colorInfo.appendChild(colorHex);
    colorItem.appendChild(colorSwatch);
    colorItem.appendChild(colorInfo);
    
    // Add click event to show color detail
    colorItem.addEventListener('click', () => {
      showColorDetail(color);
    });
    
    detailColors.appendChild(colorItem);
  });
  
  // Set visualization
  visualizationContainer.dataset.palette = JSON.stringify(palette);
  renderVisualization(visualizationContainer, palette.colors.map(c => c.hex), currentVisualization);
  
  // Set favorite button state
  favoriteButton.classList.toggle('active', favorites.includes(palette.id.toString()));
  
  // Add favorite button event
  favoriteButton.onclick = () => {
    toggleFavorite(palette.id.toString());
    favoriteButton.classList.toggle('active', favorites.includes(palette.id.toString()));
  };
  
  // Set copy palette button event
  document.getElementById('copy-palette').onclick = () => {
    copyToClipboard(palette.colors.map(c => c.hex).join(', '));
    showNotification('Palette copied to clipboard!');
  };
  
  // Set download SVG button event
  document.getElementById('download-svg').onclick = () => {
    downloadPaletteSVG(palette);
  };
  
  // Set generate code button event
  document.getElementById('generate-code').onclick = () => {
    generatePaletteCode(palette);
  };
  
  // Show the modal
  openModal('palette-detail');
}

// Show color detail
function showColorDetail(color) {
  const modal = document.getElementById('color-detail');
  const detailColorSwatch = document.getElementById('detail-color-swatch');
  const detailColorName = document.getElementById('detail-color-name');
  const detailColorHex = document.getElementById('detail-color-hex');
  const detailColorRgb = document.getElementById('detail-color-rgb');
  const detailColorCmyk = document.getElementById('detail-color-cmyk');
  const detailColorHsl = document.getElementById('detail-color-hsl');
  const colorHarmonies = document.getElementById('color-harmonies');
  const colorCombinationsContainer = document.getElementById('color-combinations');
  
  // Set color swatch
  detailColorSwatch.style.backgroundColor = color.hex;
  
  // Set color name
  detailColorName.textContent = color.name || getColorName(color.hex);
  
  // Set color values
  detailColorHex.textContent = color.hex;
  detailColorRgb.textContent = color.rgb;
  detailColorCmyk.textContent = color.cmyk;
  
  // Calculate HSL
  const { h, s, l } = hexToHsl(color.hex);
  detailColorHsl.textContent = `${h}, ${s}%, ${l}%`;
  
  // Set color harmonies
  colorHarmonies.innerHTML = '';
  const harmonies = generateColorHarmonies(color.hex);
  
  // Add the original color
  const originalSwatch = document.createElement('div');
  originalSwatch.className = 'harmony-swatch';
  originalSwatch.style.backgroundColor = color.hex;
  colorHarmonies.appendChild(originalSwatch);
  
  // Add complementary
  const complementarySwatch = document.createElement('div');
  complementarySwatch.className = 'harmony-swatch';
  complementarySwatch.style.backgroundColor = harmonies.complementary;
  colorHarmonies.appendChild(complementarySwatch);
  
  // Add analogous
  harmonies.analogous.forEach(analogous => {
    const analogousSwatch = document.createElement('div');
    analogousSwatch.className = 'harmony-swatch';
    analogousSwatch.style.backgroundColor = analogous;
    colorHarmonies.appendChild(analogousSwatch);
  });
  
  // Display color combinations
  displayColorCombinations(color.hex, colorCombinationsContainer.querySelector('.combinations-container'));
  
  // Set copy color button event
  document.getElementById('copy-color').onclick = () => {
    copyToClipboard(color.hex);
    showNotification('Color copied to clipboard!');
  };
  
  // Set add to palette button event
  document.getElementById('add-to-palette').onclick = () => {
    // This would be implemented in a real app
    showNotification('Feature coming soon!');
  };
  
  // Show the modal
  openModal('color-detail');
}

// Render visualization
function renderVisualization(container, colors, type) {
  // Clear the container
  container.innerHTML = '';
  
  switch (type) {
    case 'fluid-waves':
      renderFluidWaves(container, colors);
      break;
    case 'glass-morphism':
      renderGlassMorphism(container, colors);
      break;
    case 'gradient-blend':
      renderGradientBlend(container, colors);
      break;
    case 'neon-glow':
      renderNeonGlow(container, colors);
      break;
  }
}

// Render fluid waves visualization
function renderFluidWaves(container, colors) {
  const fluidWaves = document.createElement('div');
  fluidWaves.className = 'fluid-waves';
  
  colors.forEach((color, index) => {
    const wave = document.createElement('div');
    wave.className = 'wave';
    wave.style.backgroundColor = color;
    wave.style.animationDelay = `${index * 0.5}s`;
    fluidWaves.appendChild(wave);
  });
  
  container.appendChild(fluidWaves);
}

// Render glass morphism visualization
function renderGlassMorphism(container, colors) {
  const glassMorph = document.createElement('div');
  glassMorph.className = 'glass-morph';
  
  // Set background gradient
  glassMorph.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
  
  // Add glass shapes
  colors.forEach((color, index) => {
    const shape = document.createElement('div');
    shape.className = 'glass-shape';
    shape.style.width = `${30 + index * 10}%`;
    shape.style.height = `${30 + index * 10}%`;
    shape.style.top = `${10 + index * 15}%`;
    shape.style.left = `${10 + index * 15}%`;
    shape.style.backgroundColor = `${color}33`; // Add transparency
    shape.style.animationDelay = `${index * 0.7}s`;
    glassMorph.appendChild(shape);
  });
  
  container.appendChild(glassMorph);
}

// Render gradient blend visualization
function renderGradientBlend(container, colors) {
  const gradientBlend = document.createElement('div');
  gradientBlend.className = 'gradient-blend';
  
  // Create a gradient with all colors
  gradientBlend.style.background = `linear-gradient(45deg, ${colors.join(', ')})`;
  
  container.appendChild(gradientBlend);
}

// Render neon glow visualization
function renderNeonGlow(container, colors) {
  const neonGlow = document.createElement('div');
  neonGlow.className = 'neon-glow';
  
  colors.forEach((color, index) => {
    const line = document.createElement('div');
    line.className = 'neon-line';
    line.style.backgroundColor = color;
    line.style.color = color;
    line.style.width = '80%';
    line.style.left = '10%';
    line.style.top = `${20 + index * 30}%`;
    line.style.animationDelay = `${index * 0.3}s`;
    neonGlow.appendChild(line);
  });
  
  container.appendChild(neonGlow);
}

// Open a modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-theme');
  
  // Save preference
  const isDarkMode = document.body.classList.contains('dark-theme');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update toggle text
  const toggleText = document.querySelector('.toggle-text');
  toggleText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

// Check dark mode preference
function checkDarkModePreference() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    document.querySelector('.toggle-text').textContent = 'Light Mode';
  }
}

// Toggle favorite
function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  
  if (index === -1) {
    // Add to favorites
    favorites.push(id);
  } else {
    // Remove from favorites
    favorites.splice(index, 1);
  }
  
  // Save favorites
  saveFavorites();
  
  // Update view if in favorites view
  if (currentView === 'favorites') {
    updateView();
  }
}

// Load favorites from local storage
function loadFavorites() {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

// Save favorites to local storage
function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Copy to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Download palette as SVG
function downloadPaletteSVG(palette) {
  const colors = palette.colors.map(c => c.hex);
  const width = 800;
  const height = 400;
  const colorWidth = width / colors.length;
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  
  // Add color rectangles
  colors.forEach((color, index) => {
    svgContent += `<rect x="${index * colorWidth}" y="0" width="${colorWidth}" height="${height}" fill="${color}" />`;
  });
  
  // Add palette name
  svgContent += `<text x="10" y="${height - 20}" font-family="Arial" font-size="24" fill="white">${palette.name}</text>`;
  
  // Add color hex values
  colors.forEach((color, index) => {
    svgContent += `<text x="${index * colorWidth + colorWidth / 2}" y="${height / 2}" font-family="Arial" font-size="16" fill="white" text-anchor="middle">${color}</text>`;
  });
  
  svgContent += '</svg>';
  
  // Create a blob and download
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${palette.name.replace(/\s+/g, '-').toLowerCase()}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate palette code
function generatePaletteCode(palette) {
  const colors = palette.colors.map(c => c.hex);
  
  // Create code snippets
  const cssCode = colors.map((color, index) => `--color-${index + 1}: ${color};`).join('\n');
  const sassCode = colors.map((color, index) => `$color-${index + 1}: ${color};`).join('\n');
  const tailwindCode = `extend: {\n  colors: {\n${colors.map((color, index) => `    'custom-${index + 1}': '${color}',`).join('\n')}\n  }\n}`;
  
  // Show in a notification or modal (simplified for demo)
  alert(`CSS Variables:\n${cssCode}\n\nSASS Variables:\n${sassCode}\n\nTailwind Config:\n${tailwindCode}`);
}

// Show notification
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

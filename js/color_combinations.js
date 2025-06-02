// Color Combinations Logic
const colorCombinations = {
  // Function to generate complementary color
  complementary: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(`hsl(${(h + 180) % 360}, ${s}%, ${l}%)`);
  },
  
  // Function to generate analogous colors
  analogous: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${(h + 30) % 360}, ${s}%, ${l}%)`),
      hslToHex(`hsl(${(h + 330) % 360}, ${s}%, ${l}%)`)
    ];
  },
  
  // Function to generate triadic colors
  triadic: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${(h + 120) % 360}, ${s}%, ${l}%)`),
      hslToHex(`hsl(${(h + 240) % 360}, ${s}%, ${l}%)`)
    ];
  },
  
  // Function to generate split complementary colors
  splitComplementary: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${(h + 150) % 360}, ${s}%, ${l}%)`),
      hslToHex(`hsl(${(h + 210) % 360}, ${s}%, ${l}%)`)
    ];
  },
  
  // Function to generate tetradic colors
  tetradic: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${(h + 90) % 360}, ${s}%, ${l}%)`),
      hslToHex(`hsl(${(h + 180) % 360}, ${s}%, ${l}%)`),
      hslToHex(`hsl(${(h + 270) % 360}, ${s}%, ${l}%)`)
    ];
  },
  
  // Function to generate monochromatic colors
  monochromatic: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${h}, ${s}%, ${Math.max(0, l - 30)}%)`),
      hslToHex(`hsl(${h}, ${s}%, ${Math.min(100, l + 30)}%)`)
    ];
  },
  
  // Function to generate shades (darker versions)
  shades: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${h}, ${s}%, ${Math.max(0, l - 20)}%)`),
      hslToHex(`hsl(${h}, ${s}%, ${Math.max(0, l - 40)}%)`)
    ];
  },
  
  // Function to generate tints (lighter versions)
  tints: function(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [
      hslToHex(`hsl(${h}, ${s}%, ${Math.min(100, l + 20)}%)`),
      hslToHex(`hsl(${h}, ${s}%, ${Math.min(100, l + 40)}%)`)
    ];
  }
};

// Function to get all color combinations for a given color
function getAllColorCombinations(hex) {
  return {
    complementary: colorCombinations.complementary(hex),
    analogous: colorCombinations.analogous(hex),
    triadic: colorCombinations.triadic(hex),
    splitComplementary: colorCombinations.splitComplementary(hex),
    tetradic: colorCombinations.tetradic(hex),
    monochromatic: colorCombinations.monochromatic(hex),
    shades: colorCombinations.shades(hex),
    tints: colorCombinations.tints(hex)
  };
}

// Function to display color combinations in the UI
function displayColorCombinations(hex, container) {
  const combinations = getAllColorCombinations(hex);
  
  // Clear the container
  container.innerHTML = '';
  
  // Create a section for each combination type
  const combinationTypes = [
    { name: 'Complementary', colors: [hex, combinations.complementary] },
    { name: 'Analogous', colors: [hex, ...combinations.analogous] },
    { name: 'Triadic', colors: [hex, ...combinations.triadic] },
    { name: 'Split Complementary', colors: [hex, ...combinations.splitComplementary] },
    { name: 'Tetradic', colors: [hex, ...combinations.tetradic] },
    { name: 'Monochromatic', colors: [hex, ...combinations.monochromatic] },
    { name: 'Shades', colors: [hex, ...combinations.shades] },
    { name: 'Tints', colors: [hex, ...combinations.tints] }
  ];
  
  combinationTypes.forEach(type => {
    const combinationItem = document.createElement('div');
    combinationItem.className = 'combination-item';
    
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'combination-colors';
    
    type.colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'combination-color';
      colorDiv.style.backgroundColor = color;
      colorsDiv.appendChild(colorDiv);
    });
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'combination-info';
    infoDiv.textContent = type.name;
    
    combinationItem.appendChild(colorsDiv);
    combinationItem.appendChild(infoDiv);
    
    // Add click event to view this combination as a palette
    combinationItem.addEventListener('click', () => {
      // Create a temporary palette from this combination
      const tempPalette = {
        id: 'temp-' + Date.now(),
        name: `${getColorName(hex)} ${type.name}`,
        colors: type.colors.map(color => {
          const rgb = hexToRgb(color);
          const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
          const cmyk = hexToCmyk(color);
          const cmykStr = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
          return { hex: color, rgb: rgbStr, cmyk: cmykStr };
        }),
        tags: ['combination', type.name.toLowerCase()]
      };
      
      // Show this palette in the palette detail modal
      showPaletteDetail(tempPalette);
    });
    
    container.appendChild(combinationItem);
  });
}

// Color Palettes Data
const colorPalettes = [
  // Palette 1 - Maya Blue, Prussian Blue, Celadon
  {
    id: 1,
    name: "Ocean Depths",
    colors: [
      { hex: "#55C1FF", rgb: "85, 193, 255", cmyk: "67, 24, 0, 0" },
      { hex: "#102E4A", rgb: "16, 46, 74", cmyk: "78, 38, 0, 71" },
      { hex: "#AFE3C0", rgb: "175, 227, 192", cmyk: "23, 0, 15, 11" }
    ],
    tags: ["blue", "cool", "tranquil"]
  },
  // Palette 2 - Maize, Atomic Tangerine, Blush
  {
    id: 2,
    name: "Sunset Glow",
    colors: [
      { hex: "#FEE440", rgb: "254, 228, 64", cmyk: "0, 10, 75, 0" },
      { hex: "#FCA17D", rgb: "252, 161, 125", cmyk: "0, 36, 50, 1" },
      { hex: "#DA627D", rgb: "218, 98, 125", cmyk: "0, 55, 43, 15" }
    ],
    tags: ["warm", "vibrant", "sunset"]
  },
  // Palette 3 - Plum, Celadon, Tiffany Blue
  {
    id: 3,
    name: "Spring Garden",
    colors: [
      { hex: "#9A348E", rgb: "154, 52, 142", cmyk: "0, 66, 8, 40" },
      { hex: "#AFE3C0", rgb: "175, 227, 192", cmyk: "23, 0, 15, 11" },
      { hex: "#97EAD2", rgb: "151, 234, 210", cmyk: "36, 0, 10, 8" }
    ],
    tags: ["contrast", "fresh", "spring"]
  },
  // Palette 4 - Indigo, Rusty Red, Sunglow
  {
    id: 4,
    name: "Bold Contrast",
    colors: [
      { hex: "#540D6E", rgb: "84, 13, 110", cmyk: "24, 88, 0, 57" },
      { hex: "#DC2E3F", rgb: "220, 46, 63", cmyk: "0, 79, 71, 14" },
      { hex: "#FFD23F", rgb: "255, 210, 63", cmyk: "0, 18, 75, 0" }
    ],
    tags: ["bold", "vibrant", "contrast"]
  },
  // Palette 5 - Lavender Blush, Tiffany Blue, Indigo Dye
  {
    id: 5,
    name: "Pastel Dreams",
    colors: [
      { hex: "#F6E8EA", rgb: "246, 232, 234", cmyk: "0, 6, 5, 4" },
      { hex: "#97EAD2", rgb: "151, 234, 210", cmyk: "36, 0, 10, 8" },
      { hex: "#08415C", rgb: "8, 65, 92", cmyk: "91, 29, 0, 64" }
    ],
    tags: ["pastel", "contrast", "serene"]
  },
  // Palette 6 - Cherry Blossom Pink, Light Coral, Thulian Pink
  {
    id: 6,
    name: "Pink Paradise",
    colors: [
      { hex: "#F7B2B7", rgb: "247, 178, 183", cmyk: "0, 28, 26, 3" },
      { hex: "#F7717D", rgb: "247, 113, 125", cmyk: "0, 54, 49, 3" },
      { hex: "#DE639A", rgb: "222, 99, 154", cmyk: "0, 55, 31, 13" }
    ],
    tags: ["pink", "feminine", "soft"]
  },
  // Palette 7 - Mardi Gras, Dark Purple, Indigo Dye
  {
    id: 7,
    name: "Royal Depth",
    colors: [
      { hex: "#7F2982", rgb: "127, 41, 130", cmyk: "2, 68, 0, 49" },
      { hex: "#16001E", rgb: "22, 0, 30", cmyk: "27, 100, 0, 88" },
      { hex: "#08415C", rgb: "8, 65, 92", cmyk: "91, 29, 0, 64" }
    ],
    tags: ["dark", "royal", "deep"]
  },
  // Palette 8 - Blue Munsell, Aquamarine, Lavender Web
  {
    id: 8,
    name: "Ocean Breeze",
    colors: [
      { hex: "#388697", rgb: "56, 134, 151", cmyk: "63, 11, 0, 41" },
      { hex: "#B5FFE1", rgb: "181, 255, 225", cmyk: "29, 0, 12, 0" },
      { hex: "#DAD4EF", rgb: "218, 212, 239", cmyk: "9, 11, 0, 6" }
    ],
    tags: ["blue", "aqua", "calming"]
  },
  // Palette 9 - Bright Pink, Aquamarine, Blue Munsell
  {
    id: 9,
    name: "Tropical Splash",
    colors: [
      { hex: "#FC6471", rgb: "252, 100, 113", cmyk: "0, 60, 55, 1" },
      { hex: "#B5FFE1", rgb: "181, 255, 225", cmyk: "29, 0, 12, 0" },
      { hex: "#388697", rgb: "56, 134, 151", cmyk: "63, 11, 0, 41" }
    ],
    tags: ["tropical", "vibrant", "fresh"]
  },
  // Palette 10 - Mocha Mousse, Sage Green, Cream
  {
    id: 10,
    name: "Earthy Comfort",
    colors: [
      { hex: "#3C280D", rgb: "60, 40, 13", cmyk: "0, 33, 78, 76" },
      { hex: "#7D8C6D", rgb: "125, 140, 109", cmyk: "11, 0, 22, 45" },
      { hex: "#F9F5E3", rgb: "249, 245, 227", cmyk: "0, 2, 9, 2" }
    ],
    tags: ["earthy", "natural", "warm"]
  },
  // Palette 11 - Dusty Rose, Cherry Red, Butter Yellow
  {
    id: 11,
    name: "Elegant Contrast",
    colors: [
      { hex: "#C9ADA7", rgb: "201, 173, 167", cmyk: "0, 14, 17, 21" },
      { hex: "#A22522", rgb: "162, 37, 34", cmyk: "0, 77, 79, 36" },
      { hex: "#F3DE8A", rgb: "243, 222, 138", cmyk: "0, 9, 43, 5" }
    ],
    tags: ["elegant", "contrast", "sophisticated"]
  },
  // Palette 12 - Khaki, Pale Blue, White
  {
    id: 12,
    name: "Coastal Calm",
    colors: [
      { hex: "#BFB48F", rgb: "191, 180, 143", cmyk: "0, 6, 25, 25" },
      { hex: "#A4C2F4", rgb: "164, 194, 244", cmyk: "33, 20, 0, 4" },
      { hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0" }
    ],
    tags: ["coastal", "calm", "light"]
  },
  // Palette 13 - Terracotta, White, Sage
  {
    id: 13,
    name: "Mediterranean",
    colors: [
      { hex: "#CD5D31", rgb: "205, 93, 49", cmyk: "0, 55, 76, 20" },
      { hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0" },
      { hex: "#8A9A5B", rgb: "138, 154, 91", cmyk: "10, 0, 41, 40" }
    ],
    tags: ["mediterranean", "warm", "natural"]
  },
  // Palette 14 - Ruby Red, Emerald Green, Sapphire Blue
  {
    id: 14,
    name: "Jewel Tones",
    colors: [
      { hex: "#E0115F", rgb: "224, 17, 95", cmyk: "0, 92, 58, 12" },
      { hex: "#046307", rgb: "4, 99, 7", cmyk: "96, 0, 93, 61" },
      { hex: "#0F52BA", rgb: "15, 82, 186", cmyk: "92, 56, 0, 27" }
    ],
    tags: ["jewel", "rich", "vibrant"]
  },
  // Palette 15 - Honeyed Neutrals, Serene Blue, Ruby Red
  {
    id: 15,
    name: "Balanced Contrast",
    colors: [
      { hex: "#D0B49F", rgb: "208, 180, 159", cmyk: "0, 13, 24, 18" },
      { hex: "#4A6D7C", rgb: "74, 109, 124", cmyk: "40, 12, 0, 51" },
      { hex: "#C32148", rgb: "195, 33, 72", cmyk: "0, 83, 63, 24" }
    ],
    tags: ["balanced", "sophisticated", "contrast"]
  },
  // Palette 16 - Mint Green, Coral, Navy Blue
  {
    id: 16,
    name: "Coastal Sunset",
    colors: [
      { hex: "#98D7C2", rgb: "152, 215, 194", cmyk: "29, 0, 10, 16" },
      { hex: "#FF7F50", rgb: "255, 127, 80", cmyk: "0, 50, 69, 0" },
      { hex: "#1B365D", rgb: "27, 54, 93", cmyk: "71, 42, 0, 64" }
    ],
    tags: ["coastal", "sunset", "contrast"]
  },
  // Palette 17 - Lavender, Mint, Peach
  {
    id: 17,
    name: "Soft Pastels",
    colors: [
      { hex: "#D8B4E2", rgb: "216, 180, 226", cmyk: "4, 20, 0, 11" },
      { hex: "#B2EBD6", rgb: "178, 235, 214", cmyk: "24, 0, 9, 8" },
      { hex: "#FFD8BE", rgb: "255, 216, 190", cmyk: "0, 15, 25, 0" }
    ],
    tags: ["pastel", "soft", "gentle"]
  },
  // Palette 18 - Charcoal, Teal, Coral
  {
    id: 18,
    name: "Modern Contrast",
    colors: [
      { hex: "#2F4550", rgb: "47, 69, 80", cmyk: "41, 14, 0, 69" },
      { hex: "#2E8B99", rgb: "46, 139, 153", cmyk: "70, 9, 0, 40" },
      { hex: "#F26D5B", rgb: "242, 109, 91", cmyk: "0, 55, 62, 5" }
    ],
    tags: ["modern", "contrast", "bold"]
  },
  // Palette 19 - Forest Green, Mustard Yellow, Burgundy
  {
    id: 19,
    name: "Autumn Harvest",
    colors: [
      { hex: "#2C5F2D", rgb: "44, 95, 45", cmyk: "54, 0, 53, 63" },
      { hex: "#FFB30F", rgb: "255, 179, 15", cmyk: "0, 30, 94, 0" },
      { hex: "#97033F", rgb: "151, 3, 63", cmyk: "0, 98, 58, 41" }
    ],
    tags: ["autumn", "harvest", "rich"]
  },
  // Palette 20 - Sky Blue, Cloud White, Sunshine Yellow
  {
    id: 20,
    name: "Clear Skies",
    colors: [
      { hex: "#87CEEB", rgb: "135, 206, 235", cmyk: "43, 12, 0, 8" },
      { hex: "#F0F8FF", rgb: "240, 248, 255", cmyk: "6, 3, 0, 0" },
      { hex: "#FFDD33", rgb: "255, 221, 51", cmyk: "0, 13, 80, 0" }
    ],
    tags: ["sky", "bright", "cheerful"]
  }
];

// Extract all unique tags from palettes
const allTags = [...new Set(colorPalettes.flatMap(palette => palette.tags))];

// Extract all unique colors from palettes
const allColors = [];
colorPalettes.forEach(palette => {
  palette.colors.forEach(color => {
    const colorName = getColorName(color.hex);
    allColors.push({
      hex: color.hex,
      rgb: color.rgb,
      cmyk: color.cmyk,
      name: colorName
    });
  });
});

// Function to get a color name based on hex value
function getColorName(hex) {
  // This is a simplified version - in a real app, you'd use a more comprehensive color naming library
  const colorMap = {
    "#000000": "Black",
    "#FFFFFF": "White",
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#FF00FF": "Magenta",
    "#00FFFF": "Cyan",
    "#FFA500": "Orange",
    "#800080": "Purple",
    "#008000": "Green",
    "#800000": "Maroon",
    "#808000": "Olive",
    "#008080": "Teal",
    "#000080": "Navy",
    "#FFC0CB": "Pink",
    "#A52A2A": "Brown",
    "#808080": "Gray"
  };
  
  // Return the color name if it exists in our map, otherwise return a generic name
  if (colorMap[hex.toUpperCase()]) {
    return colorMap[hex.toUpperCase()];
  }
  
  // Parse the hex value
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Determine if it's a shade of a primary/secondary color
  if (r > 200 && g < 100 && b < 100) return "Red";
  if (r < 100 && g > 200 && b < 100) return "Green";
  if (r < 100 && g < 100 && b > 200) return "Blue";
  if (r > 200 && g > 200 && b < 100) return "Yellow";
  if (r > 200 && g < 100 && b > 200) return "Magenta";
  if (r < 100 && g > 200 && b > 200) return "Cyan";
  if (r > 200 && g > 100 && b < 100) return "Orange";
  if (r > 100 && g < 100 && b > 100) return "Purple";
  if (r < 100 && g < 100 && b < 100) return "Black";
  if (r > 200 && g > 200 && b > 200) return "White";
  
  // If we can't determine a specific color, return a generic name based on the hex
  return `Color ${hex.substring(1, 7)}`;
}

// Function to convert hex to RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Function to convert hex to HSL
function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

// Function to convert hex to CMYK
function hexToCmyk(hex) {
  const { r, g, b } = hexToRgb(hex);
  
  // Convert RGB to CMYK
  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  let k = Math.min(c, m, y);
  
  if (k === 1) {
    c = m = y = 0;
  } else {
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  }
  
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}

// Function to generate color harmonies
function generateColorHarmonies(hex) {
  const { h, s, l } = hexToHsl(hex);
  
  // Complementary: opposite on the color wheel
  const complementary = `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`;
  
  // Analogous: adjacent on the color wheel
  const analogous1 = `hsl(${(h + 30) % 360}, ${s}%, ${l}%)`;
  const analogous2 = `hsl(${(h + 330) % 360}, ${s}%, ${l}%)`;
  
  // Triadic: three colors evenly spaced
  const triadic1 = `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`;
  const triadic2 = `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`;
  
  // Split complementary
  const splitComp1 = `hsl(${(h + 150) % 360}, ${s}%, ${l}%)`;
  const splitComp2 = `hsl(${(h + 210) % 360}, ${s}%, ${l}%)`;
  
  // Tetradic: four colors as two complementary pairs
  const tetradic1 = `hsl(${(h + 90) % 360}, ${s}%, ${l}%)`;
  const tetradic2 = `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`;
  const tetradic3 = `hsl(${(h + 270) % 360}, ${s}%, ${l}%)`;
  
  return {
    complementary: hslToHex(complementary),
    analogous: [hslToHex(analogous1), hslToHex(analogous2)],
    triadic: [hslToHex(triadic1), hslToHex(triadic2)],
    splitComplementary: [hslToHex(splitComp1), hslToHex(splitComp2)],
    tetradic: [hslToHex(tetradic1), hslToHex(tetradic2), hslToHex(tetradic3)]
  };
}

// Helper function to convert HSL string to hex
function hslToHex(hslStr) {
  // Parse HSL string
  const hslRegex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const hslRegex2 = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  
  let match = hslStr.match(hslRegex);
  if (!match) {
    match = hslStr.match(hslRegex2);
  }
  
  if (!match) {
    return "#000000"; // Default to black if parsing fails
  }
  
  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;
  
  // Convert HSL to RGB
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  // Convert RGB to hex
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Check if the color is in RGB format
const isRgb = (color: string) => /^rgb\(/.test(color);

// Convert Hex to RGB
const hexToRgb = (hex: string) => {
  // Remove the hash (#) if present
  hex = hex.replace(/^#/, "");

  // Parse the color string
  let r: number, g: number, b: number;

  // Check if it's a shorthand hex like #fff
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error("Invalid hex color");
  }

  return `rgb(${r}, ${g}, ${b})`;
};

// Convert RGB to RGB (ensure it's in the correct format)
const normalizeRgb = (rgb: string) => {
  const result = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);

  if (!result) {
    throw new Error("Invalid RGB color");
  }

  return `rgb(${
    (parseInt(result[1]), parseInt(result[2]), parseInt(result[3]))
  })`;
};

// Utility function to handle both hex and rgb
const convertToRgb = (color: string) => {
  if (isRgb(color)) {
    return normalizeRgb(color);
  }

  return hexToRgb(color);
};

// Helper function to lighten a color by a factor
export const lightVariation = (color = "#1ea7fd", factor: number) => {
  let [r, g, b] = convertToRgb(color)
    .replace(/^rgb\((\d+), (\d+), (\d+)\)$/, "$1 $2 $3")
    .split(" ")
    .map(Number);

  return `rgb(${r}, ${g}, ${b},${factor})`;
};

// Helper function to darken a color by a factor
export const darkVariation = (color = "#1ea7fd", factor: number) => {
  let [r, g, b] = convertToRgb(color)
    .replace(/^rgb\((\d+), (\d+), (\d+)\)$/, "$1 $2 $3")
    .split(" ")
    .map(Number);

  r = Math.max(0, r - factor);
  g = Math.max(0, g - factor);
  b = Math.max(0, b - factor);

  return `rgb(${r}, ${g}, ${b})`;
};

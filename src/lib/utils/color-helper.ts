// Color code to Vietnamese name mapping for polycarbonate products
// These hex codes match the colorMap in polycarbonate-data.ts
const colorNameMap: Record<string, string> = {
  // Polycarbonate specific colors from product data
  "#E8F4F8": "Trắng trong",
  "#e8f4f8": "Trắng trong",
  "#3481B8": "Xanh hồ",
  "#3481b8": "Xanh hồ",
  "#F4F4F4": "Trắng đục",
  "#f4f4f4": "Trắng đục",
  "#114232": "Xanh lá",
  "#45322E": "Nâu trà",
  "#45322e": "Nâu trà",
  "#555D61": "Xám khói",
  "#555d61": "Xám khói",

  // Additional common colors
  "#FFFFFF": "Trắng trong",
  "#ffffff": "Trắng trong",
  "#F5F5F5": "Trắng đục",
  "#f5f5f5": "Trắng đục",
  "#FAFAFA": "Trắng trong",
  "#fafafa": "Trắng trong",
  "#E8E8E8": "Trắng sữa",
  "#e8e8e8": "Trắng sữa",

  // Xanh hồ / Xanh ngọc / Xanh biển
  "#87CEEB": "Xanh hồ",
  "#87ceeb": "Xanh hồ",
  "#ADD8E6": "Xanh hồ nhạt",
  "#add8e6": "Xanh hồ nhạt",
  "#4169E1": "Xanh ngọc",
  "#4169e1": "Xanh ngọc",
  "#00CED1": "Xanh hồ",
  "#00ced1": "Xanh hồ",
  "#0000FF": "Xanh dương",
  "#0000ff": "Xanh dương",

  // Xanh lá
  "#00FF00": "Xanh lá",
  "#00ff00": "Xanh lá",
  "#228B22": "Xanh lục",
  "#228b22": "Xanh lục",
  "#32CD32": "Xanh lá cây",
  "#32cd32": "Xanh lá cây",
  "#006400": "Xanh lá đậm",

  // Nâu / Trà
  "#E8DCC8": "Trà sữa",
  "#e8dcc8": "Trà sữa",
  "#D4C4A8": "Trà sữa",
  "#d4c4a8": "Trà sữa",
  "#DEB887": "Trà sữa",
  "#deb887": "Trà sữa",
  "#8B4513": "Nâu đất",
  "#8b4513": "Nâu đất",
  "#D2691E": "Nâu cam",
  "#d2691e": "Nâu cam",

  // Xám / Khói
  "#808080": "Xám",
  "#A9A9A9": "Xám khói",
  "#a9a9a9": "Xám khói",
  "#696969": "Xám đậm",
  "#C0C0C0": "Bạc",
  "#c0c0c0": "Bạc",
  "#D3D3D3": "Xám nhạt",
  "#d3d3d3": "Xám nhạt",

  // Vàng
  "#FFFF00": "Vàng",
  "#ffff00": "Vàng",
  "#FFD700": "Vàng gold",
  "#ffd700": "Vàng gold",

  // Cam
  "#FFA500": "Cam",
  "#ffa500": "Cam",

  // Đỏ
  "#FF0000": "Đỏ",
  "#ff0000": "Đỏ",

  // Đen / Trong suốt
  "#000000": "Đen",
  "transparent": "Trong suốt",
};

/**
 * Convert color code (hex) to Vietnamese color name
 * If no mapping found, returns the original color code
 */
export const getColorName = (colorCode: string): string => {
  // Check if it's already a readable name (not a hex code)
  if (!colorCode.startsWith("#") && colorCode !== "transparent") {
    return colorCode;
  }

  return colorNameMap[colorCode] || colorNameMap[colorCode.toLowerCase()] || colorCode;
};

/**
 * Format price with /m² suffix
 */
export const formatPricePerM2 = (price: string): string => {
  // Remove existing /m² if present to avoid duplication
  const cleanPrice = price.replace(/\/m²/g, "").trim();
  return `${cleanPrice}/m²`;
};

/**
 * Calculates luminance of a hex color to determine if text should be dark or light
 * @param {string} hexColor - Color in hex format (#RRGGBB)
 * @returns {string} - Returns "#FFFFFF" for light text or "#000000" for dark text
 */
export const getContrastTextColor = (hexColor) => {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If luminance > 0.5, it's a light color, use dark text
  // Otherwise, it's a dark color, use light text
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

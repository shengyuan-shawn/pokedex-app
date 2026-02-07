import api from "./axiosInstance";

// export const getPokemon = async (name: string) => {
//   try {
//     const response = await api.get(`pokemon/${name.toLowerCase()}`);
//     return response.data;
//   } catch (err) {
//     console.error("API Error: ", err);
//     throw err;
//   }
// };

export const getPokemon = async (searchTerm: string) => {
  const name = searchTerm.toLowerCase().trim().replace(/\s+/g, "-");

  try {
    // First, try to fetch as a Pokemon name
    try {
      const response = await api.get(`pokemon/${name}`);
      return response.data;
    } catch (pokemonErr) {
      // If Pokemon not found, try as species name
      const speciesResponse = await api.get(`pokemon-species/${name}`);
      const speciesData = speciesResponse.data;

      // Get the base form
      const pokemonName = speciesData.varieties[0].pokemon.name;
      const pokemonResponse = await api.get(`pokemon/${pokemonName}`);
      return pokemonResponse.data;
    }
  } catch (err) {
    console.error("API Error: ", err);
    throw err;
  }
};

export const getPokemonList = async (limit: number, offset: number) => {
  try {
    const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (err) {
    console.error("API Error: ", err);
    throw err;
  }
};

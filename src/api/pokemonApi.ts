import api from "./axiosInstance";

export const getPokemon = async (name: string) => {
  try {
    const response = await api.get(`pokemon/${name.toLowerCase()}`);
    return response.data;
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

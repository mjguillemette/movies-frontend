import axios from 'axios';

const API_URL = 'https://reimagined-zebra-r76j4vjjvwxh6g-5154.app.github.dev';

export const getAllMovies = async () => {
  return await axios.get(`${API_URL}/api/movies`);
};

export const searchMovies = async (query: string) => {
  return await axios.get(`${API_URL}/api/movies/search`, {
    params: { title: query }
  });
};

export const checkoutMovie = async (title: string, amount: number) => {
  return await axios.post(`${API_URL}/api/movies/checkout`, { title, amount });
};

export const returnMovie = async (title: string, amount: number) => {
  return await axios.post(`${API_URL}/api/movies/return`, { title, amount });
};

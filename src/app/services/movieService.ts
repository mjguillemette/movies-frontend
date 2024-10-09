import axios from 'axios';

// Change to accommodate backend service - backend defaults to port 5154
const API_URL = 'http://localhost:5154'; 

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

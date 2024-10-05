import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = "api_key=" + import.meta.env.VITE_API_KEY;

export const moviesList = async (pageNumber: number) => {
  try {
    const response = await axios.get(
      `${API_URL}discover/movie?${API_KEY}&page=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const movieGenreList = async () => {
  try {
    const response = await axios.get(`${API_URL}genre/movie/list?${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const moviesPopularCarousel = async () => {
  try {
    const response = await axios.get(`${API_URL}movie/popular?${API_KEY}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching movie data:", error);
    throw error;
  }
};

export const moviesSearchByTitle = async (
  title: string,
  pageNumber: number
) => {
  try {
    const response = await axios.get(
      `${API_URL}search/movie?query=${title}&${API_KEY}&page=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching movie data:", error);
    throw error;
  }
};

export const movieDetailById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}movie/${id}?${API_KEY}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching movie data:", error);
    throw error;
  }
};

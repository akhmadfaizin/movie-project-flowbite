import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieGenreList } from "../../api/movieApi";

interface GenreState {
  genres: Array<{ id: number; name: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: GenreState = {
  genres: [],
  loading: false,
  error: null,
};

// Async thunk for fetching genres
export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await movieGenreList(); // Call your API
  return response.genres;
});

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.loading = false;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch genres";
        state.loading = false;
      });
  },
});

export default genreSlice.reducer;

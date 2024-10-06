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

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (_, { getState }) => {
    const state = getState() as { genres: GenreState };
    if (state.genres.genres.length > 0) {
      // If genres are already in the state, don't fetch again
      return state.genres.genres;
    }
    const response = await movieGenreList();
    return response.genres;
  }
);

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

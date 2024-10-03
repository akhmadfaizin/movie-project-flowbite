export interface IMovieItem {
  id: number;
  genre_ids: number[];
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IPagination {
  currentPage: number;
  onPageChange: (e: number) => void;
  totalPages: number;
}

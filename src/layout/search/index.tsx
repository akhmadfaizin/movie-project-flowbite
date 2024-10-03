/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MovieItemCard } from "../../components/cards/MovieItem";
import { PaginationComponent } from "../../components/Pagination";
import { moviesSearchByTitle } from "../../api/movieApi";
import { IMovieItem } from "../../api/interfaces";
import { useLocation } from "react-router-dom";

export const SearchResultLayout = () => {
  const [movieData, setMovieData] = useState<IMovieItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);
  const location = useLocation();
  const { searchText } = location.state || "";

  const getMovieDataSearchResult = (searchText: string, pageNumber: number) => {
    moviesSearchByTitle(searchText, pageNumber)
      .then((response) => {
        setMovieData(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getMovieDataSearchResult(searchText, currentPage);
  }, [searchText, currentPage]);

  return (
    <div>
      <div className="text-center font-bold text-[30px] mt-8">
        Search Result
      </div>
      <div className="mt-4 px-2">
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {movieData.map((movie) => (
            <MovieItemCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
      <div className="mt-4 px-2">
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

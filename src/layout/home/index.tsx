/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MovieItemCard } from "../../components/cards/MovieItem";
import { PaginationComponent } from "../../components/Pagination";
import { moviesList, moviesPopularCarousel } from "../../api/movieApi";
import { IMovieItem } from "../../api/interfaces";
import { useDispatch } from "react-redux";
import { fetchGenres } from "../../redux/slices/genreSlices";
import { AppDispatch } from "../../redux/store";
import { HomeCarousel } from "../../components/HomeCarousel";

export const HomeLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [movieData, setMovieData] = useState<IMovieItem[]>([]);
  const [carouselData, setCarouselData] = useState<IMovieItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const getMovieData = (pageNumber: number) => {
    moviesList(pageNumber)
      .then((response) => {
        setMovieData(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((error) => console.error(error));
  };

  const getCarouselData = () => {
    moviesPopularCarousel()
      .then((response) => {
        setCarouselData(response.results.slice(0, 5));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    dispatch(fetchGenres());
    getCarouselData();
  }, []);

  useEffect(() => {
    getMovieData(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   console.log("MOVIE DATA", movieData);
  // }, [movieData]);

  // useEffect(() => {
  //   console.log("MOVIE GENRE", genreList);
  // }, [genreList]);

  return (
    <div>
      <HomeCarousel carouselData={carouselData} />
      <div className="mt-4 px-2 border-red-500">
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
      <div className="mt-4 px-2 border-red-500">
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

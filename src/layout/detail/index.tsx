/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { movieDetailById } from "../../api/movieApi";
import { IGenre, IMovieItem } from "../../api/interfaces";
import { renderPoster } from "../../utils/functionUtils";
import { Badge, Card } from "flowbite-react";
import { useSelector } from "react-redux";

export const DetailLayout = () => {
  const location = useLocation();
  const { id } = location.state || "";
  const [movieDetail, setMovieDetail] = useState<IMovieItem>();
  const genresState = useSelector((state: any) => state.genres);

  const getDetailMovie = (id: number) => {
    movieDetailById(id)
      .then((response) => {
        setMovieDetail(response);
      })
      .catch((error) => console.error(error));
  };

  const renderMovieCardGenreList = () => {
    const reduxGenderList = genresState.genres;
    const genresIds = movieDetail?.genres;

    const filteredGenres = genresIds?.map((g) => {
      return reduxGenderList.find((x: IGenre) => x.id === g.id);
    });

    return (
      <div className="flex flex-row gap-2">
        {filteredGenres?.map((f) => {
          return (
            <Badge color="blue" key={f.id} size="sm">
              {f.name}
            </Badge>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getDetailMovie(id);
  }, [id]);

  return (
    <div className="min-h-lvh flex flex-row justify-center py-8">
      <Card className="w-[800px] h-auto p-4 text-center">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movieDetail?.title}
        </h5>
        <div className="flex flex-row justify-center mt-4">
          <img
            alt="poster"
            src={renderPoster(movieDetail?.poster_path)}
            className="w-[400px] h-[600px]"
          />
        </div>
        <div className="flex flex-row justify-center mt-8">
          {renderMovieCardGenreList()}
        </div>
        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          <div className="font-bold">Release Date</div>
          <div>{movieDetail?.release_date}</div>
        </div>
        <div className="mt-8">
          <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Synopsis
          </h4>
          <div className="my-4 px-4 text-justify">{movieDetail?.overview}</div>
        </div>
      </Card>
    </div>
  );
};

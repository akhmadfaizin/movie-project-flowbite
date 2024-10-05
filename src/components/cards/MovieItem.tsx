/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Badge } from "flowbite-react";
import { FaStar } from "react-icons/fa";
import { IGenre, IMovieItem } from "../../api/interfaces";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { renderPoster } from "../../utils/functionUtils";

export const MovieItemCard = (props: IMovieItem) => {
  const navigate = useNavigate();
  const genresState = useSelector((state: any) => state.genres);

  const renderStars = (voteAverage: number) => {
    const starCount = (voteAverage / 2).toFixed(2);

    return (
      <div className="flex flex-row items-center gap-1">
        <div>{starCount}</div>
        <FaStar className="text-yellow-500" /> ({props.vote_count})
      </div>
    );
  };

  const renderMovieCardGenreList = () => {
    const reduxGenderList = genresState.genres;
    const genresIds = props.genre_ids;

    const filteredGenres = genresIds.map((g) => {
      return reduxGenderList.find((x: IGenre) => x.id === g);
    });

    return (
      <div className="flex flex-row gap-2">
        {filteredGenres.map((f) => {
          return (
            <Badge color="gray" key={f.id}>
              {f.name}
            </Badge>
          );
        })}
      </div>
    );
  };

  const handleDetails = (id: number) => {
    navigate("/detail", { state: { id } });
  };

  return (
    <Card
      className="max-w-sm mb-4 cursor-pointer"
      imgAlt="Poster"
      imgSrc={renderPoster(props.poster_path)}
      onClick={() => handleDetails(props.id)}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
      <div className="flex flex-col gap-2 font-normal text-gray-700 dark:text-gray-400">
        <div>{renderMovieCardGenreList()}</div>
        <div className="flex flex-row gap-2 items-center">
          <div className="font-bold">Release Date</div>
          <div>{props.release_date}</div>
        </div>
        <div>{renderStars(props.vote_average)}</div>
      </div>
    </Card>
  );
};

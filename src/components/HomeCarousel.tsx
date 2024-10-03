import { Carousel } from "flowbite-react";
import { IMovieItem } from "../api/interfaces";

export interface ICarouselItem {
  carouselData: IMovieItem[];
}

export const HomeCarousel = (props: ICarouselItem) => {
  const renderCarouselItems = () => {
    return props.carouselData.map((movie) => {
      return (
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="..."
        />
      );
    });
  };

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>{renderCarouselItems()}</Carousel>
    </div>
  );
};

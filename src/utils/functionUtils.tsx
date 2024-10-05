import { ImageUrl } from "../assets";

export const renderPoster = (poster_path?: string) => {
  if (poster_path == null) {
    return ImageUrl.notFoundPoster;
  } else {
    return `${import.meta.env.VITE_API_IMG_URL}${poster_path}`;
  }
};

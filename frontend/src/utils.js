import defaultPoster from "./assets/solidColour.jpg"

// checks if the poster exists
// otherwise returns the filler image
export async function posterLinkToImgURL(poster_link) {
    const url = `https://image.tmdb.org/t/p/w500${poster_link}`;
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return url;
      } else {
        return defaultPoster;
      }
    } catch (error) {
      return defaultPoster;
    }
}

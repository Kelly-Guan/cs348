async function imageExists(image_url) {
  try {
    const response = await fetch(image_url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Error checking image:", error);
    return false;
  }
}

let url1 = "http://image.tmdb.org/t/p/w500/5A8gKzOrF9Z7tSUX6xd5dEx4NXf.jpg";

imageExists(url1)
  .then((exists) => console.log(exists))
  .catch((error) => console.error("Error:", error));

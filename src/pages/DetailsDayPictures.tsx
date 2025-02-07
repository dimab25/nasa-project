import { Picture } from "../types/customTypes";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

function DetailsDayPictures() {
  const queryParameters = new URLSearchParams(window.location.search);
  const dateQuery = queryParameters.get("date");
  console.log(dateQuery);

  const api_key = import.meta.env.VITE_NASA_API;

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${dateQuery}`;

  console.log(nasaUrl);
  const [pictures, setPictures] = useState<Picture | null>(null);

  const getPictureOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Picture;
        setPictures(pictureOfTheDay);
        console.log(pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPictureOfTheDay();
  }, []);

  return (
    <>
      <div>DetailsDayPictures</div>
      {pictures && <p>{pictures.explanation}</p>}
      {pictures && <p>{pictures.date}</p>}

      {pictures && pictures.media_type==="image" ? <Image src={pictures.url} alt="Image" style={{width: "1000px"}} fluid/> : <iframe
              width="900"
              height="700"
              src={pictures?.url}
              title="YouTube video player"
            ></iframe>}

    </>
  );
}

export default DetailsDayPictures;

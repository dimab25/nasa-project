
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

function DetailsMedia() {
  const queryParameters = new URLSearchParams(window.location.search);
  const dateQuery = queryParameters.get("date");
  console.log(dateQuery);

  const nasa_id = "GRC-2016-C-06992"

  const nasaUrl = `https://images-api.nasa.gov/search?q=${nasa_id}`;

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
      <div>DetailsMedia</div>
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

export default DetailsMedia;

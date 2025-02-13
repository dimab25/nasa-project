import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Root } from "../types/customTypes";

function DetailsMedia() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idQuery = queryParameters.get("id");
  console.log("idquery", idQuery);

  const nasaUrl = `https://images-api.nasa.gov/search?q=${idQuery}`;

  console.log("nasaurl", nasaUrl);
  const [pictures, setPictures] = useState<Root | null>(null);

  const getPictureOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Root;

        setPictures(pictureOfTheDay);
        console.log("picture", pictureOfTheDay);
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

      {pictures && <p>{pictures.collection.items[0].data[0].media_type}</p>}
           {pictures && <p>{pictures.collection.items[0].data[0].description}</p>}
      {pictures && (
        <Image
          src={pictures.collection.items[0].links[0].href}
          style={{ width: "700px" }}
          fluid
        />
      )}
    </>
  );
}

export default DetailsMedia;

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
      {" "}
      <div className="detailsDayPictures">
        {pictures && (
          <Image
            src={pictures.collection.items[0].links[0].href}
            style={{ width: "700px" }}
            fluid
            alt="image"
          />
        )}
        {pictures && <p>{pictures.collection.items[0].data[0].title}</p>}
        {pictures && <p>{pictures.collection.items[0].data[0].description}</p>}
        {pictures && <p>{pictures.collection.items[0].data[0].date_created}</p>}
      </div>
    </>
  );
}

export default DetailsMedia;

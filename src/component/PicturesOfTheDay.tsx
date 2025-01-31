import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Picture {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

function PicturesOfTheDay() {
  const API_Key = import.meta.env.NASA_API;

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&start_date=2024-12-23&end_date=2025-01-08`;

  const [pictures, setPictures] = useState<Picture | null>(null);

  const getPicturesOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Picture;
        setPictures(pictureOfTheDay);
        console.log("pictureof the day", pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPicturesOfTheDay();
  }, []);

  return (
    <>
      <div>More pictures of the day </div>
      <div className="MorePicsOfDay">
        {pictures &&
          pictures.map((file: Picture) => (
            <>
            <Link to={`/detailsDayPicture/?${file.date}`}>
              <img src={file.url} alt="" style={{ width: "400px" }} /></Link>
            </>
          ))}
      </div>
    </>
  );
}

export default PicturesOfTheDay;

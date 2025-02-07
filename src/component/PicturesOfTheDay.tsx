import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
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
  const api_key= import.meta.env.VITE_NASA_API;

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=2024-12-23&end_date=2025-01-04`;

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
        
         <div className="containerImages">
              {pictures &&
                pictures.map((file: Picture, index: number) => (
                  <>
                    <Link to={`/detailsDayPicture/?date=${file.date}`} key={index}>
                      <p><Image src={file.url} alt="" style={{width: "700px"}} fluid /></p>
                    </Link>
                  </>
                ))}
          </div>
        
      </div>
    </>
  );
}

export default PicturesOfTheDay;

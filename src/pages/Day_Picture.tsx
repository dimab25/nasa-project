import "../pages_css/Day_Picture.css";
import { ChangeEvent, useEffect, useState } from "react";
import DateInput from "../component/DateInput";
import PicturesOfTheDay from "../component/PicturesOfTheDay";
import { Image } from "react-bootstrap";
import { Link } from "react-router";
import { Picture } from "../types/customTypes";

function Day_Picture() {
  const api_key = import.meta.env.VITE_NASA_API;

  const [choosenDate, setChoosenDate] = useState("");

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${choosenDate}`;

  const [pictures, setPictures] = useState<Picture | null>(null);
  console.log(nasaUrl);
  const getPictureOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Picture;
        setPictures(pictureOfTheDay);
        // console.log(pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setChoosenDate(e.target.value);
    // console.log("chossenDate", choosenDate);
  };
  // console.log("chossenDate", choosenDate);
  // useEffect hook close to the return
  useEffect(() => {
    getPictureOfTheDay();
  }, [choosenDate]);

  return (
    <>
      <div>
        <div className="dateInputDiv">
          <DateInput handleInputDate={handleInputDate} />
        </div>
        <div className="dayPictureContainer">
          {pictures && pictures?.media_type === "image" ? (
            <Link to={`/detailsDayPicture/?date=${pictures && pictures.date}`}>
              {" "}
              <Image src={pictures.url} style={{ width: "700px" }} fluid />
            </Link>
          ) : (
            <iframe
              width="900"
              height="700"
              src={pictures?.url}
              title="YouTube video player"
            ></iframe>
          )}
          <div className="titleAndDate">
            <div><Link
              to={`/detailsDayPicture/?date=${pictures && pictures.date}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <p>{pictures && pictures.title} </p>
            </Link>
            </div>
<div>
            <p>{pictures && pictures.date}</p></div>
          </div>
        </div>

        <PicturesOfTheDay />
      </div>
    </>
  );
}

export default Day_Picture;

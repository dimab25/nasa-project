import { ChangeEvent, useEffect, useState } from "react";
import DateInput from "../component/DateInput";
import PicturesOfTheDay from "../component/PicturesOfTheDay";

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

function Day_Picture() {
  const API_Key = import.meta.env.NASA_API;
  

  const [choosenDate, setChoosenDate] = useState("");

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}&date=${choosenDate}`;

  const [pictures, setPictures] = useState <Picture|null>(null);

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

  const handleInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setChoosenDate(e.target.value);
    console.log("chossenDate", choosenDate);
  };
  console.log("chossenDate", choosenDate);
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
          <img src={pictures && pictures.hdurl} style={{ width: "30rem" }} />

          <p> {pictures && pictures.title} </p>
          <p>{pictures && pictures.date}</p>
          <p>{pictures && pictures.explanation}</p>
        </div>
        <PicturesOfTheDay />
      </div>
    </>
  );
}

export default Day_Picture;

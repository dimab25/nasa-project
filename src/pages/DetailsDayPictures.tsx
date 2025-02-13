import { Picture } from "../types/customTypes";
import { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
// import AddLike from "../component/AddLike";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

function DetailsDayPictures() {
  const { user } = useContext(AuthContext);

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

  // ADDING INFORMATION TO THE DB

  const author = user?.email;

    const addInformation = async (imageID: string |undefined) => {
        try {
          const docRef = await addDoc (collection(db, "likes"), {
            date: imageID,
            author: author,
          });
          console.log("Document written with ID: ", docRef.id);
          // console.log("db", db);
          // setNewInformation(docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

const handleLike = (props: string |undefined)=>{
  
  const imageId = props
  console.log("also works", imageId);
  addInformation (imageId)
}


  useEffect(() => {
    getPictureOfTheDay();
  }, []);

  return (
    <>
      <div>DetailsDayPictures</div>  
      <button onClick={()=>handleLike(pictures?.date)}>Like</button> 
       {pictures && pictures.media_type==="image" ? <Image src={pictures.url} alt="Image" style={{width: "1000px"}} fluid/> : <iframe
              width="900"
              height="700"
              src={pictures?.url}
              title="YouTube video player"
            ></iframe>}
      {pictures && <p>{pictures.explanation}</p>}
      {pictures && <p>{pictures.date}</p>}

  

    </>
  );
}

export default DetailsDayPictures;

import { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { ImageDates } from "../types/customTypes";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

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
  const { user } = useContext(AuthContext);

  const api_key = import.meta.env.VITE_NASA_API;

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=2024-12-23&end_date=2025-01-04`;

  const [pictures, setPictures] = useState<Picture[] | null>(null);

  const getPicturesOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Picture;
        setPictures(pictureOfTheDay);
        // console.log("pictureof the day", pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // ADDING INFORMATION TO THE DB
  // const { user } = useContext(AuthContext);
 

  const addInformation = async (imageDate: string | undefined) => {
    try {

      const author = user?.email;
      const docRef = await addDoc(collection(db, "likes"), {
        date: imageDate,
        author: author,
      });
      console.log("Document written with ID: ", docRef.id);
      // console.log("db", db);
      // setNewInformation(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleMark = (props: string | undefined) => {
    const imageDate = props;
    console.log("imageDate ", imageDate);
    addInformation(imageDate);
  };

  //  GET INFORMATION FROM DB
 

  const [imageIDs, setImageIDs] = useState<ImageDates[] | null>(null);

  const getImageIds = async () => {
    const querySnapshot = await getDocs(collection(db, "likes"));
    const imageIDArray: ImageDates[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().Text}`);
      const date = { ...doc.data(), id: doc.id } as ImageDates;
      imageIDArray.push(date);

      setImageIDs(imageIDArray);
    });
  };

  console.log("imageIDs", imageIDs);

  // filter the Likes COLLECTION
  const savedImagesArrayUndefined = imageIDs?.map((file: ImageDates) => {
    if (user && file.author.includes(user?.email)) return file.date;
  });
  console.log("", savedImagesArrayUndefined);
  const savedImagesArray = savedImagesArrayUndefined?.filter(
    (x) => x !== undefined
  );
  console.log(savedImagesArray);

  useEffect(() => {
    getPicturesOfTheDay();
    getImageIds();
  }, []);

  return (
    <>
      <div>More pictures of the day </div>

      <div className="MorePicsOfDay">
        <div className="containerImages">
          {pictures &&
            pictures.map((file: Picture, index) => (
              <div key={index}>
                {/* <button onClick={()=>handleLike(pictures?.date)}>Like</button>  */}

                <Button
                  className={
                    savedImagesArray?.includes(file.date)
                      ? "savedPicture"
                      : "unsavedPicture"
                  }
                  variant="outline-success"
                  onClick={() => handleMark(file.date)}
                  style={{ borderRadius: "50%", position: "absolute" }}
                >
                  {" "}
                  <MdOutlineFavoriteBorder />
                </Button>
                <Link to={`/detailsDayPicture/?date=${file.date}`}>
                  <p>
                    {" "}
                    <Image
                      src={file.url}
                      alt=""
                      style={{ width: "700px" }}
                      fluid
                    />
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default PicturesOfTheDay;

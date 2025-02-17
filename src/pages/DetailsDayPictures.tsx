import { ImageDates, Picture } from "../types/customTypes";
import { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { IoMdAdd } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";

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
        console.log("pictues of the day", pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // ADDING INFORMATION TO THE DB
  const addInformation = async (imageObject) => {
    try {
      const imageDate = imageObject.date;
      const imageUrl = imageObject.url;
      const author = user?.email;

      const docRef = await addDoc(collection(db, "likes"), {
        date: imageDate,
        author: author,
        url: imageUrl,
      });
      console.log("Document written with ID: ", docRef.id);
      // console.log("db", db);
      // setNewInformation(docRef.id);
      if (docRef) getImageIds();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleMark = (props: {}) => {
    const imageObject = props as string;
    console.log("imageDate", imageObject);

    addInformation(imageObject);
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

  // DELETE LIKES
  const deleteLike = async (props) => {
    await deleteDoc(doc(db, "likes", props));
    console.log(doc(db, "likes", props));
    console.log("works bitch");
    console.log("propsId", props);
    getImageIds();
  };

  // DELETE BUTTON FOR LIKED IMAGES
  const handleDelete = (props: string | undefined) => {
    const testX = props as string;

    // console.log("testX is a date string", testX);

    // filter the whole COLLECTION for the LikedImageID
    const savedIDsArrayUndefined = imageIDs?.map((file: ImageDates) => {
      if (user && file.author.includes(user?.email)) return file;
    });
    // console.log("testingconst", savedIDsArrayUndefined);

    const savedIDsArray = savedIDsArrayUndefined?.filter(
      (x) => x !== undefined
    );
    // console.log("testingconst", savedIDsArray);

    const singleIdUndefined = savedIDsArray?.map((file) => {
      if (file.date == testX) {
        return file.id;
      }
    });
    // console.log(singleIdUndefined);
    const singleID = singleIdUndefined?.filter((x) => x !== undefined);
    console.log("singleid", singleID);
    const realSingleID = singleID?.toString();
    console.log(realSingleID);

    deleteLike(realSingleID);
  };

  useEffect(() => {
    getPictureOfTheDay();
    getImageIds();
  }, []);

  return (
    <>
      <div className="detailsDayPictures">
      {pictures && pictures.media_type === "image" ? (
          <Image
            src={pictures.url}
            alt="Image"
            style={{ width: "1000px" }}
            fluid
          />
        ) : (
          <iframe
            width="900"
            height="700"
            src={pictures?.url}
            title="YouTube video player"
          ></iframe>
        )}
       
        
        {user ? (
          savedImagesArray?.includes(pictures?.date) ? (
            <>
              <Button
                className={
                  savedImagesArray?.includes(pictures?.date)
                    ? "savedPicture1"
                    : "unsavedPicture1"
                }
                variant="outline-success"
                onClick={() => handleDelete(pictures?.date)}
              >
                <FaUserAstronaut />
              </Button>
            </>
          ) : (
            <Button
              className={
                savedImagesArray?.includes(pictures?.date)
                  ? "savedPicture1"
                  : "unsavedPicture1"
              }
              variant="outline-success"
              onClick={() => handleMark(pictures)}
            >
              <IoMdAdd />
            </Button>
          )
        ) : null}

        
        <div>{pictures && <p>{pictures.title}</p>}</div>
        {pictures && <p>{pictures.explanation}</p>}
        {pictures && <p>{pictures.date}</p>}
      </div>
    </>
  );
}

export default DetailsDayPictures;

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

  const api_key = import.meta.env.VITE_NASA_API;

  const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${dateQuery}`;

  const [pictures, setPictures] = useState<Picture | null>(null);

  const getPictureOfTheDay = () => {
    fetch(nasaUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const pictureOfTheDay = result as Picture;
        setPictures(pictureOfTheDay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // ADDING INFORMATION TO THE DB
  const addInformation = async (imageObject: Picture) => {
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
      // setNewInformation(docRef.id);
      if (docRef) getImageIds();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleMark = (props: Picture) => {
    const imageObject = props;
    console.log("imageDate", imageObject);

    addInformation(imageObject);
  };

  //  GET INFORMATION FROM DB

  const [imageIDs, setImageIDs] = useState<ImageDates[]>([]);

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
  const savedImagesArray = savedImagesArrayUndefined.filter(
    (x) => x !== undefined
  );

  // DELETE LIKES
  const deleteLike = async (props:string) => {
    await deleteDoc(doc(db, "likes", props));
    // console.log(doc(db, "likes", props));
    getImageIds();
  };

  // DELETE BUTTON FOR LIKED IMAGES
  const handleDelete = (testX: string ) => {

    // filter the whole COLLECTION for the LikedImageID
    const savedIDsArrayUndefined = imageIDs.map((file: ImageDates) => {
      if (user && file.author.includes(user?.email)) return file;
    });
   
    const savedIDsArray = savedIDsArrayUndefined?.filter(
      (x) => x !== undefined
    );
    console.log("savedIDsArray", savedIDsArray);

    const singleIdUndefined = savedIDsArray?.map((file) => {
      if (file.date == testX) {
        return file.id;
      }
    });

    console.log("singleIdUndefined", singleIdUndefined);
    const singleID = singleIdUndefined.filter((x) => x !== undefined);
    const realSingleID: string = singleID.toString();
    deleteLike(realSingleID);
    console.log(" realSingleID", realSingleID);
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

        {pictures && user ? (
          savedImagesArray?.includes(pictures.date) ? (
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

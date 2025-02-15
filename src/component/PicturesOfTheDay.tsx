import { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import { ImageDates, Picture } from "../types/customTypes";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

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
  console.log("imageid", imageIDs);

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
  // console.log("imageIDs", imageIDs);

  // filter the COLLECTION to display the Images i marked as liked
  const savedImagesArrayUndefined = imageIDs?.map((file: ImageDates) => {
    if (user && file.author.includes(user?.email)) return file.date;
  });
  console.log("", savedImagesArrayUndefined);
  const savedImagesArray = savedImagesArrayUndefined?.filter(
    (x) => x !== undefined
  );
  console.log("saved images array", savedImagesArray);

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

                {user? (savedImagesArray?.includes(file.date) ? (
                  <>
                    <Button
                      className={
                        savedImagesArray?.includes(file.date)
                          ? "savedPicture"
                          : "unsavedPicture"
                      }
                      variant="outline-success"
                      onClick={() => handleDelete(file.date)}
                      
                    >
                 <FaUserAstronaut />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={
                        savedImagesArray?.includes(file.date)
                          ? "savedPicture"
                          : "unsavedPicture"
                      }
                      variant="outline-success"
                      onClick={() => handleMark(file)}
                      style={{ borderRadius: "50%", position: "absolute" }}
                    >
                      <IoMdAdd />
                    </Button>
                  </>
                )): null}

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

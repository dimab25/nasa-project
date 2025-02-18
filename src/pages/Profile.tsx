import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ImageDates } from "../types/customTypes";
import { Image } from "react-bootstrap";
// import useFetchHook from "../hooks/useFetchHook";

function Profile() {
  const { user } = useContext(AuthContext);

  const [imageIDs, setImageIDs] = useState<ImageDates[] | null>(null);

  //  GET INFORMATION FROM DB
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

  // filter the COLLECTION to display the Images i marked as liked
  const savedImagesArrayUndefined = imageIDs?.map((file: ImageDates) => {
    if (user && file.author.includes(user?.email)) return file.url;
  });

  const savedImagesArray = savedImagesArrayUndefined?.filter(
    (x) => x !== undefined
  );

  useEffect(() => {
    getImageIds();
  }, []);

  return (
    <>
      <div className="profileContainer">
        <div>
          <h5>Profile</h5>
          <h6>User E-Mail: {user?.email}</h6>

          <h6>{user?.userName}</h6>

          <h5>Saved Images </h5>
        </div>

        <div className="containerMyImages">
          {savedImagesArray?.map((file, index) => (
            <p key={index}>
              {" "}
              <Image src={file} alt="image" fluid />
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;

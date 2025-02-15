import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ImageDates } from "../types/customTypes";
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
  console.log("imageIDs", imageIDs);

    useEffect(() => {
    getImageIds();
  }, []);

  return (
    <>
      <h5>Here you can find your account informations.</h5>
      <h6>User E-Mail: {user?.email}</h6>
      <h6>{user?.id}</h6>
      <h6>{user?.userName}</h6>

      <div>Images of the Day i liked </div>
<div className="containerMyImages">
        {imageIDs?.map((file) => (
          <>
          <div>
          <img style={{width:"200px"}}
          src={file.url} alt="" /></div>
          </>
        ))}</div>
    </>
  );
}

export default Profile;

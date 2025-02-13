import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ImageDates } from "../types/customTypes";
// import useFetchHook from "../hooks/useFetchHook";



function Profile() {
 const {user} =useContext (AuthContext)


 const [imageIDs, setImageIDs] = useState <ImageDates[] | null> (null)

//  GET INFORMATION FROM DB
  const getImageIds = async () => {
    const querySnapshot = await getDocs(collection(db, "likes"));
    const imageIDArray : ImageDates[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().Text}`);
      const date = {...doc.data(), id: doc.id} as ImageDates;
      imageIDArray.push(date);

      setImageIDs(imageIDArray);
    });
  };
console.log("imageIDs", imageIDs);

const newImageDatesArray =imageIDs?.map((id:ImageDates)=>{
return id.date
})
console.log("newImageDatesArray", newImageDatesArray);



// FETCH DATA

// const api_key = import.meta.env.VITE_NASA_API;

// newImageDatesArray&& newImageDatesArray.map((xDate, index)=>{
//   console.log("xdate", xDate);
//   const {data:data[index]}= useFetchHook(
//     `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${xDate}`
//     )
// })

// if (newImageDatesArray){for (let index = 0; index < newImageDatesArray.length; index++) {

//   console.log("newImageDatesArray[index]", newImageDatesArray[index]);

// // console.log(data:newImageDatesArray[]);
// //  console.log("hallo ");
// console.log("fetched data", newdata[index]);
//   }}



useEffect(() => {
  getImageIds()
}, [])

  return (
    <>
    <h5>Here you can find your account informations.</h5>
    <h6>User E-Mail: {user?.email}</h6>
    <h6>{user?.id}</h6>
    <h6>{user?.userName}</h6>


    <div>Images of the Day i liked

    </div>

   
    </>
  )
}

export default Profile
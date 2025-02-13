import { useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";


function AddLike() {

    const id = 123
    const addInformation = async () => {
        try {
          const docRef = await addDoc(collection(db, "likes"), {
            id: id
          });
          console.log("Document written with ID: ", docRef.id);
          console.log("db", db);
          // setNewInformation(docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

      console.log("addlikeworks");
      useEffect(() => {
   addInformation ()
      }, [])
      
  return (
    <div>AddLike</div>
  )
}

export default AddLike
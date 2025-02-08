import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
// import { MessageType } from "../types/customTypes";

function AddMessages() {
  // const [newInformation, setNewInformation] = useState<MessageType | null>(
  //   null
  // );
const {user} =useContext (AuthContext)


  const author = user?.email 
  // const author = "dima";
  // const text ="hallo"
  const date =new Date

  const addInformation = async () => {
    try {
   
      const docRef = await addDoc(collection(db, "chat"), {
        author: author,
        text: "Lovelace",
        date: date
      });
      console.log("Document written with ID: ", docRef.id);
      // setNewInformation(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    addInformation();
  }, []);

  return <div>AddMessages</div>;
}

export default AddMessages;

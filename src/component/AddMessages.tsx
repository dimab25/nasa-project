import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function AddMessages() {
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState("");
  const author = user?.email;

  const date = new Date();

  const addInformation = async () => {
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        author: author,
        text: value,
        date: date,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("db", db);
      // setNewInformation(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);

    // setKeyword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("funktioniert");
    console.log(value);
    addInformation();
  };

  useEffect(() => {
  
  }, []);
  return (
    // <>
    //   <Form>
    //     <FloatingLabel
    //       controlId="floatingInput"
    //       label="Message"
    //       className="mb-3"
    //     >
    //       <Form.Control as="textarea" onChange={handleInputChange} />
    //     </FloatingLabel>

    //     <Button variant="outline-success" type="submit" onClick={handleClick}>
    //       Save Message
    //     </Button>
    //   </Form>
    // </>
  );
}

export default AddMessages;

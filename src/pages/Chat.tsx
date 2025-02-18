import "../pages_css/Chat.css";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { MessageType } from "../types/customTypes";

function Chat() {
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  const [inputValue, setInputValue] = useState("");

  // GETMESSAGE FUNCTION
  // const getMessages = async () => {
  //   const querySnapshot = await getDocs(collection(db, "chat"));
  //   const messagesArray: MessageType[] = [];
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data().Text}`);
  //     const message = {...doc.data(), id: doc.id} as MessageType;
  //     messagesArray.push(message);

  //     setMessages(messagesArray);
  //   });
  // };

  // LIVE UPDATES
  const onSnapshotMessages = () => {
    const q = query(collection(db, "chat"), orderBy("date", "desc"), limit(7));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: any[] = [];
      querySnapshot.forEach((doc) => {
        const message: MessageType = {
          text: doc.data().text,
          date: doc.data().date,
          author: doc.data().author,
          id: doc.id,
        };
        messagesArray.push(message);
        // console.log("test",message);
        setMessages(messagesArray);
      });
    });
  };

  const formatDate = (seconds: number) => {
    const formatedDate = new Date(seconds * 1000).toLocaleString();
    return formatedDate;
  };

  // Adding INFORMATION TO THE DATABASE
  const { user } = useContext(AuthContext);
  const author = user?.email;
  const date = new Date();

  const addInformation = async () => {
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        author: author,
        text: inputValue,
        date: date,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("db", db);
      // setNewInformation(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addInformation();
  };

  // DELETE MESSAGES
  const deleteMessage = async (props: string) => {
    await deleteDoc(doc(db, "chat", props));
  };

  const handleDelete = (props: string) => {
    const messageId = props;
    deleteMessage(messageId);
  };

  useEffect(() => {
    onSnapshotMessages();
  }, []);

  return (
    <div className="chatDiv">
      <h2>Chat</h2>
      <p>
        Do you believe in aliens? Will humans ever live on another planet? Share
        your thoughts and chat with others about anything on your mind!
      </p>
      <div>
        <Stack gap={3} className="align-items-center">
          {messages &&
            [...messages]
              .slice()
              .reverse()
              .map((message) => {
                return (
                  <div
                    key={message.id}
                    className={
                      user && user.email === message.author
                        ? "MessageUser"
                        : "MessagesInfo"
                    }
                    style={{ width: "250px" }}
                  >
                    <div className="chatAuthorAndDate">
                      <p className="chatAuthor">{message.author}</p>
                      <p className="chatDate">
                        {formatDate(message.date.seconds)}
                      </p>
                    </div>
                    <div className="chatTextAndButton">
                      <p className="chatText">{message.text}</p>
                      <div className="deleteButtonDiv">
                        {user && user.email === message.author ? (
                          <Button
                            variant="outline-danger"
                            className="deleteButton"
                            onClick={() => handleDelete(message.id)}
                          >
                            x
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}

          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Message"
              className="mb-3"
            >
              <Form.Control
                placeholder="message"
                as="textarea"
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <Button
              onClick={handleClick}
              variant="outline-success"
              type="submit"
            >
              Save Message
            </Button>
          </Form>
        </Stack>
      </div>
    </div>
  );
}

export default Chat;

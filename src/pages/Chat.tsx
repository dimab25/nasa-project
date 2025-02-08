import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import AddMessages from "../component/AddMessages";
// import { MessageType } from "../types/customTypes";

// import AddMessages from "../component/AddMessages";

type MessageType = {
  author: string;
  text: string;
  date: Timestamp;
};

function Chat() {
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  const getMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"));
    const messagesArray: MessageType[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().Text}`);
      const message = doc.data() as MessageType;
      messagesArray.push(message);
      setMessages(messagesArray);
    });
  };

  const formatDate = (seconds:number) => {
    const formatedDate = new Date(seconds*1000).toLocaleString();
    return formatedDate;
  };

  console.log(messages);
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <Stack gap={3} className="align-items-center">
          {messages &&
            messages.map((message) => {
              return (
                <div
                  className="MessagesInfo"
                  style={{ width: "300px", background: "lightgreen" }}
                >
                  <p>{message.author}</p>
                  <p>{message.text}</p>
                  <p>{formatDate(message.date.seconds)}</p>
                </div>
              );
            })}

          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="message"
              className="mb-3"
            >
              <Form.Control as="textarea" placeholder="message" />
            </FloatingLabel>
            <AddMessages />
            <Button variant="outline-success" type="submit">
              Save Message
            </Button>
          </Form>
        </Stack>
      </div>
    </div>
  );
}

export default Chat;

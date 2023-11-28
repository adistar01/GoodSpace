import { useState } from "react";
// import axios from "axios";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const sendMessage = async () => {
    try {
      if (author && setAuthor) {
        const data = {
          author,
          content,
        };
        socket.emit("send_message", data);
        // const response = await axios.post("http://localhost:3001/", {
        //   data,
        // });
        // console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    setAuthor("");
    setContent("");
  };
  // useEffect(() => {
  //   socket.on("receive_response", (response) => {
  //     console.log(response);
  //   });
  //   return () => {
  //     socket.off("receive_response");
  //   };
  // }, []);

  return (
    <div className="App">
      <p>Hello</p>
      <input
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Enter your content"
      />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}

export default App;

// frontend/src/App.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import LoginFormPage from "./components/LoginFormPage";
import Main from "./components/Main";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import { v4 as uuid } from 'uuid';
import 'react-tooltip/dist/react-tooltip.css'
import OauthLogin from "./components/OauthLogin";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from "./pages/LoginPage";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])
  const webSocket = useRef(null)
  const { roomId } = useParams()

  const handleSendMessage = (message, roomId) => {
    const newMessage = {
      roomId,
      id: uuid(),
      username: `user${uuid()}`,
      message,
      created: new Date(),

    }

    const jsonNewMessage = JSON.stringify({
      type: 'send-chat-message',
      data: newMessage,
    })
    console.log(`sending message ${jsonNewMessage}...`);

    webSocket.current.send(jsonNewMessage)


  }

  const handleJoin = (roomId) => {
    const newMessage = {
      roomId,
    }

    const jsonNewMessage = JSON.stringify({
      type: 'join-room',
      data: newMessage,
    })
    console.log(`sending message ${jsonNewMessage}...`);

    webSocket.current.send(jsonNewMessage)

  }

  const handleLeave = () => {
    return //come back later
  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

    const ws = new WebSocket('ws://localhost:8000')

    ws.onopen = (e) => {
      console.log('connection open', `${e}`)
      setMessages([]);
    }


    ws.onerror = (e) => {
      console.error(e)
    }

    ws.onclose = (e) => {
      console.log('connection closed', `${e}`)
      webSocket.current = null;
      setUsername('');
      setMessages([]);
    }

    webSocket.current = ws;

    //closes the server
    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (webSocket.current !== null) {
      webSocket.current.onmessage = (e) => {
        console.log(`processing incoming message ${e.data}`)

        const chatMessage = JSON.parse(e.data)
        const message = chatMessage.data;
        message.created = new Date(message.created)

        setMessages([...messages, message])
      }
    }
  }, [messages])

  return isLoaded && (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/rooms/:roomId(\d+)">
        <ChatRoom messages={messages} handleSendMessage={handleSendMessage} handleLeave={handleLeave} handleJoin={handleJoin} />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
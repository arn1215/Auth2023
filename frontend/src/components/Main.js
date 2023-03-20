import { useEffect, useState, useRef } from "react";


function Main() {

    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
     
        if (!username) {
            return;
        }


    }, [username])

    const updateUsername = (username) => {
        setUsername(username)
    }

    return (
        <div>
            <input 
            placeholder="username"
            value='hey'
            name='username'
            />
            <input placeholder="message" />

        </div>
    );
}

export default Main;
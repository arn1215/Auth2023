import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './Chat.css'

function ChatRoom({messages, handleSendMessage, handleLeave, handleJoin}) {
    const [message, setMessage] = useState('')
    const {roomId} = useParams()
    const messagesEndRef = useRef(null)

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSendOnClick = () => {
        handleSendMessage(message, roomId);

        setMessage('');
    }

    const handleLeaveOnClick = () => {
        handleLeave();
    }

    useEffect(() => {
        handleJoin(roomId)
    }, [roomId])

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (  
        <div>
            <div className="page-container">
                <div className="message-container">
                    <div>
                        {messages?.map(m => (
                            <p key={m.id}>{m.username}:{m.message}</p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="input-container">
                    <input 
                    type='text'
                    value={message}
                    onChange={handleOnChange}
                    className="chat-input"
                    />
                    <button className='input-button'type="button" onClick={handleSendOnClick}>Send</button>
                    <button className='input-button'type="button" onClick={handleLeaveOnClick}>Leave</button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;

import { useState } from "react";

function ChatRoom({messages, handleSendMessage, handleLeave}) {
    const [message, setMessage] = useState('')

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSendOnClick = () => {
        handleSendMessage(message);
        setMessage('');
    }

    const handleLeaveOnClick = () => {
        handleLeave();
    }


    return (  
        <div>
            <div>
                <input 
                type='text'
                value={message}
                onChange={handleOnChange}
                />
                <button type="button" onClick={handleSendOnClick}>Send</button>
                <button type="button" onClick={handleLeaveOnClick}>Leave</button>
                <div>
                    {messages?.map(m => (
                        <p key={m.id}>{m.username}:{m.message}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
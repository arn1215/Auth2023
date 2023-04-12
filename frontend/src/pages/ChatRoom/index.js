import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './Chat.css'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Howl } from 'howler';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'

import axios from 'axios';

function ChatRoom({ messages, handleSendMessage, handleLeave, handleJoin }) {
    const [message, setMessage] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [googleUserName, setGoogleUserName] = useState('');
    const { roomId } = useParams()
    const messagesEndRef = useRef(null)
    const ghUserName = useSelector(state => state.session.user)


    const handleOnChange = (e) => {
        setMessage(e.target.value);


    }

    const handleSendOnClick = () => {

        if (message.trim().length === 0) {
            setIsEmpty(true)
            console.log(isEmpty)
        }
        else {
            setIsEmpty(false)
            handleSendMessage(message, roomId);
        }

        setMessage('');
    }

    const handleLeaveOnClick = () => {
        handleLeave();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendOnClick();
        }
    }

    useEffect(() => {
        handleJoin(roomId)
        const cookieValue = Cookies.get('google-user');
        if (cookieValue) {
            const decodedDisplayName = decodeURIComponent(cookieValue);
            setGoogleUserName(decodedDisplayName);
        }

    }, [roomId])


    //github token parse
    useEffect(() => {

    }, [])

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })


        //if the last message is from another user play a sound
        console.log(messages[message.length - 1])
        const sound = new Howl({
            src: ['/sounds/pickupCoin.wav'],
            volume: 0.5,
        });
        if (messages.length) {

            sound.play();
        }


    }, [messages]);

    return (
        <div>
            <div className="page-container">

                <div className="messages-container">
                    <div>
                        {messages?.map(m => (
                            <div className="message-container">
                                <div className="details">
                                    <p className="message-data"> {googleUserName || ghUserName}<p className="message-time">{m.created.toLocaleString().split(",")[1]}</p></p>
                                </div>
                                <p key={m.id}>{m.message}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="input-container">
                    <textarea
                        data-tooltip-id="tooltip-anchor-hide"
                        data-tooltip-content="Please enter a message first..."
                        data-tooltip-variant="error"
                        type='text'
                        value={message}
                        onChange={handleOnChange}
                        className="chat-input"
                        onKeyDown={handleKeyDown}
                    />
                    {/* <button className='input-button'type="button" onClick={handleLeaveOnClick}>Leave</button> */}
                    {/* <button className='input-button'type="button" onClick={handleSendOnClick}>Send</button> */}
                </div>
                <Tooltip isOpen={isEmpty} id="tooltip-anchor-hide" />
            </div>
        </div>
    );
}

export default ChatRoom;

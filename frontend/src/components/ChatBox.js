import React, { useState, useEffect } from 'react';
import { Launcher } from 'react-chat-window'
import socketIOClient from 'socket.io-client'
import { teatime_chatbox } from '../assets/bundle';

const message_type = {
    CONNECTED: 'connected',
    NEW_MESSAGE: 'new_message'
}

const ChatBox = props => {
    const socket = socketIOClient('http://localhost:4000/', { transports: ['polling'] });

    const [messageList, setMessageList] = useState([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        emitMessage({ user: 'Maxime' }, message_type.CONNECTED);
        //listen server message
        socket.on('connected', (message) => {
            addNewMessageToList(message);
        });
        socket.on('new_message', (message) => {
            addNewMessageToList(message);
        });
    }, []);

    const emitMessage = (message, typeMessage) => {
        socket.emit(typeMessage, { message: message })
    };

    const addNewMessageToList = message => {
        setMessageList([...messageList, message]);
        setNewMessagesCount(isOpen ? 0 : newMessagesCount + 1);
    };

    const onMessageWasSent = message => {
        emitMessage(message, message_type.NEW_MESSAGE);
        addNewMessageToList(message);
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
        setNewMessagesCount(0);
    };

    const onFilesSelected = fileList => {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        const fileMessage = {
            type: 'file', author: "me",
            data: {
                url: objectURL,
                fileName: fileList[0].name
            }
        };
        emitMessage(fileMessage, message_type.NEW_MESSAGE);
        addNewMessageToList(fileMessage);
    };

    return (
        <div className='chat-box'>
            <Launcher
                agentProfile={{
                    teamName: 'Customer service',
                    imageUrl: teatime_chatbox //or 'src/assets/images/teatime_chatbox.png'
                }}
                onMessageWasSent={onMessageWasSent}
                handleClick={handleClick}
                onFilesSelected={onFilesSelected}
                messageList={messageList}
                isOpen={isOpen}
                newMessagesCount={newMessagesCount}
                showEmoji={true}
                mute={true}
            />
        </div>
    )
}

export default ChatBox;

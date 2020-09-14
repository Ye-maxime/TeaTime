/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Launcher } from 'react-chat-window'
import socketIOClient from 'socket.io-client'
import { teatimeChatbox } from '../assets/bundle';

const messageType = {
    CONNECTED: 'connected',
    NEW_MESSAGE: 'new_message',
}

const ChatBox = () => {
    const socket = socketIOClient('http://localhost:4000/', { transports: ['polling'] });

    const [messageList, setMessageList] = useState([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        emitMessage({ user: 'Maxime' }, messageType.CONNECTED);
        // listen server message
        socket.on('connected', (message) => {
            addNewMessageToList(message);
        });
        socket.on('new_message', (message) => {
            addNewMessageToList(message);
        });
    }, []);

    const emitMessage = (message, typeMessage) => {
        socket.emit(typeMessage, { message })
    };

    const addNewMessageToList = (message) => {
        setMessageList((prevMessageList) => [...prevMessageList, message]);
        setNewMessagesCount((prevMessagesCount) => (isOpen ? 0 : prevMessagesCount + 1));
    };

    const onMessageWasSent = (message) => {
        emitMessage(message, messageType.NEW_MESSAGE);
        addNewMessageToList(message);
    };

    const handleClick = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        setNewMessagesCount(0);
    };

    const onFilesSelected = (fileList) => {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        const fileMessage = {
            type: 'file',
            author: 'me',
            data: {
                url: objectURL,
                fileName: fileList[0].name,
            },
        };
        emitMessage(fileMessage, messageType.NEW_MESSAGE);
        addNewMessageToList(fileMessage);
    };

    return (
        <div className="chat-box">
            <Launcher
                agentProfile={{
                    teamName: 'Customer service',
                    imageUrl: teatimeChatbox, // or 'src/assets/images/teatime_chatbox.png'
                }}
                onMessageWasSent={onMessageWasSent}
                handleClick={handleClick}
                onFilesSelected={onFilesSelected}
                messageList={messageList}
                isOpen={isOpen}
                newMessagesCount={newMessagesCount}
                showEmoji
                mute
            />
        </div>
    )
}

export default ChatBox;

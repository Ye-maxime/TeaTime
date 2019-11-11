import React, { Component } from 'react';
import { Launcher } from 'react-chat-window'
import socketIOClient from 'socket.io-client'
import { teatime_chatbox } from '../assets/bundle';

const message_type = {
    CONNECTED: 'connected',
    NEW_MESSAGE: 'new_message'
}

let socket;
export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'http://localhost:4000/',  //服務器的端口4000
            messageList: [],
            newMessagesCount: 0,
            isOpen: false,
        };
        socket = socketIOClient(this.state.endpoint, { transports: ['polling'] });
    }

    componentDidMount() {
        this.emitMessage({ user: 'Maxime' }, message_type.CONNECTED)

        //listen server message
        socket.on('connected', (message) => {
            this.addNewMessageToList(message)
        })
        socket.on('new_message', (message) => {
            this.addNewMessageToList(message)
        })
    }

    emitMessage(message, typeMessage) {
        socket.emit(typeMessage, { message: message })
    }

    addNewMessageToList(message) {
        this.setState({
            messageList: [...this.state.messageList, message],
            newMessagesCount: this.state.isOpen ? 0 : this.state.newMessagesCount + 1
        })
    }

    onMessageWasSent(message) {
        this.emitMessage(message, message_type.NEW_MESSAGE)
        this.addNewMessageToList(message)
    }

    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen,
            newMessagesCount: 0
        })
    }

    onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0])
        const fileMessage = {
            type: 'file', author: "me",
            data: {
                url: objectURL,
                fileName: fileList[0].name
            }
        }
        this.emitMessage(fileMessage, message_type.NEW_MESSAGE)
        this.addNewMessageToList(fileMessage)
    }

    render() {
        const { messageList, newMessagesCount, isOpen } = this.state
        return (
            <div className='chat-box'>
                <Launcher
                    agentProfile={{
                        teamName: 'Customer service',
                        imageUrl: teatime_chatbox //or 'src/assets/images/teatime_chatbox.png'
                    }}
                    onMessageWasSent={this.onMessageWasSent.bind(this)}
                    handleClick={this.handleClick.bind(this)}
                    onFilesSelected={this.onFilesSelected.bind(this)}
                    messageList={messageList}
                    isOpen={isOpen}
                    newMessagesCount={newMessagesCount}
                    showEmoji={true}
                    mute={true}
                />
            </div>
        )
    }
}

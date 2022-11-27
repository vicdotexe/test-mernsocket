import React,{ Component } from 'react';
import MessageInput from './MessageInput'
import socket from '../../utils/socket';
import ChatMessage from './ChatMessage';

export class ChatBox extends Component{
    constructor(){
        super();
        socket.Lobby.OnMessageRecieved(this.onMessageReceived);
        this.messages = [];
        //todo: get any messages from whatever chat is, from the data base, and sync the chat box by pushing to messages array
        this.syncMessages();
    }

    syncMessages = async() =>{
        try{
            const response = await fetch('/api/chats/lobby')
            if (!response.ok){
                return;
            }
            const data = await response.json();
            this.messages = [];
            data.forEach(message=>{
                this.messages.push(<ChatMessage messageData={message}></ChatMessage>)
            })
            this.forceUpdate();
        }catch(e){
            console.log(e);
        }

    }
    
    onMessageReceived = (data) =>{
        this.messages.push(<ChatMessage messageData={data}></ChatMessage>);
        this.forceUpdate();
    }

    render(){
        return (
            <div>
                {this.messages.map((component, index) => (
                        <React.Fragment key={index}>
                            { component }
                        </React.Fragment>))
                    }
                <MessageInput></MessageInput>
            </div>
        )
    }

}

export default ChatBox;

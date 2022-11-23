import React,{ Component } from 'react';
import MessageInput from './MessageInput'
import connection from '../../utils/ClientSocket';
import ChatMessage from './ChatMessage';

export class ChatBox extends Component{
    constructor(){
        super();
        console.log(connection);
        connection.OnLobbyMessageRecieved(this.onMessageReceived);
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
            console.log(data);
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
        console.log(data);
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

import React,{ Component } from 'react';
import MessageInput from './MessageInput'
import connection from '../../connection/Connection';
import ChatMessage from './ChatMessage';

export class ChatBox extends Component{
    constructor(){
        super();
        console.log(connection);
        connection.OnLobbyMessageRecieved(this.onMessageReceived);
        this.messages = [];
        //todo: get any messages from whatever chat is, from the data base, and sync the chat box by pushing to messages array
    }

    
    onMessageReceived = (data) =>{
        this.messages.push(<ChatMessage messagedata={data}></ChatMessage>);
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

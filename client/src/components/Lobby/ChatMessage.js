import { Component } from "react";

export default class ChatMessage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <div className="chatMessage">
                <h3>User: {this.props.messageData.username}</h3>
                <h6>Message: {this.props.messageData.content}</h6>
            </div>
        )
    }

}
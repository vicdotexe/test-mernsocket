import { Component, useState } from "react"
import Connection from '../../connection/Connection'

export class MessageInput extends Component{

    constructor(){
        super();
    }

    state = {
        msg: ''
    }

    handleChange = (e) => { this.setState({msg:e.target.value})}

    handleSend = (e) =>{
        e.preventDefault();
        Connection.SendLobbyMessage(this.state.msg);
        this.setState({msg:''});
    }

    render(){
        let {msg} = this.state;
        return (
            <div>
                <form className="chatForm" onSubmit={this.handleSend}>
                    <input type="text" placeholder="write message..." value={msg} onChange={this.handleChange}/>
                    <button>Send</button>
                </form>
            </div>
        )
    }

}

export default MessageInput;

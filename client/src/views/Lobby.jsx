import {Component} from 'react';
import ChatBox from '../components/Chat/ChatBox';
import socketConnection from '../connection/Connection';

export default class Lobby extends Component{
    onLogout(e){
        e.preventDefault();
        socketConnection.Logout();
    }
    render(){
        return (
            <div>
                <h1>Welcome to the Lobby</h1>
                <button onClick={this.onLogout}>logout</button>
                <ChatBox></ChatBox>
            </div>
            
        )
    }
}
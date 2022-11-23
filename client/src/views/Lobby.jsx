import {Component} from 'react';
import ChatBox from '../components/Chat/ChatBox';
import socketConnection from '../utils/ClientSocket';

export default class Lobby extends Component{
    onLogout(e){
        e.preventDefault();
        socketConnection.Logout();
        alert("You're logged out and now considered a guest.")
    }
    render(){
        return (
            <div>
                <h1>Welcome to the Lobby</h1>
                <p>session data is stored browser-wide across all tabs, so refreshing the page will assign your socket to the last login made with the browser.. to get around this, we can use two different browsers like chrome and edge, or icognito-chrome will will store it's own session data</p>
                <button onClick={this.onLogout}>logout</button>
                <ChatBox></ChatBox>
            </div>
            
        )
    }
}
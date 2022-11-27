import {Component} from 'react';
import ChatBox from '../Chat/ChatBox';
import socket from '../../utils/socket';
import { withRouter } from '../../utils/withRouter';

class Lobby extends Component{
    constructor(props){
        super(props);
        this.joinId = "";
    }
    onLogout(e){
        e.preventDefault();
        socket.Authentication.Logout();
        alert("You're logged out and now considered a guest.")
    }

    onCreateGame = (e)=>{
        e.preventDefault();
        const id = socket.Game.CreateAndJoin();
        this.props.navigate('/game');

    }
    onJoinGame = (e)=>{
        e.preventDefault();
        socket.Game.Join(this.joinId);
        this.props.navigate('/game');
    }
    render(){
        return (
            <div>
                <h1>Welcome to the Lobby</h1>
                <p>session data is stored browser-wide across all tabs, so refreshing the page will assign your socket to the last login made with the browser.. to get around this, we can use two different browsers like chrome and edge, or icognito-chrome will will store it's own session data</p>
                <button onClick={this.onLogout}>logout</button>
                <br></br>
                <button onClick={this.onCreateGame}>create room </button>
                <br></br>
                <input type="text" placeholder='game id' onChange={(e)=>{this.joinId = e.target.value}}></input>
                <button onClick={this.onJoinGame}>join room</button>
                <ChatBox></ChatBox>

            </div>
            
        )
    }
}

export default withRouter(Lobby);
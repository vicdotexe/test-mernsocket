import {Component} from 'react';
import ChatBox from '../components/Chat/ChatBox';

export default class Lobby extends Component{
    render(){
        return (
            <div>
                <h1>Welcome to the Lobby</h1>
                <ChatBox></ChatBox>
            </div>
            
        )
    }
}
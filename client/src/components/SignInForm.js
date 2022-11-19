import { Component } from "react";
import connection from "../connection/Connection";
import {withRouter} from '../withRouter'

class SignInForm extends Component{

    constructor(props){
        super(props);
    }
    state = {
        username:'',
        password:''
    }
    handleUsernameChange = (e) => {
        this.state.username = e.target.value;
        this.setState(this.state);
    }

    handlePasswordChange = (e) =>{
        this.state.password = e.target.value;
        this.setState(this.state);
    }

    onSignIn = (e) => {
        e.preventDefault();

        /*should make an api call to login to server and create a session.
        if the login was successfull, return the userinfo like id and stuff and create the socket connection*/
        
        //if (fetch.login.response.isok)
        // userInfo = response.data
        // connection.Connect(userInfo)

        //just going to fake it for now
        const userInfo = {
            username: this.state.username,
            id: Math.floor(Math.random() * 10000)
        }
        connection.Connect(userInfo);
        setTimeout(() => {
            this.props.navigate('/lobby')
        }, 1000);
        
    }

    render(){
        return (
            <form onSubmit={this.onSignIn}>
                <input type="text" onChange={this.handleUsernameChange} placeholder="enter a test name"></input>
                <input type="text" onChange={this.handlePasswordChange} placeholder="can leave blank for now"></input>
                <button>Sign In</button>
            </form>
        )
    }
}

export default withRouter(SignInForm);
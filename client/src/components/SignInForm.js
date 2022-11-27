import { Component } from "react";
import connection from "../utils/socket";
import {withRouter} from '../utils/withRouter'

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

    onSignIn = async(e) => {
        e.preventDefault();

        /*should make an api call to login to server and create a session.
        if the login was successfull, return the userinfo like id and stuff and create the socket connection*/
        
        //if (fetch.login.response.isok)
        // userInfo = response.data
        // connection.Connect(userInfo)

        //just going to fake it for now
        const response = await fetch('/api/users/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        console.log(response);
        
        if (!response.ok){
            alert("invalid credentials");
            return;
        }
        const data = await response.json();


        const userInfo = {
            username: this.state.username,
            userId: data.id
        }

        connection.Authentication.Login(userInfo, ()=>this.props.navigate('/'));
        
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
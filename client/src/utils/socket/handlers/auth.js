export const Auth = (socket)=>{
    return {
        /**
         * Connect client socket to server with associated unique user info
         * @param {*} userInfo {id, name}
         * @param {*} url optional: we could use this if the server was hosted on a seperate domain
         * todo: figure out if any more user info besides name and id in the database would be useful
         */
        Login(userInfo){
            socket.emit("login",userInfo)
        },

        Logout(){
            socket.emit("logout");
        }
    }
}
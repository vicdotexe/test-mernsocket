
const userManager = () =>{
    const users = [];

    return {
        addUser(userdata) {
            users.push(userdata);
        },
        
        removeUser(socketId){
            const index = users.findIndex((user) => user.socketId == socketId);

            console.log(`user index ${index} being removed`)
         
            if(index != -1) {
                return users.splice(index,1)[0];
            }
        },
        
        getBySocketId(socketId){
            return users.find(user => user.socketId == socketId)
        },
        
        getByUserId(userId){
            return users.find(user => user.userId == userId)
        },
        
        getAllUsers(){
            return users.map(x=>x);
        }
    }
}

const UserManager = userManager();
module.exports = UserManager;
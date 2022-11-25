const users = [];

const addUser = (userdata) =>{
    users.push(userdata);
}

const removeUser = (socketId) =>{
    const index = users.findIndex((user) => 
        user.socketId == socketId
    );
    console.log(`user index ${index} being removed`)
 
    if(index != -1) {
        return users.splice(index,1)[0];
    }
}

const getUserBySocketId = (socketId) => users.find(user => user.socketId == socketId);

const getUserByUserId = (userId) => users.find(user => user.userId == userId);

const getAllUsers = () => users;

module.exports = {
    addUser,
    removeUser,
    getUserBySocketId,
    getUserByUserId,
    getAllUsers
}
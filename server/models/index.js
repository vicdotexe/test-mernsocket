const User = require('./User');
const Message = require('./Message');
const Chat = require('./Chat');

User.hasMany(Message, {
    onDelete:'CASCADE',
    foreignKey:{
        allowNull:false
    }
})
Message.belongsTo(User);

Chat.hasMany(Message, {
    onDelete:'CASCADE'
})
Message.belongsTo(Chat);

module.exports = {
    User,
    Chat,
    Message
}
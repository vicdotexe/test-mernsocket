import {v4} from 'uuid';

export const Game = (socket)=>{
    let id = null;

    return {
        /** Create a new gameroom and connect the socket to it, returns the unique game room id */
        CreateAndJoin(){
            socket.off('gameAction');
            id = v4();
            socket.emit('createGame', id);
            return id;
        },
        /** Connect the socket to a game with the specified id */
        Join(gameId){
            socket.off('gameAction');
            socket.emit('joinGame', gameId);
            id = gameId;
        },
        PickColor(color){
            socket.emit('gameAction', {type: "pickColor", room: id, data:color})
        },
        OnColorPicked(listener){
            socket.on('gameAction', data=>{
                if (listener){
                    listener(data);
                }
            })
        },
        SetReady(){
            socket.emit('gameAction', {type: "ready", room: id})
        },
        OnBothReady(){
            socket.on('gameAction', {type: 'bothReady', room:id})
        },
        PlaceCard(data){
            socket.emit('gameAction', {type: "placeCard", room: id, data:data})
        },
        OnCardPlaced(listener){
            socket.on('gameAction', data=>{
                if (data.type != "placeCard"){
                    return;
                }
                if (listener){
                    listener(data.data);
                }
            })
        },
        Leave(){
            socket.emit('leave', id);
            socket.off('gameAction');
            id = null;
        },
        GetGameId(){
            return id;
        }
    }
}
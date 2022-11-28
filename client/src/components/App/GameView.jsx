import { GameField } from "../GameComponents/GameField"
import './gameStyles.css'
import {LoremIpsum} from 'lorem-ipsum';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import socket from '../../utils/socket'

const lorem = new LoremIpsum();
const random = (max)=>{
    return Math.floor((Math.random() * (max)) +1);
}
export const GameView = (props) =>{
    
    
    const startingMeta = [];
    for (let i = 0; i < 8; i++){
        const meta={
            name:lorem.generateWords(2),
            compass: [random(10),random(10),random(10),random(10)]
        };
        startingMeta.push(meta)
    }
    return (
        <div className="gameView">
            <p>{socket.Game.GetGameId()}</p>
            <DndProvider backend={HTML5Backend}>
                <GameField startingMeta={startingMeta}/>
            </DndProvider>
        </div>
    )
}
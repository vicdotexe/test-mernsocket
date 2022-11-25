import { GameField } from "../GameComponents/GameField"
import '../../views/gameStyles.css'
import { Card } from "../GameComponents/Card";
import {LoremIpsum} from 'lorem-ipsum';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const lorem = new LoremIpsum();
const random = (max)=>{
    return Math.floor((Math.random() * (max)) +1);
}
export const GameView = () =>{
    
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
            <DndProvider backend={HTML5Backend}>
                <GameField startingMeta={startingMeta}/>
            </DndProvider>
        </div>
    )
}
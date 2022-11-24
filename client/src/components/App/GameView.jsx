import { GameField } from "../GameComponents/GameField"
import '../../views/gameStyles.css'
import { Card } from "../GameComponents/Card";
import {LoremIpsum} from 'lorem-ipsum';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const lorem = new LoremIpsum();

export const GameView = () =>{
    
    const startingMeta = [];
    for (let i = 0; i < 8; i++){
        const meta={
            name:lorem.generateWords(2)
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
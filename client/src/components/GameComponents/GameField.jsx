import { Grid } from "./Grid"
import { Hand } from "./Hand"
import { EventHandler } from 'events'

const gameState = () =>{
    const slots = Array(9).fill(null);
    
    return {
        PlaceCard(index, meta){
            slots[index] = meta;
        },
        CheckIndex(index){
            return slots[index]
        }
    }
}

export const GameState = gameState();

export const GameField = (props)=>{

    return (
        <div className="gameField">
            <Grid/>
            <Hand startingMeta={props.startingMeta}/>
        </div>
    )
}
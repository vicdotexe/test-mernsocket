import { Grid } from "./Grid"
import { Hand } from "./Hand"
import { EventEmitter } from 'events'

const gameState = () =>{
    const slots = Array(9).fill(null);
    const emitter = new EventEmitter();

    return {
        PlaceCard(index, meta){
            slots[index] = meta;
        },
        CheckIndex(index){
            return slots[index]
        },
        EmitFactionChanged(slotIndex){
            emitter.emit('factionChanged', slotIndex);
        },
        OnFactionChanged(listener){
            emitter.on('factionChanged', listener)
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
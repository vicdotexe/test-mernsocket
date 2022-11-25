import { Grid } from "./Grid"
import { Hand } from "./Hand"
import { EventEmitter } from 'events'

const gameState = () =>{
    const slots = Array(9).fill(null);
    const emitter = new EventEmitter();
    const colors = [
        "DeepSkyBlue",
        "DeepPink",
        "GreenYellow",
        "Orange",
    ]
    const myColor = colors[Math.floor(Math.random() *4)];

    return {
        PlaceCard(index, meta){
            slots[index] = meta;
        },
        CheckIndex(index){
            return slots[index]
        },
        EmitFactionChanged(slotIndex, cardFaction){
            emitter.emit('factionChanged', slotIndex, cardFaction);
        },
        OnFactionChanged(listener){
            emitter.on('factionChanged', listener)
        },
        GetMyColor(){
            return myColor;
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
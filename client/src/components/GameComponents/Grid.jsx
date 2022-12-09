import { useContext, useState} from "react";
import { createContext } from "react";
import { Slot } from "./Slot";
import { EventEmitter } from 'events';

export const GridEmitter = new EventEmitter();

export const Grid = ()=>{
    
    const [battle,setBattle] = useState(-1);

    const array = new Array(9).fill(null);

    const startChain = ()=>{
        for(let i = 0; i < 9; i++){
            setTimeout(() => {
                setBattle(i);
            }, i*0.5*1000);
        }
    }
    return (
        <div className="grid" onClick={startChain}>
            {array.map((x,i)=> <Slot slotType="gridSlot" key={`slot-${i}`} slotIndex={i} battle={battle}></Slot>)}
        </div>
    )
}
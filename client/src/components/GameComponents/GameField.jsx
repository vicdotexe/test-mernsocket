import { Grid } from "./Grid"
import { Hand } from "./Hand"
import { EventHandler } from 'events'
import { useContext } from "react"
import { createContext } from "react"

export const GameField = (props)=>{

    return (
        <div className="gameField">
            <Grid/>
            <Hand startingMeta={props.startingMeta}/>
        </div>
    )
}
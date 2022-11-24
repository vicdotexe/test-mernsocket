import { Grid } from "./Grid"
import { Hand } from "./Hand"

export const GameField = (props)=>{

    return (
        <div className="gameField">
            <Grid/>
            <Hand startingMeta={props.startingMeta}/>
        </div>
    )
}
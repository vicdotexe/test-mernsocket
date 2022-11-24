import { useState } from "react";
import {useDrag} from 'react-dnd';

export const Card = (props) =>{
    const meta = props.meta;
    let startingState = props.state || {
        inPlay:false,
        ownedBy: null,
        currentFaction: 0
    }

    const [state, setState] = useState(startingState);

    const [{isDragging}, dragRef] = useDrag(
        () => ({
          type: 'card',
          item:meta,
          collect: (monitor) => ({
            isDragging: monitor.isDragging()
          }),
          end:(item, monitor) =>{
            if (item && monitor.getDropResult()){
                props.unslot();
            }
          },
          canDrag:()=>{return !state.inPlay}
        })
      )


    return (
        <div className="card" ref={dragRef} style={{background: isDragging ? 'orange' : 'green'}}>
            Card Name - {meta.name}
        </div>
    )
}
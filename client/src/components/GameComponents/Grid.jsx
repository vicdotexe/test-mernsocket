import { Slot } from "./Slot";

export const Grid = ()=>{
    const slots = []

    for (let i = 0; i < 9; i++){
        const slot = <Slot slotType="gridSlot" unslot={()=>{}} key={`slot-${i}`} id={i}></Slot>;
        slots.push(slot);
    }

    return (
        <div className="grid">
            {slots}
        </div>
    )
}
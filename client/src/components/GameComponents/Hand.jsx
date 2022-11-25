import { Slot } from "./Slot";



export const Hand = (props)=>{
    const slots = []

    for (let i = 0; i < 10; i++){
        let meta = null;
        if (i < props.startingMeta.length){
            meta = props.startingMeta[i];
        }
        const slot = <Slot meta={meta} slotType="handSlot" key={`slot-${i}`} slotIndex={i}></Slot>;
        slots.push(slot);
    }

    return (
        <div className="hand">
            The Hand
            {slots}
        </div>
    )
}
import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import {Card} from './Card'

export const Slot = (props)=>{


    const placeCard = (card) => {
        setCard(card);
    }

    const removeCard = () => {
        setCard(null);
    }
    let startingCard = null;
    if (props.meta){
        startingCard = <Card meta={props.meta} unslot={removeCard}/>
    }
    const [card, setCard] = useState(startingCard);
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: props.slotType == 'gridSlot' ? 'card' : 'none',
        drop: (item) => setBasket((basket) => {
                                placeCard(<Card meta={item} unslot={()=>removeCard()} state={
                                    {inPlay:true}
                                }></Card>);
                                return !basket.includes(item) ? [...basket, item] : basket
                            }),
        collect: (monitor) => ({
            isOver: monitor.isOver() && card == undefined
        }),
        canDrop: ()=> card == undefined
    })
    


    return (
        <div className={props.slotType} ref={dropRef} style={{background:isOver ? "yellow":"white"}}>
            slot {props.id}
            {card}
        </div>
    )
}
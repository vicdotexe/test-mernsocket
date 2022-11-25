import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import {Card} from './Card'
import socket from '../../utils/ClientSocket'

export const Slot = (props)=>{

    let startingCard = null;
    if (props.meta){
        startingCard = <Card meta={props.meta} unslot={()=>setCard(null)} currentSlot={props.id}/>
    }
    const [card, setCard] = useState(startingCard);
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: props.slotType == 'gridSlot' ? 'card' : 'none',
        drop: (item) => setBasket((basket) => {
                                socket.GameLogic.PlaceCard(props.slotIndex, item)
                                return !basket.includes(item) ? [...basket, item] : basket
                            }),
        collect: (monitor) => ({
            isOver: monitor.isOver() && card == undefined
        }),
        canDrop: ()=> card == undefined
    })

    socket.GameLogic.OnCardPlaced((data)=>{
        const {gridIndex, cardData} = data;
        console.log(cardData.meta);
        if (props.slotType != "gridSlot" || props.slotIndex != gridIndex){
            return;
        }

        setCard(
            <Card meta={cardData} inPlay={true}></Card>
        )
    })



    return (
        <div className={props.slotType} ref={dropRef} style={{background:isOver ? "yellow":"white"}}>
            slot {props.id}
            {card}
        </div>
    )
}
import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import {Card} from './Card'
import socket from '../../utils/socket'
import { GameState } from './GameField';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import {motion} from 'framer-motion'


const grid = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

export const Slot = (props)=>{
    
    // temporary solution to pass starting card through props
    let startingCard = null;
    if (props.meta){
        startingCard = <Card meta={props.meta} unslot={()=>setCard(null)} currentSlot={props.id}/>
    }

    useEffect(()=>{
        if (props.battle == props.slotIndex){
            setAnimation(testAnimation);
            setTimeout(() => {
                setAnimation({});
            }, 500);
        }
    }, [props.battle])

    //set the card state of the slot (null if empty)
    const [card, setCard] = useState(startingCard);
    const [faction, setFaction] = useState(GameState.GetMyColor());

    //basket and drop ref for drag and drop detection
    const [basket, setBasket] = useState([])

    const [{ isOver }, dropRef] = useDrop(
        {
        accept: props.slotType == 'gridSlot' ? 'card' : 'none', //accept a drop type of 'card' if this is a 'gridSlot'
        drop: (item) => setBasket((basket) => {
                                const data = {
                                    gridIndex:props.slotIndex,
                                    meta:item,
                                    faction:GameState.GetMyColor()
                                }
                                socket.Game.PlaceCard(data) // emit the card placement to the server with the data of this slot index and the item (card meta)
                                return !basket.includes(item) ? [...basket, item] : basket
                            }),
        collect: (monitor) => ({
            isOver: monitor.isOver() && card == undefined // allow collection if hovering and no card exists in this slot
        }
        
        ),
        canDrop: ()=> card == undefined // allow drop if this slot doesn't already have a card
    })


    if (props.slotType == "gridSlot"){
        socket.Game.OnCardPlaced((data)=>{
            const {gridIndex, meta, faction, changes} = data;
            if (!faction){
                console.log("what's going on - oncardplaced null cardfaction")
            }
            if (props.slotType != "gridSlot"){
                return;
            }
    
            if (props.slotIndex == gridIndex){
                setCard(
                    <Card meta={meta} inPlay={true}></Card>
                    
                )
                setFaction(faction)
            }
            console.log(changes);
    
            if (changes){
                changes.forEach(change => {
                    if (change.index == props.slotIndex){
                        setFaction(change.toFaction);
                    }
                });
            }
        })
    }

    const [animation, setAnimation] = useState({});
    const testAnimation = {
        scale:[1,1.5,1],
        transition:{
            ease:"easeOut", 
            duration:.5
        }
    }

    return (
        <motion.div 
        animate={animation} 
        className={props.slotType} 
        ref={dropRef} 
        style={{background:card ?  (faction): (isOver ? "yellow":"green")}}>
            
            slot {props.slotIndex}
            {card}
        </motion.div>
    )
}
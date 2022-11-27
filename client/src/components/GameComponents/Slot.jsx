import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import {Card} from './Card'
import socket from '../../utils/socket'
import { GameState } from './GameField';

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

    //set the card state of the slot (null if empty)
    const [card, setCard] = useState(startingCard);
    const [faction, setFaction] = useState(GameState.GetMyColor());

    //basket and drop ref for drag and drop detection
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
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
        }),
        canDrop: ()=> card == undefined // allow drop if this slot doesn't already have a card
    })

    // find coordinates in a 3x3 grid of a given wrapped index
    function coordsOfIndex(index){

        for (let i = 0; i < 3; i ++){
            for (let j = 0; j < 3; j++){
                if (grid[i][j] == index){
                    return [i,j]
                }
            }
        }
        return `index ${index} out of range`
    }

    //check if the given index is a neighbor, returns their relative location, or false if not touching
    function isNeighbor(fromIndex){
        const fromCoords = coordsOfIndex(fromIndex);

        for (let i = -1; i <=1; i++){
            for(let j = -1; j <=1; j++){
                if (Math.abs(i) == Math.abs(j) || ((i+j) == 0)){
                    //this would be diagonal
                    continue;
                }
                
                let x = fromCoords[0] + i;
                let y = fromCoords[1] + j;
                if (x >=0 && x <=2 && y >=0 && y <=2){
                    //we are contained within the 3x3 grid
                    if (grid[x][y] == props.slotIndex){
                        if (i < 0){
                            return "bottom"
                        }
                        if (i > 0){
                            return "top"
                        }
                        if (j < 0 ){
                            return "right"
                        }
                        if (j > 0){
                            return "left"
                        }
                    }
                }
            }
        }
        return false;
    }

    function defend(fromCompass, side){
        const myCompass = GameState.CheckIndex(props.slotIndex).compass;
        switch(side){
            case "left":
                return myCompass[3] >= fromCompass[1]
            case "right":
                return myCompass[1] >= fromCompass[3]
            case "bottom":
                return myCompass[2] >= fromCompass[0]
            case "top":
                return myCompass[0] >= fromCompass[2]
        }
        console.log("something went wrong in defend")
    }

    

    socket.Game.OnCardPlaced((data)=>{
        const {gridIndex, meta, faction} = data;
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
            GameState.PlaceCard(props.slotIndex, meta);
        }else if (card){
            const neighborLocation = isNeighbor(gridIndex);
            if (neighborLocation){
                console.log(`slot ${props.slotIndex} touched on the ${neighborLocation} side`)
                const defended = defend(GameState.CheckIndex(gridIndex).compass, neighborLocation);
                if (!defended){
                    setFaction(faction);
                    GameState.EmitFactionChanged(props.slotIndex, faction)
                    console.log("faction change");
                }
            }
        }
    })

    if (props.slotType == "gridSlot"){
        GameState.OnFactionChanged((slotIndex, cardFaction)=>{
            if (props.slotType != "gridSlot"){
                return;
            }
            if (props.slotIndex == slotIndex){
                return;
            }else if (card){
                if (!cardFaction){
                    console.log("what's going on - onfactionchanged null cardfaction")
                }
                const neighborLocation = isNeighbor(slotIndex);
                if (neighborLocation){
                    console.log(`slot ${props.slotIndex} touched on the ${neighborLocation} side`)
                    const defended = defend(GameState.CheckIndex(slotIndex).compass, neighborLocation);
                    if (!defended){
                        setFaction(cardFaction);
                        GameState.EmitFactionChanged(props.slotIndex, cardFaction)
                        console.log(`chained from slot ${slotIndex} to slot ${props.slotIndex}`);
                    }
                }
            }
    
    
        })
    }


    return (
        <div className={props.slotType} ref={dropRef} style={{background:card ?  (faction): (isOver ? "yellow":"white")}}>
            slot {props.slotIndex}
            {card}
        </div>
    )
}
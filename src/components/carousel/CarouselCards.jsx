import BigCard from "../bigCard/BigCard";
import EmptySlotCard from "./EmptySlotCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import {removeFromTeam} from "./TeamCarouselUtils";

const CarouselCards = ({carouselState:{pokeTeam,setPokeTeam,setName,setEditingNickName,editingNickName,name}})=> {
    return pokeTeam.map((p,i) => (
        p===null?
        <div key={"empty"+i} className={"team-card card"+(pokeTeam.length+i+1)}>
            <header><h1>Empty</h1></header>
            <EmptySlotCard slotNumber={i+1}/>
        </div>
        :<div key={p.id} className={"team-card card"+(i+1)}>
            <header onClick={()=>{setName(pokeTeam[i].nickName);setEditingNickName(i)}}>
            {editingNickName === i ?
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            :<h1>{pokeTeam[i].nickName}</h1>}
            </header>
            <BigCard bigCard={p.pokemon} />
            <button onClick={()=>removeFromTeam(p.id,setPokeTeam)}><FontAwesomeIcon icon={faSquareMinus} /> Remove from team</button>
        </div>
    ))
}

export default CarouselCards;
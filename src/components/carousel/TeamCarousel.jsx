import "./carousel.css";
import { useState,useEffect } from 'react';
import { useRecoilState } from "recoil";
import pokeTeamState from "../../atoms/pokeTeamState";
import BigCard from "../bigCard/BigCard";
import EmptySlotCard from "./EmptySlotCard";
import { validateName } from "../validate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faThumbsDown,faSquareMinus } from "@fortawesome/free-regular-svg-icons";

const TeamCarousel = ({ team }) => {
	const [pokeTeam, setPokeTeam] = useRecoilState(pokeTeamState);
	const TEAM_SIZE = 5;
	const SPIN_AMOUNT = 360 / TEAM_SIZE;
	const [spin, setSpin] = useState(0);
	const [editingNickName,setEditingNickName] = useState(-1);
	const [name,setName] =useState("");
	const [validName,setValidName] = useState(true);
	
	const assignName = (idx) => {
		setPokeTeam(pt => pt.map((p,i)=> i === idx ? ({...p, nickName:name}) : p ));
		setName("");
		setEditingNickName(-1)
	}

	const cancelEdit = () => {
		setName("");
		setEditingNickName(-1)
	}

	useEffect(()=>{
		setValidName(validateName(name));
	},[name])

	const fillCarousel = (x) => {
		let needed = TEAM_SIZE - pokeTeam.length;
		let output = [];
		for(let i = 0; i < needed; i++){
			output.push(
			<div key={"empty"+i} className={"team-card card"+(pokeTeam.length+i+1)}>
				<header><h1>Empty</h1></header>
				<EmptySlotCard slotNumber={pokeTeam.length+1+i}/>
			</div>
			)
		}
		return output
	}
	const removeFromTeam = (id) => {
		setPokeTeam(pt=> pt.map(p => p === null || p.id===id?null:p));
	}

	return(
		<div className="carousel-container">
		{console.log(pokeTeam)}
			<button onClick={() => {setSpin(spin+SPIN_AMOUNT);cancelEdit()}}>Previous</button>
			<div className="carousel-scene">
				{editingNickName !== -1 ? (
					<div className="carousel-button-bar">
							<button disabled={!validName} className="carousel-btn-cta" onClick={()=>assignName(editingNickName)}><FontAwesomeIcon icon={faThumbsUp} /> Save changes</button>
							<button onClick={cancelEdit}><FontAwesomeIcon icon={faThumbsDown} /> Cancel changes</button>
							{!validName && <p className="carousel-validation-msg">Please enter a name between 3 and 20 characters long.</p>}
					</div>)
					:<p>hint: click on the name to edit it</p>}
				<div className="carousel show-card" style={{transform: `translateZ(-500px) rotateY(${spin}deg)`}}>
					{pokeTeam.map((p,i) => (
						p===null?
						<div key={"empty"+i} className={"team-card card"+(pokeTeam.length+i+1)}>
							<header><h1>Empty</h1></header>
							<EmptySlotCard slotNumber={i+1}/>
						</div>
						:<div key={p.id} className={"team-card card"+(i+1)}>
							<header onClick={()=>{setName(pokeTeam[i].nickName);setEditingNickName(i)}}>
							{editingNickName === i ?
								<input type="text" value={name} onChange={(e)=>{setName(e.target.value.trim())}} />
							:<h1>{pokeTeam[i].nickName}</h1>}
							</header>
							<BigCard bigCard={p.pokemon} />
							<button onClick={()=>removeFromTeam(p.id)}><FontAwesomeIcon icon={faSquareMinus} /> Remove from team</button>
						</div>
						))}
					{fillCarousel()}
				</div>
			</div>
			<button className="move" onClick={() => {setSpin(spin-SPIN_AMOUNT);cancelEdit()}}>Next</button>
		</div>
	)
}

export default TeamCarousel;
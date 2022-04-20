import BallLoadSpinner from "../pokedex/BallLoadSpinner";
import "./big-card.css";
import { useEffect, useState } from 'react';
import bigCardBuilder from "./bigCardBuilder";
import { useRecoilState } from "recoil";
import pokeTeamState from "../../atoms/pokeTeamState";
import bigCardData from "../../atoms/bigCardData";
import BigCard from "./BigCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";


const BigCardDisplay = ({teamId,setTeamId,show,poke}) => {
	const [bigCard,setBigCard] = useState(null);
	const [bigCards,setBigCards] = useRecoilState(bigCardData);
	const [pokeTeam,setPokeTeam] = useRecoilState(pokeTeamState);
	

	const countTeamMembers = () => {
		let count = 0;
		console.log(pokeTeam)
		pokeTeam.forEach(p => {
			if(p !== null) count++;
		})
		return count;
	}
	
	useEffect(async ()=>{
		console.log("bigCards: ",bigCards,"poke: ",poke);
		if (bigCards[0]!==null && bigCards.find(f=>f.name.toLowerCase()===poke.name)) setBigCard(bigCards.find(f=>f.name.toLowerCase()===poke.name));
		else {
			const card = await bigCardBuilder(poke)
			setBigCard(card);
			bigCards[0]===null?setBigCards([card]):setBigCards([...bigCards,card]);
		}
	},[])

	const addToTeam = () => {
		// if (!pokeTeam.find(f=>f===null)===undefined) setPokeTeam([...pokeTeam,{id:{teamId}, nickName:bigCard.name, pokemon:bigCard}]);
		const idx = pokeTeam.findIndex(f=>f===null);
		let newArr = [...pokeTeam];
		newArr[idx] = {id:teamId, nickName:bigCard.name, pokemon:bigCard};
		// setPokeTeam([...pokeTeam,{id:{teamId}, nickName:bigCard.name, pokemon:bigCard}]);
		setPokeTeam(newArr);
		setTeamId(teamId+1);
	}

	return (
		<div className="big-card-backdrop" onClick={()=>show(null)}>
		<div className="big-card-info-left">
			<p>Team members: {countTeamMembers()} / 5</p>
			<button disabled={pokeTeam.find(f=>f===null)===undefined}
				onClick={(e)=>{e.stopPropagation();addToTeam()}}>
				{pokeTeam.find(f=>f===null)===undefined?
				"Team is full!"
				:<div><FontAwesomeIcon icon={faSquarePlus}/><span> Add to team</span></div>}
			</button>
		</div>
			{bigCard ===null ?
			<BallLoadSpinner/>:<BigCard bigCard={bigCard}/>}
			<button><Link to="/team">View Team</Link></button>
		</div>
	)
}

export default BigCardDisplay;
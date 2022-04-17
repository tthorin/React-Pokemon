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


const BigCardDisplay = ({show,poke}) => {
	const [bigCard,setBigCard] = useState(null);
	const [bigCards,setBigCards] = useRecoilState(bigCardData);
	const [pokeTeam,setPokeTeam] = useRecoilState(pokeTeamState);
	

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
		if (pokeTeam.length<5) setPokeTeam([...pokeTeam,{nickName:bigCard.name, pokemon:bigCard}]);
		console.log("from bigCard,addtotteam",pokeTeam);
	}

	return (
		<div className="big-card-backdrop" onClick={()=>show(null)}>
			<p>Team members: {pokeTeam.length} / 5</p>
			<button disabled={pokeTeam.length>4} onClick={(e)=>{e.stopPropagation();addToTeam()}}>{pokeTeam.length>4?"Team is full!":<div><FontAwesomeIcon icon={faSquarePlus}/><span> Add to team</span></div>}</button>
			{bigCard ===null ?
			<BallLoadSpinner/>:<BigCard bigCard={bigCard}/>}
			<button><Link to="/team">View Team</Link></button>
		</div>
	)
}

export default BigCardDisplay;
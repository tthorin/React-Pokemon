import BallLoadSpinner from "../pokedex/BallLoadSpinner";
import "./big-card.css";
import { useEffect, useState } from 'react';
import bigCardBuilder from "./bigCardBuilder";
import { useRecoilState } from "recoil";
import pokeTeamState from "../../atoms/pokeTeamState";
import bigCardData from "../../atoms/bigCardData";
import BigCard from "./BigCard";
import { Link } from "react-router-dom";
import BigCardInfoLeft from "./BigCardInfoLeft";


const BigCardDisplay = ({teamId,setTeamId,show,poke}) => {
	const [bigCard,setBigCard] = useState(null);
	const [bigCards,setBigCards] = useRecoilState(bigCardData);
	const [pokeTeam,setPokeTeam] = useRecoilState(pokeTeamState);

	const bigCardState = {
		bigCard,
		setBigCard,
		bigCards,
		setBigCards,
		pokeTeam,
		setPokeTeam,
		teamId,
		setTeamId	
	}
	
	useEffect(async ()=>{
		if (bigCards[0]!==null && bigCards.find(f=>f.name.toLowerCase()===poke.name))
			setBigCard(bigCards.find(f=>f.name.toLowerCase()===poke.name));
		else {
			const card = await bigCardBuilder(poke)
			setBigCard(card);
			bigCards[0]===null?setBigCards([card]):setBigCards([...bigCards,card]);
		}
	},[])

	return (
		<div className="big-card-backdrop" onClick={()=>show(null)}>
			<BigCardInfoLeft bigCardState={bigCardState}/>
			{bigCard ===null ?
			<BallLoadSpinner/>
			:<BigCard bigCard={bigCard}/>}
			<button><Link to="/team">View Team</Link></button>
		</div>
	)
}

export default BigCardDisplay;
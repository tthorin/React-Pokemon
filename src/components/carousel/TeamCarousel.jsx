import "./carousel.css";
import { useState,useEffect } from 'react';
import { useRecoilState } from "recoil";
import pokeTeamState from "../../atoms/pokeTeamState";
import { validateName } from "../validate";
import { cancelEdit } from "./TeamCarouselUtils";
import CarouselButtonBar from "./CarouselButtonBar";
import CarouselCards from "./CarouselCards";

const TeamCarousel = ({ team }) => {
	const TEAM_SIZE = 5;
	const SPIN_AMOUNT = 360 / TEAM_SIZE;
	const [pokeTeam, setPokeTeam] = useRecoilState(pokeTeamState);
	const [spin, setSpin] = useState(0);
	const [editingNickName,setEditingNickName] = useState(-1);
	const [name,setName] =useState("");
	const [validName,setValidName] = useState(true);

	const carouselState = {
		pokeTeam:pokeTeam,
		setPokeTeam:setPokeTeam,
		editingNickName:editingNickName,
		setEditingNickName:setEditingNickName,
		name:name,
		setName:setName,
		validName:validName,
		setValidName:setValidName
	};
	
	useEffect(()=>{
		setValidName(validateName(name));
	},[name])
	
	return(
		<div className="carousel-container">
			<button onClick={() => {setSpin(spin+SPIN_AMOUNT);cancelEdit(carouselState)}}>Previous</button>
			<div className="carousel-scene">
			<CarouselButtonBar carouselState={carouselState}/>
				<div className="carousel show-card" style={{transform: `translateZ(-500px) rotateY(${spin}deg)`}}>
					<CarouselCards carouselState={carouselState}/>
				</div>
			</div>
			<button className="move" onClick={() => {setSpin(spin-SPIN_AMOUNT);cancelEdit(carouselState)}}>Next</button>
		</div>
	)
}

export default TeamCarousel;
import { capitalize } from "./capitalize"
import { useState, useEffect } from 'react';
import BallLoadSpinner from "./BallLoadSpinner";

import "./pokedex.css"
import PokedexSmallCard from "./PokedexSmallCard";

const Pokedex = ({pokeList}) => {
	const PAGE_SIZE = 20;
	const [pagination,setPagination] = useState(0);
	const [fetchedPokemons,setFetchedPokemons] = useState([]);
	let filteredList = pokeList.slice(pagination,pagination+PAGE_SIZE);

	const updateFetched = async (idx) => {
		let arr = [];
		for (let i = idx; i < idx+PAGE_SIZE; i++) {
			if(!fetchedPokemons.find(f=>f.name===pokeList[i].name)){
			const response = await fetch(pokeList[i].url);
			const data = await response.json();
			arr.push(data);
			}
		}
		setFetchedPokemons(f=>f.concat(arr));
	}

	useEffect(async () => {
		updateFetched(pagination);
	},[]);

	const pagNext = () => {
		const newPag = pagination + PAGE_SIZE;
		filteredList = pokeList.slice(newPag,newPag+PAGE_SIZE);
		setPagination(newPag);
		updateFetched(newPag);
	}
	const pagPrev = () => {
		const newPag = pagination - PAGE_SIZE;
		filteredList = pokeList.slice(newPag,newPag+PAGE_SIZE);
		setPagination(newPag);
		updateFetched(newPag);
	}


	
	
	return(
		<div className="pokedex">
			Hello Pokedex
			<p>showing {pagination+1} - {pagination+PAGE_SIZE} out of {pokeList.length} Pokémons</p>
			<button disabled={pagination===0} onClick={pagPrev}>Prev</button>
			<button disabled={pagination+PAGE_SIZE>pokeList.length} onClick={pagNext}>Next</button>
			<div className="pokedex-container">
				{filteredList.map(p=>{return (<PokedexSmallCard key={p.name} pokemon={fetchedPokemons.find(f=>f.name===p.name)}/>)})}
			</div>
			<BallLoadSpinner/>
		</div>
	)
}

export default Pokedex;
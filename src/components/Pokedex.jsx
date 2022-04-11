import { capitalize } from "./capitalize"
import { useState, useEffect } from 'react';

import "./pokedex.css"

const Pokedex = ({pokeList}) => {
	const PAGE_SIZE = 30;
	const [pagination,setPagination] = useState({first:0,last:PAGE_SIZE});
	const [filteredList,setFilteredList] = useState(pokeList.slice(pagination.first,pagination.last));
	const [fetchedPokemons,setFetchedPokemons] = useState([]);

	useEffect(() =>{
		filteredList.forEach(async p =>{
			if(!fetchedPokemons.find(f => p.name === f.name) ){
				console.log("p name:",p.name,"f name:");
				const response = await fetch(p.url);
				const data = await response.json();
				setFetchedPokemons(f => [...f,data]);
			}
		})
	},[filteredList]);
	
	return(
		<div className="pokedex">
			Hello Pokedex
			<div className="pokedex-container">
			{filteredList.map(p=>{return (<div key={p.name} className="pokedex-list-item"><p>{capitalize(p.name)}</p></div>)})}
			</div>
			<button onClick={()=>{setFilteredList(pokeList.slice(pagination.first,pagination.last));console.log(fetchedPokemons.length)}}>Prev</button>
			<button onClick={()=>setFilteredList(pokeList.slice(pagination.last,pagination.last+PAGE_SIZE))}>Next</button>
		</div>
	)
}

export default Pokedex;
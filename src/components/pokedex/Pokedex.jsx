import { useState, useEffect } from 'react';
import "./pokedex.css"
import PokedexSmallCard from "./PokedexSmallCard";
import Search from "./Search";
import calculatePageSize from './calculatePageSize';

const Pokedex = ({pokeList,showBig}) => {
	// const PAGE_SIZE = 14;
	let  PAGE_SIZE = calculatePageSize();
	const [pagination,setPagination] = useState(0);
	const [fetchedPokemons,setFetchedPokemons] = useState([]);
	const [filteredList,setFilteredList] = useState(pokeList.slice(pagination,pagination+PAGE_SIZE));
	const [searchTerm, setSearchTerm] = useState('');

	const updateFetched = async (arr) => {
		let output = [];
		for (let i = 0; i < arr.length; i++) {
			if(!fetchedPokemons.find(f=>f.name===arr[i].name)){
			const response = await fetch(arr[i].url);
			const data = await response.json();
			output.push(data);
			}
		}
		setFetchedPokemons(f=>f.concat(output));
	}

	useEffect(async () => {
		updateFetched(filteredList);
	},[]);

	const pagNext = () => {
		const newPag = pagination + PAGE_SIZE;
		const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
		setFilteredList(newArr);
		setPagination(newPag);
		updateFetched(newArr);
	}
	const pagPrev = () => {
		const newPag = (pagination - PAGE_SIZE) < 0 ? 0 : pagination - PAGE_SIZE;
		const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
		setFilteredList(newArr);
		setPagination(newPag);
		updateFetched(newArr);
	}
	useEffect(()=>{
		if(searchTerm.length > 2){
			const newArr = pokeList.filter(p=>p.name.includes(searchTerm.trim().toLowerCase()))
			setFilteredList(newArr);
			updateFetched(newArr);
		} else {
			const newArr = pokeList.slice(pagination,pagination+PAGE_SIZE)
			setFilteredList(newArr);
			updateFetched(newArr);
		}
	},[searchTerm]);


	
	
	return(
		<div className="pokedex">
		{console.log(calculatePageSize())}
			<Search pokeList={pokeList} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			<div className="pokedex-info-area">
			{searchTerm.length > 2 ?
				<p>Search matched {filteredList.length} Pokémons</p>
				:<div>
					<button disabled={pagination===0} onClick={pagPrev}>Prev</button>
					<p>showing {pagination+1} - {pagination+PAGE_SIZE} out of {pokeList.length} Pokémons</p>
					<button disabled={pagination+PAGE_SIZE>pokeList.length} onClick={pagNext}>Next</button>
				</div>}
			</div>
			<div className="pokedex-container">
				{pagination!==null  && filteredList.map(p=>{return (<PokedexSmallCard key={p.name} showBig={showBig} pokemon={fetchedPokemons.find(f=>f.name===p.name)}/>)})}
				{filteredList.length === 0 ? <div><img src="./src/images/Spr_5b2_025_m.png" alt="" /> <p>Sorry, nothing found =/</p></div> : null}
			</div>
		</div>
	)
}

export default Pokedex;
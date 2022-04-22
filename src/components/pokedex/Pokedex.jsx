import "./pokedex.css"
import { useState, useEffect } from 'react';
import {updateFetched,searchTermEffect} from './pokedexUtilities';
import PokedexSmallCard from "./PokedexSmallCard";
import Search from "./Search";
import calculatePageSize from './calculatePageSize';
import PokedexInfoArea from './PokedexInfoArea';

const Pokedex = ({pokedexOnboarding, fetched,setFetched,pokeList,showBig}) => {
	let PAGE_SIZE = 8;
	const [pagination,setPagination] = useState(0);
	const [filteredList,setFilteredList] = useState(pokeList.slice(pagination,pagination+calculatePageSize()));
	const [searchTerm, setSearchTerm] = useState('');

	const pokedexState = {
		pokedexOnboarding,
		fetched,
		setFetched,
		pokeList,
		showBig,
		pagination,
		setPagination,
		filteredList,
		setFilteredList,
		searchTerm,
		setSearchTerm
	}

	useEffect(async () => {
		PAGE_SIZE = calculatePageSize()
		setFilteredList(pokeList.slice(pagination,pagination+PAGE_SIZE));
		updateFetched(filteredList,pokedexState);
	},[]);


	useEffect(()=>{
		searchTermEffect(pokedexState);
	},[searchTerm]);
	
	return(
		<div className="pokedex">
			<Search pokedexOnboarding={pokedexOnboarding} pokeList={pokeList} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			<PokedexInfoArea pokedexState={pokedexState}/>
			<div className="pokedex-container">
				{pagination !==null  && filteredList.map(p=>{return (<PokedexSmallCard key={p.name} showBig={showBig} pokemon={fetched.find(f=>f.name===p.name)}/>)})}
				{filteredList.length === 0 ? <div className='nothing-found'><img src="./src/images/Spr_5b2_025_m.png" alt="" /> <p>Sorry, nothing found :(</p></div> : null}
			</div>
		</div>
	)
}

export default Pokedex;
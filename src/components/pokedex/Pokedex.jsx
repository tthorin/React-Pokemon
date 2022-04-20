import { useState, useEffect,createRef } from 'react';
import "./pokedex.css"
import PokedexSmallCard from "./PokedexSmallCard";
import Search from "./Search";
import calculatePageSize from './calculatePageSize';

const Pokedex = ({pokedexOnboarding,mainRef, fetched,setFetched,pokeList,showBig}) => {
	// const PAGE_SIZE = 14;
	let PAGE_SIZE = 8;
	const [pagination,setPagination] = useState(0);
	// const [fetchedPokemons,setFetchedPokemons] = useState([]);
	const [filteredList,setFilteredList] = useState(pokeList.slice(pagination,pagination+8));
	const [searchTerm, setSearchTerm] = useState('');

	const updateFetched = async (arr) => {
		let output = [];
		for (let i = 0; i < arr.length; i++) {
			if(!fetched.find(f=>f.name===arr[i].name)){
			const response = await fetch(arr[i].url);
			const data = await response.json();
			output.push(data);
			}
		}
		setFetched(f=>f.concat(output));
	}

	useEffect(async () => {
		PAGE_SIZE = calculatePageSize()
		setFilteredList(pokeList.slice(pagination,pagination+PAGE_SIZE));
		updateFetched(filteredList);
	},[]);

	const pagNext = () => {
		PAGE_SIZE = calculatePageSize();
		const newPag = pagination + PAGE_SIZE;
		const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
		setFilteredList(newArr);
		setPagination(newPag);
		updateFetched(newArr);
	}
	const pagPrev = () => {
		PAGE_SIZE = calculatePageSize();
		const newPag = (pagination - PAGE_SIZE) < 0 ? 0 : pagination - PAGE_SIZE;
		const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
		setFilteredList(newArr);
		setPagination(newPag);
		updateFetched(newArr);
	}
	useEffect(()=>{
		if(searchTerm.length > 2 || searchTerm.substring(0,1)==="#"){
			let newArr=null;
			let reg = new RegExp(`\/${searchTerm.substring(1)}\/$`);
			searchTerm.substring(0,1)==="#"?
			newArr=pokeList.filter(p=>reg.test(p.url))
			:newArr = pokeList.filter(p=>p.name.includes(searchTerm.trim().toLowerCase()));
			setFilteredList(newArr);
			updateFetched(newArr);
		} else {
			const newArr = pokeList.slice(pagination,pagination+PAGE_SIZE)
			setFilteredList(newArr);
			updateFetched(newArr);
		}
	},[searchTerm]);


	const pdexContRef = createRef();
	
	return(
		<div className="pokedex">
			<Search pokedexOnboarding={pokedexOnboarding} pokeList={pokeList} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			<div className="pokedex-info-area">
			{searchTerm.length > 2 || searchTerm.substring(0,1)==="#"?
				<p>Search matched {filteredList.length} Pokémons</p>
				:<div>
					<button disabled={pagination===0} onClick={pagPrev}>Prev</button>
					<p>showing {pagination+1} - {pagination+PAGE_SIZE} out of {pokeList.length} Pokémons</p>
					<button disabled={pagination+calculatePageSize()>pokeList.length} onClick={pagNext}>Next</button>
				</div>}
			</div>
			<div className="pokedex-container" ref={pdexContRef}>
				{pagination !==null  && filteredList.map(p=>{return (<PokedexSmallCard key={p.name} showBig={showBig} pokemon={fetched.find(f=>f.name===p.name)}/>)})}
				{filteredList.length === 0 ? <div className='nothing-found'><img src="./src/images/Spr_5b2_025_m.png" alt="" /> <p>Sorry, nothing found :(</p></div> : null}
			</div>
		</div>
	)
}

export default Pokedex;
import "./search.css";
import  { useState } from 'react';

const Search = ({pokedexOnboarding,searchTerm,setSearchTerm}) => {
	const [isFocused,setIsFocused] = useState(false);

    return (
        <div className={(searchTerm.length>0||isFocused)?"search centered":"search"}>
			{!pokedexOnboarding.shown &&
			 <div className="pokedex-search-onboarding">
				<h3>Welcome to the Pokèdex!</h3>
				<p>You can search for a Pokémon either by name or you can also search for an id by staring the search term with '#' (ex. #101 )</p>
				<button onClick={()=>pokedexOnboarding.setShown(true)}>OK, got it!</button>
			 </div>}
            <label >Search</label>
            <input type="text" value={searchTerm}
			 onChange={e=>setSearchTerm(e.target.value.trim())}
			onFocus={()=>setIsFocused(true)}
			onBlur={()=>setIsFocused(false)}
			 />
			 {isFocused && (searchTerm.length<3 &&searchTerm.substring(0,1)!=="#") ? <p>Search will begin filtering once you've entered at least 3 characters.</p> : null}
			{searchTerm.length > 0 ?<button onClick={()=>setSearchTerm('')}>Clear search</button>:undefined}
        </div>

    )
}

export default Search
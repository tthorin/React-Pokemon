import "./search.css";
import  { useState } from 'react';

const Search = ({searchTerm,setSearchTerm}) => {
	const [isFocused,setIsFocused] = useState(false);

    return (
        <div className={(searchTerm.length>0||isFocused)?"search centered":"search"}>
            <label >Search</label>
            <input type="text" value={searchTerm}
			 onChange={e=>setSearchTerm(e.target.value.trim())}
			onFocus={()=>setIsFocused(true)}
			onBlur={()=>setIsFocused(false)}
			 />
			 {isFocused && searchTerm.length<3 ? <p>Search will begin filtering once you've entered at least 3 characters.</p> : null}
			<button onClick={()=>setSearchTerm('')}>Clear search</button>
        </div>

    )
}

export default Search
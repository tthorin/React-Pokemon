import {useState} from 'react'

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropDown,setShowDropDown] = useState(false);

    return (
        <div className="search">
            <label >Search</label>
            <input type="text" value={searchTerm} onChange={e=>{
                setSearchTerm(e.target.value);
                e.target.value.trim().length > 2
                  ?setShowDropDown(true)
                  :setShowDropDown(false)
                }}/>
            {showDropDown &&
            <ul className='search-dropdown-list'>
                {props.pokeList.map(pokemon => {
                    if (searchTerm.trim().length > 2 && pokemon.name.includes(searchTerm.toLowerCase())) {
                        return <li key={pokemon.name} onClick={()=>{
                                    setSearchTerm(pokemon.name);
                                    setShowDropDown(false);
                                    }}>
                                    {pokemon.name.substring(0,1).toUpperCase()+pokemon.name.substring(1)}
                                </li>
                    }
                })}
            </ul>}
        </div>

    )
}

export default Search
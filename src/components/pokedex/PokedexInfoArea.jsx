import { pagNext,pagPrev } from "./pokedexUtilities";
import calculatePageSize from "./calculatePageSize";

const PokedexInfoArea = ({pokedexState}) => {
	const {searchTerm,filteredList,pagination,pokeList} = pokedexState;
	return (
		<div className="pokedex-info-area">
			{searchTerm.length > 2 || searchTerm.substring(0,1)==="#"?
			<p>Search matched {filteredList.length} Pokémons</p>
			:<div>
				<button disabled={pagination===0} onClick={()=>pagPrev(pokedexState,"first")}>First</button>
				<button disabled={pagination===0} onClick={()=>pagPrev(pokedexState,"ten")}>&lt;10</button>
				<button disabled={pagination===0} onClick={()=>pagPrev(pokedexState,"one")}>Prev</button>
				<p>showing {pagination+1} - {pagination+calculatePageSize()} out of {pokeList.length} Pokémons</p>
				<button disabled={pagination+calculatePageSize()>=pokeList.length} onClick={()=>pagNext(pokedexState,"one")}>Next</button>
				<button disabled={pagination+calculatePageSize()>=pokeList.length} onClick={()=>pagNext(pokedexState,"ten")}>10&gt;</button>
				<button disabled={pagination+calculatePageSize()>=pokeList.length} onClick={()=>pagNext(pokedexState,"last")}>Last</button>
			</div>}
		</div>
	);
}

export default PokedexInfoArea;
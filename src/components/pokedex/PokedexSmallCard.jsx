import BallLoadSpinner from "./BallLoadSpinner";
import { capitalize } from "../capitalize"
import "./pokedex-small-card.css"

const PokedexSmallCard =  ({pokemon,showBig}) => {
	return (
			<div className="pokedex-small-card" onClick={()=>showBig(pokemon)}>
				{!pokemon?<BallLoadSpinner/>:(
					<div className="small-card-content">
					<img src={pokemon.sprites.front_default} alt={pokemon.name}/>
						{/* <p>#{pokemon.id<100?("000"+pokemon.id).slice(-3):pokemon.id}</p> */}
						<h3>{capitalize(pokemon.name)}</h3>
						{/* <p>Type(s): {pokemon.types.map(t=>t.type.name).join(" / ")}</p> */}
					</div>
				)}
			</div>
        )
    }

export default PokedexSmallCard;
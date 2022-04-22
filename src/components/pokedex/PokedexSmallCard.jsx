import BallLoadSpinner from "./BallLoadSpinner";
import { capitalize } from "../capitalize"
import "./pokedex-small-card.css"

const PokedexSmallCard =  ({pokemon,showBig}) => {
	return (
			<div className="pokedex-small-card" onClick={()=>showBig(pokemon)}>
				{!pokemon ?
				<BallLoadSpinner/>
				:(<div className="small-card-content">
					<img src={pokemon.sprites.front_default} alt={pokemon.name}/>
					<h3>{capitalize(pokemon.name)}</h3>
				</div>)}
			</div>
        )
    }

export default PokedexSmallCard;
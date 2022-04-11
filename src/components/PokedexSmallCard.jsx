import BallLoadSpinner from "./BallLoadSpinner";
import { capitalize } from "./capitalize"

const PokedexSmallCard =  ({pokemon}) => {
    console.log("in card:",pokemon);
    if (!pokemon) return <BallLoadSpinner/>;
    else{
        return (
            <div className="pokedex-small-card">
                {pokemon?<img src={pokemon.sprites.front_default} alt={pokemon.name}/>:"loading"}
                <p>{capitalize(pokemon.name)}</p>
            </div>
    
        )
    }
}

export default PokedexSmallCard;
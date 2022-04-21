import { capitalize } from "../capitalize"

const getTypes = (types) => {
	const output = types.length > 1 ?
	 	"types: " + types.map(type => type.type.name).join(" / ") 
		:"type: " + types[0].type.name
	return output
}

const getEvolution = async url => {
	const response = await fetch(url)
	const data = await response.json()
	return data.evolves_from_species ?
	 "Evolves from: " + capitalize(data.evolves_from_species.name )
	 : null
}

const getAbilityDesc = (ability) =>{
	let output = "";
	if(ability.effect_entries.length > 0){
		output = ability.effect_entries.find(f=>f.language.name==="en").short_effect;
	} else if (ability.flavor_text_entries.length > 0){
		output = ability.flavor_text_entries.find(f=>f.language.name==="en").flavor_text;
	} else output= "No description available";
	
	return output;
}

const getAbilities = async abilities => {
	const output = []
	for (let i = 0; i < abilities.length; i++) {
		const response = await fetch(abilities[i].ability.url)
		const data = await response.json()
		const name = capitalize(data.name)
		const desc = getAbilityDesc(data)
		output.push({name,desc})
	}
	return output
}
const getArtwork = (sprites) => {
	if(sprites.other["official-artwork"].front_default){
		return sprites.other["official-artwork"].front_default
	} else if (sprites.other.home.front_default){
		return sprites.other.home.front_default
	} else if (sprites.front_default){
		return sprites.front_default
	} else return "./src/favicon.png"
}

const bigCardBuilder = async (pokemon) => {
	const output = {}
	output.id = pokemon.id
	output.name = capitalize(pokemon.name)
	output.hp = pokemon.stats.find(f=>f.stat.name==="hp").base_stat
	output.img = getArtwork(pokemon.sprites);
	output.types = getTypes(pokemon.types)
	output.evolvesFrom = await getEvolution(pokemon.species.url)
	output.abilities = await getAbilities(pokemon.abilities)
	return output;
}

export default bigCardBuilder;


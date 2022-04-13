import BallLoadSpinner from "./BallLoadSpinner";
import "./big-card.css";
import { capitalize } from "./capitalize";
import { useEffect, useState } from 'react';


const BigCard = ({show,poke}) => {
	const [species,setSpecies] = useState(null);
	const [abilities,setAbilities] = useState([]);

	
	
	const getAbilityDesc = (ability) =>{
		let output = "";
		if(ability.effect_entries.length > 0){
			output = ability.effect_entries.find(f=>f.language.name==="en").short_effect;
		} else if (ability.flavor_text_entries.length > 0){
			output = ability.flavor_text_entries.find(f=>f.language.name==="en").flavor_text;
		} else {
			output= "No description available";
		}
		return output;
	}

	const updateAbilities = async () => {
		let output = [];
		for (let i = 0; i < poke.abilities.length; i++) {
			const response = await fetch(poke.abilities[i].ability.url);
			const data = await response.json();
			output.push(data);
		}
		setAbilities(output);
	}

	useEffect(async ()=>{
			console.log("im in useEffect");
			const response = await fetch(poke.species.url)
			const data = await response.json();
			setSpecies(data);
			updateAbilities();
	},[])

	return (
		<div className="big-card-backdrop" onClick={()=>show(null)}>
			<section className="big-card">
			{typeof poke==="object" && poke !== undefined ?(
				<div className="big-card-content">
				
					<p className="poke-id">Id #{poke.id<100?("000"+poke.id).slice(-3):poke.id}</p>
					<h3 className="poke-name">{capitalize(poke.name)}</h3>
					<p className="poke-hp">base hp: {poke.stats.find(f=>f.stat.name=="hp").base_stat}</p>
					<p className="poke-type">type(s): {poke.types.map(t=>t.type.name).join(" /")}</p>
					<img className="poke-art" src={poke.sprites.other["official-artwork"]["front_default"]} alt="" />
					{species ? <p className="poke-species">{species.evolves_from_species!==null?`Evolves from: ${capitalize(species.evolves_from_species.name)}`:""}</p>:""}
					{abilities[0] ? (
						<div className="poke-ability0">
							<p className="poke-ab1">{capitalize(abilities[0].name)}: </p>
							<p className="poke-ab1-desc">{getAbilityDesc(abilities[0])}</p>
						</div>
						):<BallLoadSpinner className="poke-ability0"/>
					}
					{abilities[1] && (
						<div className="poke-ability1">
							<p className="poke-ab1">{capitalize(abilities[1].name)}: </p>
							<p className="poke-ab1-desc">{getAbilityDesc(abilities[1])}</p>
						</div>
						)
					}
				</div>):<BallLoadSpinner className="poke-ability1"/>}
			</section>
		</div>

	)
}

export default BigCard;
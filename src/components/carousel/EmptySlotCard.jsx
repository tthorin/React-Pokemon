import "../bigCard/big-card.css";
import { Link } from "react-router-dom";

const EmptySlotCard = ({slotNumber}) => {
	return (
		<section className="big-card">
			<div className="big-card-empty-slot">
				<h1>Team Slot {slotNumber}</h1>
				<img src="./src/images/Spr_5b2_025_m.png" alt="" />
				<p>Visit the <Link to="/pokedex">Pokédex</Link> to add a Pokémon to your dream team!</p>
			</div>
		</section>
	)
}

export default EmptySlotCard;

import "../bigCard/big-card.css";
import { Link } from "react-router-dom";
import pika from "../../images/pikaSprite.png"

const EmptySlotCard = ({slotNumber}) => {
	return (
		<section className="big-card">
			<div className="big-card-empty-slot">
				<h1>Team Slot {slotNumber}</h1>
				<img src={pika} alt="" />
				<p>Visit the <Link to="/pokedex">Pokédex</Link> to add a Pokémon to your dream team!</p>
			</div>
		</section>
	)
}

export default EmptySlotCard;

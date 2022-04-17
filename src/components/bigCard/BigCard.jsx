
import BigCardContent from "./BigCardContent";

const BigCard =({bigCard}) => {
	return (
		<section className="big-card">
			<BigCardContent bc={bigCard}/>
		</section>
	)
}

export default BigCard;
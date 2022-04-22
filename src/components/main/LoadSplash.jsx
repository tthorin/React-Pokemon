import "./load-splash.css";
import pika from "../../images/pikaSprite.png"

const LoadSplash = () => {
	return (
		<div className="load-splash-background">
			<h1>Preparing your experience</h1>
			<img src={pika} alt="" />
			<h3>Please wait...</h3>
		</div>
	)
}

export default LoadSplash;
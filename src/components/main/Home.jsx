import "./load-splash.css";
import pika from "../../images/pikaSprite.png"

const Home = () => {
	return(
		<div className="home-background">
		<section className="home-backdrop">
			<h2 className="home-headline">Welcome to the</h2>
			<h1 className="home-headline">the Poké manager!</h1>
			<img src={pika} alt="" />
			<h2>Create your own team of your favourite pokémons!</h2>
		</section>
		</div>
	)
}

export default Home;
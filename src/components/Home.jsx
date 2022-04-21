import LoadSplash from "./LoadSplash";
import "./load-splash.css";

const Home = () => {
	return(
		<div className="load-splash-background">
			<h2 className="home-headline">Welcome to the</h2>
			<h1 className="home-headline">the Poké manager!</h1>
			<img src="./src/images/Spr_5b2_025_m.png" alt="" />
			<h2>Create your own team of your favourite pokémons!</h2>
		</div>
	)
}

export default Home;
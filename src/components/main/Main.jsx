import {Routes,Route} from 'react-router-dom';
import TeamCarousel from "../carousel/TeamCarousel";
import Credits from "./Credits";
import Pokedex from "../pokedex/Pokedex";
import Home from "./Home";

const Main = ({appState}) => {
	const {
		setBigCard,
		pokeList,
		fetchedPokemons,
		setFetchedPokemons,
		pokedexOnboardingShown,
		setPokedexOnboardingShown
	} = appState;

	const pokedexOnboarding = {
		shown:pokedexOnboardingShown,
		setShown:setPokedexOnboardingShown
	};

	return ( 
		<main>
          <Routes>
            <Route
              path="/pokedex"
              element={
				<Pokedex pokedexOnboarding={pokedexOnboarding}
					showBig={setBigCard}
					pokeList={pokeList}
					fetched={fetchedPokemons}
					setFetched={setFetchedPokemons}
				/>
			  }
            />
            <Route path="/team" element={<TeamCarousel />} />
			<Route path="/credits" element={<Credits/>} />
			<Route path="/" element={<Home/>}/>
          </Routes>
        </main>
	 );
}

export default Main;
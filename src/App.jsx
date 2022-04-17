import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Pokedex from "./components/pokedex/Pokedex";
import LoadSplash from "./components/LoadSplash";
import BigCardDisplay from "./components/bigCard/BigCardDisplay";
import TeamCarousel from "./components/carousel/TeamCarousel";

const URL = "https://pokeapi.co/api/v2/";
const FULL_LIST = "pokemon?limit=1200&offset=0";

function App() {
  const [pokeList, setPokeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigCard, setBigCard] = useState(null);

  useEffect(async () => {
    const response = await fetch(URL + FULL_LIST);
	const data = await response.json();
	setPokeList(data.results);
	setIsLoading(false);
  }, []);

  if (isLoading) return <LoadSplash />;
  else {
    return (
      <Router>
	    {bigCard && <BigCardDisplay poke={bigCard} show={setBigCard}/>}
      <div className="app-container">
        <header>
			<img src="./src/images/pokemon-logo-bw.png" alt="" />
		</header>
        {/* <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pokedex">Pokedex</NavLink>
        </nav> */}
        <nav>
			<NavLink to="/pokedex"><img src="./src/images/240px-479Rotom-Pokédex_2.png" alt="" />Pokédex</NavLink>
			<NavLink to="/team"><img src="./src/images/Pokemon-PNG-Pic.png" alt="" />Your Team</NavLink>
        </nav>
        <main>
          <Routes>
            <Route
              path="/pokedex"
              element={<Pokedex showBig={setBigCard} pokeList={pokeList} />}
            />
            <Route path="/team" element={<TeamCarousel />} />
			<Route path="/" element={<Pokedex showBig={setBigCard} pokeList={pokeList} />} />
          </Routes>
        </main>
        <footer>
        </footer>
        
      </div>
  
      
      </Router>
    );
  }
}

export default App;

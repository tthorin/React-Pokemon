import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Search from "./components/Search";
import Pokedex from "./components/Pokedex";
import { createMemoryHistory } from "history";
import LoadSplash from "./components/LoadSplash";
import BigCard from "./components/BigCard";

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
	  {bigCard && <BigCard poke={bigCard} show={setBigCard}/*pokemon={fetchedPokemons[0]}*//>}
      <div className="app-container">
        <header>
			<img src="./src/images/pokemon-logo-png-1444.png" alt="" />
		</header>
        {/* <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pokedex">Pokedex</NavLink>
        </nav> */}
        <aside>
			<NavLink to="/pokedex"><img src="./src/images/240px-479Rotom-Pokédex_2.png" alt="" /></NavLink>
        </aside>
        <main>
          <Routes>
            <Route path="/" element={<Pokedex pokeList={pokeList} />} />
            <Route
              path="/pokedex"
              element={<Pokedex showBig={setBigCard} pokeList={pokeList} />}
            />
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

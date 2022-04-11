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

const URL = "https://pokeapi.co/api/v2/";
const FULL_LIST = "pokemon?limit=1200&offset=0";

function App() {
  const [pokeList, setPokeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="app-container">
        <header></header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pokedex">Pokedex</NavLink>
        </nav>
        <aside>
        </aside>
        <main>
          <Routes>
            <Route path="/" element={<Pokedex pokeList={pokeList} />} />
            <Route
              path="/pokedex"
              element={<Pokedex pokeList={pokeList} />}
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

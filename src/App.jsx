import { useState, useEffect } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import LoadSplash from "./components/LoadSplash";
import BigCardDisplay from "./components/bigCard/BigCardDisplay";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";


function App() {
  const URL = "https://pokeapi.co/api/v2/";
  const FULL_LIST = "pokemon?limit=1200&offset=0";
  const [pokeList, setPokeList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigCard, setBigCard] = useState(null);
  const [fetchedPokemons,setFetchedPokemons] = useState([]);
  const [pokeTeamId,setPokeTeamId] = useState(0);
  const [pokedexOnboardingShown,setPokedexOnboardingShown] = useState(false);
  
  const appState = {
	pokeList,
	setPokeList,
	isLoading,
	setIsLoading,
	bigCard,
	setBigCard,
	fetchedPokemons,
	setFetchedPokemons,
	pokeTeamId,
	setPokeTeamId,
	pokedexOnboardingShown,
	setPokedexOnboardingShown,
  }

  useEffect(async () => {
    const response = await fetch(URL + FULL_LIST);
	const data = await response.json();
	setPokeList(data.results);
  }, []);

  useEffect(()=>{
	  setIsLoading(pokeList===null);
  },[pokeList])

  if (isLoading) return <LoadSplash />;
  else {
    return (
      <Router>
		{bigCard && <BigCardDisplay teamId={pokeTeamId} setTeamId={setPokeTeamId} poke={bigCard} show={setBigCard}/>}
		<div className="app-container">
			<Header/>
			<Nav />
			<Main appState={appState}/>
			<Footer/>
		</div>
      </Router>
    );
  }
}

export default App;

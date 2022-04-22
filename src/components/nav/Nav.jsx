import "../../App.css";
import { NavLink } from "react-router-dom";
import pokedexImg from "../../images/Pokédex.png";
import teamImg from "../../images/Pokemons.png";

const Nav = () => {
	return (
		<nav>
			<NavLink to="/pokedex"><img src={pokedexImg} alt="" />Pokédex</NavLink>
			<NavLink to="/team"><img src={teamImg} alt="" />Your Team</NavLink>
          	<NavLink to="/" className="nav-home-link">Home</NavLink>
			<NavLink to="/credits" className="nav-credit-link">Credits</NavLink>
			<a className="nav-copyright-link" href="https://github.com/tthorin/React-Pokemon" target="_blank">© 2022  Thomas Thorin</a>
        </nav>
	  );
}

export default Nav;
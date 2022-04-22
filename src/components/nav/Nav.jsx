import "../../App.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<nav>
			<NavLink to="/pokedex"><img src="./src/images/240px-479Rotom-Pokédex_2.png" alt="" />Pokédex</NavLink>
			<NavLink to="/team"><img src="./src/images/Pokemon-PNG-Pic.png" alt="" />Your Team</NavLink>
          	<NavLink to="/" className="nav-home-link">Home</NavLink>
			<NavLink to="/credits" className="nav-credit-link">Credits</NavLink>
			<a className="nav-copyright-link" href="https://github.com/tthorin/React-Pokemon" target="_blank">© 2022  Thomas Thorin</a>
        </nav>
	  );
}

export default Nav;
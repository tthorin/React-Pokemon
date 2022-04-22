import { NavLink } from "react-router-dom";
import logo from "../../images/pokemonLogo.png";

const Header=()=> {
	return (
		<header>
			<NavLink to="/"><img className="logo" src={logo} alt="" /></NavLink>
		</header>
	  );
}

export default Header;
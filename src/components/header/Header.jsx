import { NavLink } from "react-router-dom";

const Header=()=> {
	return (
		<header>
			<NavLink to="/"><img className="logo" src="./src/images/pokemon-logo.png" alt="" /></NavLink>
		</header>
	  );
}

export default Header;
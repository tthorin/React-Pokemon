import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { countTeamMembers,addToTeam } from "./bigCardUtilities";

const BigCardInfoLeft = ({bigCardState,bigCardState:{pokeTeam}}) => {
    return ( 
        <div className="big-card-info-left">
				<p>Team members: {countTeamMembers(bigCardState)} / 5</p>
				<button disabled={pokeTeam.find(f=>f===null)===undefined}
					onClick={(e)=>{e.stopPropagation();addToTeam(bigCardState)}}>
					{pokeTeam.find(f=>f===null)===undefined?
					"Team is full!"
					:<div><FontAwesomeIcon icon={faSquarePlus}/><span> Add to team</span></div>}
				</button>
			</div>
     );
}

export default BigCardInfoLeft;
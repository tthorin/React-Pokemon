import "./pokedex-small-card.css";
import ball from "../../images/pokeBall.png"

const BallLoadSpinner = ({className}) => {
    return(
        <div className={"ball-load-spinner " + className}>
            <img className="ball" src={ball} alt="" />
        </div>
    )
}
export default BallLoadSpinner;
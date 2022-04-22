import "./pokedex-small-card.css";

const BallLoadSpinner = ({className}) => {
    return(
        <div className={"ball-load-spinner " + className}>
            <img className="ball" src="./src/favicon.png" alt="" />
        </div>
    )
}
export default BallLoadSpinner;
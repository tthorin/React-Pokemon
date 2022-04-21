import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { assignName,cancelEdit } from './TeamCarouselUtils';

const CarouselButtonBar = ({carouselState}) => {
    return carouselState.editingNickName !== -1 ? (
        <div className="carousel-button-bar">
                <button disabled={!carouselState.validName} 
                    className="carousel-btn-cta"
                    onClick={()=>assignName(carouselState.editingNickName,carouselState)}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Save changes
                 </button>
                <button onClick={()=>cancelEdit(carouselState)}><FontAwesomeIcon icon={faThumbsDown} /> Cancel changes</button>
                {!carouselState.validName &&
                    <p className="carousel-validation-msg">
                        Please enter a name between 3 and 20 characters long.
                    </p>
                }
        </div>)
        :<p>hint: click on the name to edit it</p>
}

export default CarouselButtonBar;
import Trash from "../images/Trash.svg"

export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
        console.log(props.card)
      }  
    return (
        <div className="element">
            <li className= "element__card">
                <button type="button" className="delete-button"><img  src={Trash} alt="Иконка удаления" /></button>
                <img className="element__image" onClick={handleClick} src={props.link} alt={props.name} />
                <div className="element__detail">
                    <h3 className="element__name">{props.name}</h3>
                        <div className="element__likes">
                            <button type="button" className="button-like" />
                            <p className= "like-counter">{props.likes}</p>
                        </div>
                </div>
            </li> 
        </div>
    )
}
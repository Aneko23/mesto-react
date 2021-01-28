import React from "react";
import Pencil from '../images/Edit-pencil.svg';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import api from '../utils/api';

export default function Main(props) {
    const [isOnMouseOver, setOnMouseOver] = React.useState(false);

    const contextUser = React.useContext(CurrentUserContext);
    const contextCard = React.useContext(CurrentCardContext);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === contextUser._id);

        api.clickLike(card._id, isLiked).then((newCard) => {
          const newCards = contextCard.map((c) => c._id === card._id ? newCard : c);
          return newCards;
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = contextCard.filter((c) => c.owner._id === card.owner._id);
            return newCards;
        });
    }

    function onMouseOverAvatar() {
        setOnMouseOver(true);
    }

    function onMouseOutAvatar() {
        setOnMouseOver(false);
    }

    return (
        <main>
            <section className="profile">
                <div className="profile__detail">
                    <div className="avatar" onMouseOver={onMouseOverAvatar} onMouseOut={onMouseOutAvatar} onClick={props.onEditAvatar}>
                        <div className={isOnMouseOver?`profile__avatar profile__avatar_dark`:`profile__avatar`} style={{ backgroundImage: `url(${contextUser.avatar})` }}  />
                        <img className={isOnMouseOver?`edit-pencil edit-pencil_active`:`edit-pencil`} src={Pencil} alt="Иконка редактирования" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{contextUser.name}</h1>
                        <button type="button" onClick={props.onEditProfile} className="edit-button" />
                        <p className="profile__work">{contextUser.about}</p>
                    </div>    
                </div>  
                <button type="button" onClick={props.onAddPlace} className="add-button" />
            </section>
            <PopupWithForm name='place' title='Новое место' submit='Добавить' isOpen={props.isAddPlacePopupOpen} onClose={props.onClose} onClosePopup={props.onClosePopup}>
                <input className="popup__data popup__data_place" id="form-place" type="text" placeholder="Название" name="placeInput" required minLength="2" maxLength="30" />
                <span className= "popup__input-error" id='form-place-error' />
                <input className="popup__data popup__data_link" id="form-link" placeholder="Ссылка на картинку" type="url" name="linkInput" required />
                <span className= "popup__input-error" id='form-link-error' />
            </PopupWithForm>
            <PopupWithForm name='delete' title='Вы уверены?' submit='Да' onClose={props.onClose} onClosePopup={props.onClosePopup}/>
            <PopupWithForm name='avatar' title='Обновить аватар' submit='Сохранить' isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} onClosePopup={props.onClosePopup}>
                <input className="popup__data popup__data_link" id="form-link" placeholder="Ссылка на картинку" type="url" name="linkInput" required />
                <span className= "popup__input-error" id='form-link-error' />
            </PopupWithForm>
            <ImagePopup card={props.selectedCard} onClose={props.onClose} onClosePopup={props.onClosePopup}/>
            <ul className="elements">
            {contextCard.map((card) => (
               <Card 
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
               >
               </Card>
            ))
            }
            </ul>
            </main>
    )
    }
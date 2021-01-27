import React from "react";
import Pencil from '../images/Edit-pencil.svg';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import Card from '../components/Card'

export default function Main(props) {
    const [userName, setUserName] = React.useState("Жак-Ив Кусто");
    const [userDescription, setUserDescription] = React.useState("Исследователь океана");
    const [userAvatar, setUserAvatar] = React.useState(" ");
    const [cards, setCards] = React.useState([]);
    const [isOnMouseOver, setOnMouseOver] = React.useState(false);

    React.useEffect(() => {
        api.getUserProfile()
        .then(res => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar)
        })
        .catch((error) => {
            console.log(`Возникла ошибка: ${error}`)
        })
      }, [userName, userDescription, userAvatar]);

      React.useEffect(() => {
        api.getCards()
        .then(res => {
            setCards(res)
        })
            .catch((error) => {
                console.log(`Возникла ошибка: ${error}`)
            })
      }, [cards])

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
                        <div className={isOnMouseOver?`profile__avatar profile__avatar_dark`:`profile__avatar`} style={{ backgroundImage: `url(${userAvatar})` }}  />
                        <img className={isOnMouseOver?`edit-pencil edit-pencil_active`:`edit-pencil`} src={Pencil} alt="Иконка редактирования" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" onClick={props.onEditProfile} className="edit-button" />
                        <p className="profile__work">{userDescription}</p>
                    </div>    
                </div>  
                <button type="button" onClick={props.onAddPlace} className="add-button" />
            </section>
            <PopupWithForm name='edit' title='Редактировать профиль' submit='Сохранить' isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} onClosePopup={props.onClosePopup}>
                <input className="popup__data popup__data_name" id="form-name" type="text" name="nameInput" required minLength="2" maxLength="40" />
                <span className= "popup__input-error" id='form-name-error' />
                <input className="popup__data popup__data_job" id="form-job" type="text" name="jobInput" required minLength="2" maxLength="200" />
                <span className= "popup__input-error" id='form-job-error' />
            </PopupWithForm>
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
            {cards.map((card) => (
               <Card 
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                key={card._id}
                onCardClick={props.onCardClick}
               >
               </Card>
            ))
            }
            </ul>
            </main>
    )
    }
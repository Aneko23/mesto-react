import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [onClose, closeAllPopups] = React.useState(true);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isPopupOpened: false});
  const [currentUser, setCurrentUser] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [removedCard, setRemovedCard] = React.useState('');

//Получаю гелерею с сохранёнными карточками
    React.useEffect(() => {
      api.getCards()
      .then(res => {
          setCards(res)
      })
      .catch((error) => {
          console.log(`Возникла ошибка: ${error}`)
      })
    }, [cards]);
  
//Функция для клика по сердечку
    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.clickLike(card._id, isLiked).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      });
  }
  
//Функция удаления карточки
      function handleCardDelete(card) {
          api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c.owner._id === card.owner._id);
                return newCards;
            })
            .catch((error) => {
              console.log(`Возникла ошибка: ${error}`)
          })
            .finally(() => handleCloseAllPopups());
      }

//Получаю данные пользователя с сервера
  React.useEffect(() => {
    api.getUserProfile()
    .then(res => {
      setCurrentUser(res)
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
  }, []);
  
//Функция для открытия попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard({
      isPopupOpened: true,
      name: card.name,
      link: card.link
    });
  }

//Функция для открытия попапа для редактирования аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    closeAllPopups(false);
}

//Функция для открытия попапа для редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    closeAllPopups(false);
  }

//Функция для открытия попапа для добавления новых карточек
  function handleAddPlaceClick() {
      setAddPlacePopupOpen(true);
      closeAllPopups(false);
  }

//Функция для открытия попапа с подтверждением об удалении карточки
  function handleDeleteCardClick(card) {
    setRemovedCard(card);
    setDeleteCardPopupOpen(true);
    closeAllPopups(false);
  }

//Функция для закрытия всех попапов
  function handleCloseAllPopups() {
    closeAllPopups(true);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

//Функция для обновления данных о пользователе
  function handleUpdateUser(data) {
    api.setUserProfile(data.name, data.about)
    .then(res => {
      setCurrentUser(res)
    })
    .catch((err) => {
        console.log(`Возникла ошибка: ${err}`)
    })
    .finally(() => handleCloseAllPopups());
  }

//Функция добавления новой карточки
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard.name, newCard.link)
        .then(card => {
            setCards([card, ...cards]);

    })
    .catch((err) => console.log (`Возникла ошибка: ${err}`))
    .finally(() => handleCloseAllPopups());
  }

//Функция для обновления аватара
  function handleUpdateAvatar(card) {
    api.changeUserAvatar(card.avatar)
    .then(res => {
      setCurrentUser(res);
    })
    .catch(err => {
      console.log(`Возникла ошибка: ${err}`)
    })
    .finally(() => handleCloseAllPopups());
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header />
            <Main 
              cards={cards}
              onAddPlace={handleAddPlaceClick} 
              onEditProfile={handleEditProfileClick} 
              onEditAvatar={handleEditAvatarClick} 
              onClose={onClose} 
              onClosePopup={handleCloseAllPopups}
              selectedCard={selectedCard}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              openDeletePopup={handleDeleteCardClick}
            />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> 
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={onClose} onClosePopup={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
            <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={onClose} onClosePopup={closeAllPopups} cardDelete={handleCardDelete} removedCard={removedCard} />
            <Footer />
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

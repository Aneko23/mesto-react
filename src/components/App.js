import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [onClose, closeAllPopups] = React.useState(true);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isPopupOpened: false});
  const [currentUser, setCurrentUser] = React.useState("");
  const [currentCard, setCurrentCard] = React.useState([]);

  React.useEffect(() => {
    api.getUserProfile()
    .then(res => {
      setCurrentUser(res)
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
  }, [currentUser]);

  React.useEffect(() => {
    api.getCards()
    .then(res => {
      setCurrentCard(res)
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
  }, [currentCard]);

  function handleCardClick(card) {
    setSelectedCard({
      isPopupOpened: true,
      name: card.name,
      link: card.link
    });

  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    closeAllPopups(false);
}

const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

function handleEditProfileClick() {
  setEditProfilePopupOpen(true);
  closeAllPopups(false);
  console.log('Открывается')
}

const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    closeAllPopups(false);
}

function handleCloseAllPopups() {
  closeAllPopups(true);
  setAddPlacePopupOpen(false);
  setEditProfilePopupOpen(false);
  setEditAvatarPopupOpen(false);
  setIsOpen(false);
  setSelectedCard(false);

}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={currentCard}>
      <div className="root">
        <div className="page">
          <Header />
          <Main 
            onAddPlace={handleAddPlaceClick} 
            onEditProfile={handleEditProfileClick} 
            onEditAvatar={handleEditAvatarClick} 
            isOpen={isOpen} 
            isEditProfilePopupOpen={isEditProfilePopupOpen} 
            isAddPlacePopupOpen={isAddPlacePopupOpen} 
            isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
            onClose={onClose} 
            onClosePopup={handleCloseAllPopups}
            selectedCard={selectedCard}
            onCardClick={handleCardClick}
          >
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          </Main>
          <Footer />
        </div>
      </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}


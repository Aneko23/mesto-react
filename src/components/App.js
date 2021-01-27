import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';  

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [onClose, closeAllPopups] = React.useState(true);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isPopupOpened: false});

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
        />
        <Footer />
      </div>
    </div>
  );
}

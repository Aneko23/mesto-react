import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' submit='Сохранить' isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} onClosePopup={props.onClosePopup}>
            <input className="popup__data popup__data_name" id="form-name" type="text" name="nameInput" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
            <span className= "popup__input-error" id='form-name-error' />
            <input className="popup__data popup__data_job" id="form-job" type="text" name="jobInput" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
            <span className= "popup__input-error" id='form-job-error' />
        </PopupWithForm>

    )
}
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useState } from 'react';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  
  const [selectedCard, setSelectedCard] = useState({    
    name: '', 
    link: ''
  })
    

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }  

  function handleCardClick({name, link}) {
    setSelectedCard({name, link})    
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({
      name: '', 
      link: ''
    })    
  }

  return (
    <div className="page__content"> 
      <Header /> 
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />
      <Footer />

      <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      >
        <div className="popup__field">
          <input
          id="username"
          className="popup__input popup__input_type_username"
          type="text"
          name="username"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""              
          />          
          <span
          id="error-username"
          className="popup__error popup__error_type_username"              
          />            
        </div>
        <div className="popup__field">
          <input
          id="info"
          className="popup__input popup__input_type_info"
          type="text"
          name="info"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required=""
          />
          <span
          id="error-info"
          className="popup__error popup__error_type_info"
          />
        </div>   
      </PopupWithForm>

      <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      button='Создать'
      >
        <div className="popup__field">
          <input
          id="title"
          className="popup__input popup__input_type_title"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          />  
          <span
          id="error-title"
          className="popup__error popup__error_type_title"
          />
        </div>
        <div className="popup__field">
          <input
          id="url"
          className="popup__input popup__input_type_url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
          />
          <span id="error-url" 
          className="popup__error popup__error_type_url" 
          />
        </div>     
      </PopupWithForm>

      <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
      >   
        <div className="popup__field">
          <input
          id="avatar"
          name="avatar"
          type="url"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required=""
          />
          <span
          id="error-avatar"
          className="popup__error popup__error_type_avatar"
          />
        </div>
      </PopupWithForm>

      <PopupWithForm
      name='delete'
      title='Вы уверены?'
      button='Да'
      />    

      <ImagePopup     
      card={selectedCard}     
      onClose = {closeAllPopups}
      />

    </div>      
  );
}

export default App;



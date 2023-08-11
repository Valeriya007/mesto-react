import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";  


function App() {
  //стейт контекста
  const [currentUser, setCurrentUser] = useState({})

  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)   
  const [selectedCard, setSelectedCard] = useState({    
    name: '', 
    link: ''
  }) 

  //стейт карточки
  const [cards, setCards] = useState([])  
  
  
  //функции открытия попапов

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
  
  
  //функция закрытия всех попапов
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({
      name: '', 
      link: ''
    })    
  }

  //рендер карточек и данных пользователя

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {        
        setCurrentUser(dataUser)        
        setCards(dataCard)
      })
      .catch((error => console.error(`Ошибка ${error}`)))
  },[])


  //обработчик данных пользователя

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      reset()
    })
    .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))    
  }


  //обработчик изменения аватара 

  function handleUpdateAvatar(dataUser, reset) {
    api.setNewAvatar(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      reset()
    })
    .catch((error => console.error(`Ошибка обновления аватара ${error}`)))
  }

  //обработчик добавления карточки

  function handleAddPlaceSubmit(dataCard, reset) {
    api.addNewCard(dataCard)
    .then(res => {
      setCards([res, ...cards])
      closeAllPopups()
      reset()
    })
    .catch((error => console.error(`Ошибка добавления карточки ${error}`)))
  }

  //обработчик удаления карточки

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => 
      cards.filter((item) =>
      item._id !== card._id))
    })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
  }  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page__content"> 
      <Header /> 
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        onCardDelete = {handleCardDelete}        
        cards = {cards}
      />
      <Footer />

      <EditProfilePopup 
      onUpdateUser = {handleUpdateUser}
      isOpen={isEditProfilePopupOpen}
      onClose = {closeAllPopups} 
      />

      <AddPlacePopup       
      onAddPlace={handleAddPlaceSubmit}
      isOpen={isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      />

      <EditAvatarPopup 
      onUpdateAvatar = {handleUpdateAvatar}
      isOpen={isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
      />

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
    </CurrentUserContext.Provider>      
  );
}

export default App;



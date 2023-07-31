import { useEffect, useState } from "react"
import api from "../utils/api.js"
import Card from "./Card.js"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        
        dataCard.forEach(element => element.myId = dataUser._id);
        setCards(dataCard)
      })
      .catch((error => console.error(`Ошибка ${error}`)))
  },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар профиля" className="profile__image" />
          </div>
          <div className="profile__content">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__info">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace} />
      </section>
      <section className="photo-grid"
        aria-label="Карточки с фотографиями">    
        {cards.map((card) => (
          <Card
          card={card}
          key={card._id}          
          onCardClick = {onCardClick}
          />
        ))}            
      </section>
    </main>
  )
}
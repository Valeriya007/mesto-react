export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick({ link: card.link, name: card.name })
  }
  
  return (    
    <article className="card">
      <button 
      className="card__delete-btn" 
      type="button" 
      />
      <img
       src={card.link} 
       alt={card.name} 
       className="card__image" 
       onClick={handleClick}      
       />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <button className="card__like-btn" type="button" />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )    
}
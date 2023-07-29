export default function Card({ name, link, likes, onCardClick }) {
  return (
    <article className="card">
      <button 
      className="card__delete-btn" 
      type="button" 
      />
      <img
       src={link} 
       alt={name} 
       className="card__image" 
       onClick={() => onCardClick({link: link, name: name})}
       />
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-group">
          <button className="card__like-btn" type="button" />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  )    
}
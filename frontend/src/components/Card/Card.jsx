import { useContext } from "react"
import CurrentUserContext from "../../context/CurrentUserContext"
import { isLiked } from "../../utils/utils"


export default function Card({ cardData, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)

  // Также добавьте в Card обработчик клика handleLikeClick и вызовите из него 
  //onCardLike с аргументом card — по аналогии с уже имеющимся обработчиком handleClick.

  function handleLikeClick() {
    onCardLike(cardData)
  }
  function handleDeleteClick() {
    onCardDelete(cardData)
  }

  return (
    <div>
      {/* <article className="element"> */}

      <img className="element__photo"
        src={cardData.link}
        alt={`Фотография ${cardData.name}`}
        onClick={() => onCardClick(cardData)}
      />
      {/* //условие для урны на мои фото */}
      {currentUser._id === cardData.owner && <button type="button" className="element__delete-button" onClick={handleDeleteClick} />}
      <div className="element__description">
        {/*  <pre>{JSON.stringify(cardData, null, 2)}</pre> */}
        <h2 className="element__caption">{cardData.name}</h2>
        <div className="element__like-container">

          <button type="button" className={`element__like-button ${isLiked(cardData, currentUser) ? 'element__like-button_active' : ''}`} onClick={handleLikeClick} />
          <span className="element__counter">{cardData.likes.length}</span>
        </div>
      </div>
      {/* </article> */}
    </div>
  )
}
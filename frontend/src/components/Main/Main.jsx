import { useContext } from "react"
import Card from "../Card/Card.jsx"
import editButtonSvg from "../../images/edit-button.svg"
import addButtonSvg from "../../images/img-plus.svg"
import CurrentUserContext from "../../context/CurrentUserContext.js"



export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext)

  // const [userName, setUserName] = useState('') // вводим usecontext и заменяем в return наши имя, статус и авватар
  // const [userDescription, setUserDescription] = useState('')
  // const [userAvatar, setUserAvatar] = useState('')

  // // стейт для удаления
  // const [deleteCardId, setDeleteCardId] = useState('')

  // api для карточек


  // По аналогии с предыдущим пунктом добавьте функцию `handleCardDelete` в `Main`,
  //  а также пропс `onCardDelete` и обработчик `handleDeleteClick` в `Card`.

  // После запроса в API, обновите стейт `cards` с помощью метода `filter`: создайте копию массива, 
  // исключив из него удалённую карточку.

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__intro-container">
          <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : '#'} className="profile__avatar" alt="аватарка профиля" />
          </button>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
              <button
                type="button"
                aria-label="edit"
                className="profile__button-edit"
                onClick={onEditProfile}
              >
                <img
                  src={editButtonSvg}
                  className="profile__img-edit"
                  alt="кнопка редактирования профиля"
                />
              </button>
            </div>
            <p className="profile__status">{currentUser.about ? currentUser.about : ''}</p>
          </div>
        </div>
        <button type="button" aria-label="add" className="profile__button-add" onClick={onAddPlace}>
          <img
            src={addButtonSvg}
            className="profile__img-add"
            alt="кнопка добавления"
          />
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <article className="element" key={card._id}>
              <Card cardData={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} />
            </article>
          )
        }

        )}
      </section>
    </main>
  )
}
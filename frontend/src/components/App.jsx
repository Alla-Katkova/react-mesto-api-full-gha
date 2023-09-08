import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

import { isLiked } from "../utils/utils.js";

import api from '../utils/api.js'
import CurrentUserContext from '../context/CurrentUserContext.js'

import * as auth from '../utils/auth.js'


function App() {
  // стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  const initialEmail = ''
  const navigate = useNavigate();

  //стейты для аутентификаци
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState(initialEmail)


  // стейты для context
  const [currentUser, setCurrentUser] = useState({})
  // стейт для карточек
  const [cards, setCards] = useState([])



  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setSelectedCard(null)
    setIsDeletePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
    setIsImagePopup(true)
  }


  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards(localStorage.jwt)
        .then(response => {
          setCards(response)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]
  )


  function handleCardLike(card) {
    if (isLiked(card, currentUser)) {
      api.putDislike(card._id)
        // Обновляем стейт
        .then(newCard => {
          setCards((cardsOld) => cardsOld.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.putLike(card._id)
        .then(newCard => {
          // Обновляем стейт
          setCards((cardsOld) => cardsOld.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => console.error(`Ошибка при добалении лайка ${error}`))
    }
  }
  function handleCardDelete(card) {
    api.deleteCardFromDB(card._id)
      .then(newCard => {
        setCards((cardsOld) => cardsOld.filter((c) => c._id !== card._id && c))

      })

      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
  }

  // api для данных юзера на главной странице
  useEffect(() => {
    if (loggedIn) {

      api
        .getUserDetailsFromDataBase()
        .then(response => {
          setCurrentUser(response)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]
  )

  //api для данных юзера в попапе
  function handleUpdateUser(dataUser) {
    //console.log(profilename, profilestatus)
    api.editUserInfoInDb(dataUser.profilename, dataUser.profilestatus)
      .then(response => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
  }

  //api для обновления аватарки в попапе
  function handleUpdateAvatar(linkToAvatar) {
    // console.log(linkToAvatar)
    api.editAvaratInDB(linkToAvatar.avatar)
      .then(response => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`))
  }

  function handleAddPlaceSubmit(dataCard) {
    //console.log(dataCard)
    api.addNewCardToServer(dataCard.namePlace, dataCard.link)
      .then(response => {
        setCards([response, ...cards])
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при добавлении карточки ${error}`))
  }

  // авторизация и регистрация локал 
  // 
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsAuthChecking(true);
      auth.getContent(jwt)
        .then((response) => {
          if (response) {
            setLoggedIn(true);
            setEmail(response.email)
            navigate('/');
          }
        })
        .catch((e) => {
          console.log('auth failed')
          console.log(e)
          navigate('/sign-in')})
        .finally(() => setIsAuthChecking(false))
    } else {
      setIsAuthChecking(false)
    }
  }, [navigate])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  // Регистрации пользователя на сервере
  const handleRegister = ({ registerInputPassword, registerInputEmail }) => {
    return auth.register({ registerInputPassword, registerInputEmail })
      .then(response => {
        if (!response || response.statusCode === 400) throw new Error(`Ошибка: ${response.message}`);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(true);
        navigate('/sign-in')
        return response;
      })
      .catch(error => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        return error;
      })
  }

  // Авторизации пользователя
  const handleLogin = ({ loginInputPassword, loginInputEmail }) => {
    return auth.authorize({ loginInputPassword, loginInputEmail })
      .then(res => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.token) {
          setIsInfoTooltipPopupOpen(true);
          setIsSuccess(true);
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
        };
      })
      .then(tokenCheck)
      .catch(err => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        return err;
      })
  }

  // Выход из системы
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setEmail(initialEmail);
    setLoggedIn(false);
    navigate('/sign-in');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          userEmail={email}
        />
        <Routes>

          <Route path='/sign-in'
            element={<Login onLogin={handleLogin} />} />
          <Route path='/sign-up'
            element={<Register onRegister={handleRegister} />} />
          <Route
            path='/'
            element={
 
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}

        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="popupConfirmationDelete"
          title="Вы уверены?"
          buttonTitle="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        //onSubmit={handleDeleteSubmitButtonInPopup}
        >
        </PopupWithForm>

        <ImagePopup
          cardData={selectedCard}
          isOpen={isImagePopup}
          // isOpen={handleCardClick}
          //selectedcard = true !setselectedcard false = null
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import React, { useEffect } from 'react';
import accepted from '../../images/accept.svg';
import blocked from '../../images/bloked.svg';
import { useLocation } from 'react-router-dom';


export default function InfoTooltip({ isOpen, onClose, isSuccess }) {

  const path = useLocation().pathname

  const tooltip = () => {
   // debugger
    
    if (path === '/sign-in' || path === '/sign-up') {
      return isSuccess
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз.";
    }

    if (path === '/') {
      return isSuccess
        ? "Вы успешно авторизовались!"
        : "Что-то пошло не так!";
    }

    return;
  }

  const imageInformation = isSuccess
    ? accepted
    : blocked


  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>˝
      <div className="popup__container">
        <button
          type="button"
          aria-label="close"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="popup__image-infotooltip"
          alt="Картинка что-то пошло не так/Картинка все прошло успешно!"
          src={imageInformation}
        >
        </img>
        <p className="popup__infotooltip-caption">{tooltip()}</p>
      </div>
    </div>
  )
}
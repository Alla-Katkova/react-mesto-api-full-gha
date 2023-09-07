import { useRef } from "react";
import useValidationForForm from "../../utils/useValidationForForm"
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef()
  //доработать сброс формы и красную линию при ошибке isInputValid reset
  const { values, errors, isValid, handleChange } = useValidationForForm()

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({avatar: input.current.value})
  }

  return (
    <PopupWithForm
      name="popupAvatarEdit"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={input}
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        required=""
        value = {values.avatar ? values.avatar : ''}
        onChange={handleChange}
      />
      <span id="avatar-error" className="popup__error-visible">{errors.avatar}</span> 
    </PopupWithForm>

  )
}
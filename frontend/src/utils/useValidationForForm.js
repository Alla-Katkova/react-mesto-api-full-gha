import { useCallback, useState } from "react"

export default function useValidationForForm() {
  const [values, setValues] = useState([])
  const [errors, setErrors] = useState([])
  // const [isInputValid, setIsInputValid] = useState([])
  const [isValid, setIsValid] = useState(false)


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    // const valid = event.target.validity.valid
    const validationMessage = event.target.validationMessage
    const form = event.target.form

    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage }
    })

    // setIsInputValid((oldInputValid) => {
    //   return { ...oldInputValid, [name]: valid }
    // })

    setIsValid(form.checkValidity())
  }
  // функция reset для очистки формы Доработать
  // function reset(data = {}) {
  //   setValues(data)
  //   setErrors({})
  //   setIsValid(false)
  //   setIsInputValid({})
  // }
  // если в useContext вставить просто функцию, то он будет рендерить бесконечно, исп useCallback

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])


  //  возвращает все значения, кроме тех(dataold) что были переланы, если не было передано, то все обнуляется
  function resetForm(dataOld = {}) {
    setValues(dataOld);
    setErrors({});
    setIsValid(false);
    // setIsValidInputs({});
  }


  // добавить reset и isInputValid когда доработаю сброс и красную линию
  return { values, errors, isValid, handleChange, setValue, resetForm }
}
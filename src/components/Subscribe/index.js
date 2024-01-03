import React, { useState } from "react"
import Input from "../Input"
import Button from "../Button"
import style from "./style.module.css"
import clsx from "clsx"
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
const Spinner = () => <span className={style.loader} />
const Subscribe = ({placeholder, submitButtonText, className, classNameInputs}) => {
  const [loading, setLoading] = useState(false)
  const [inputValue,setInputValue]=useState('')
  const [toastVisible,setToastVisible]=useState(false)
   function onSubmit() {
    setLoading(true)
    fetch('https://api.hsforms.com/submissions/v3/integration/submit/44783791/7314ddd3-9767-4c71-8071-4d43ac5ae5e8',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        submittedAt: new Date().getTime(),
        fields: [
          {
            objectTypeId: "0-1",
            name: "email",
            value: inputValue
          }
        ],
        context: {
          // hutk: "hutk",
          pageUri: window.location.href,
          pageName: document.title
        }
      })
    })
     .then(res =>res.json())
     .then((data) => {
       setLoading(false)
       setToastVisible(true)
       setInputValue('')
     }) 
  }
  function handleInputChange(event) {
    const value = event.target.value
    setInputValue(value)
}
  function handleClose  (event, reason)  {
    setToastVisible(false)
  };

  return (
      <div className={clsx(style.inputs, classNameInputs)}>
        <Input
          className={style.input}
          name="email"
          type="email"
          title="Email address should be valid"
          placeholder={placeholder}
          required
          autoComplete="off"
          onChange={handleInputChange}
          value={inputValue}
        />

        <Button
          variant={"tertiary"}
          type="submit"
          className={style.subscribeSubmit}
          onClick={onSubmit}
        >
          {loading ? <Spinner /> : submitButtonText}
        </Button>
        <Snackbar anchorOrigin={{  vertical: 'top',horizontal: 'center' }} autoHideDuration={3000} open={toastVisible}  onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
          success!
          </Alert>
        </Snackbar>
      </div>
  )
}

export default Subscribe

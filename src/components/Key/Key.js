import react, { useState } from "react"

function Key({ name, button, frequency }) {

  // const [ button, setButton ] = useState(0);
  // const [ isEditing, setIsEditing ] = useState(false);

  // const eventHandler = event => {
  //   if (!isEditing)
  //     return
  //   setButton(event.code)
  //   setIsEditing(false)
  //   event.target.value = ''
  // }

  return <div class="key">
    <div>
      <span>Name: </span><span>{name} </span>
    </div>
    <div>
      <span>Button: </span><span>{button}</span>
    </div>
    <div>
      <span>Frequency: </span><span>{frequency}</span>
    </div>
  </div>
}

export default Key

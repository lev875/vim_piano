import react, { useState } from "react"

function Key({ name, button, frequency, isPlaying }) {

  return <div className="key">
    <div>
      <span>Name: </span><span>{name} </span>
    </div>
    <div>
      <span>Button: </span><span>{button}</span>
    </div>
    <div>
      <span>Frequency: </span><span>{frequency}</span>
    </div>
    { isPlaying && <span>Playing</span> }
  </div>
}

export default Key

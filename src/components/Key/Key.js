import react, { useState } from "react"
import { play } from "../Keyboard/logic"

function Key({ name, button, frequency, isPlaying }) {

  const [node, setNode] = useState(null)

  if (!node && isPlaying) {
    setNode(play(frequency))
  } else if (node && !isPlaying) {
    node.stop()
    setNode(null)
  }

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

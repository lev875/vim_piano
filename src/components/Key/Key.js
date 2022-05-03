import react, { useState } from "react"
import { useSelector } from "react-redux"

import { selectConfig } from "../Keyboard/store"
import { play as _play } from "../Keyboard/logic"

import style from "./style.css"

function Key({ name, button, frequency, isPlaying }) {

  const [node, setNode] = useState(null)

  const config = useSelector(selectConfig)
  const play = _play(config)

  if (!node && isPlaying) {
    setNode( play(frequency) )
  } else if (node && !isPlaying) {
    node.stop()
    setNode(null)
  }

  return <div className={ style.key }>
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

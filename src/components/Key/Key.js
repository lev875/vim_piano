import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

import { selectConfig } from "../Keyboard/store"
import { configureContext } from "../Keyboard/logic"

import style from "./style.css"

function Key({ name, button, frequency, isPlaying }) {

  const config = useSelector(selectConfig)

  const [node, setNode] = useState(null)
  const [play, stop] = useMemo(
    () => configureContext(config),
    [config]
  )

  if (!node && isPlaying) {
    setNode( play(frequency) )
  } else if (node && !isPlaying) {
    stop(node)
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

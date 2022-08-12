import { useMemo } from "react"

import style from "./style.css"

import { isBlackNote, Props } from "./Key"

function DebugKey({ name, button, frequency, isPlaying, isPressed }: Props) {

  const isBlack = useMemo( () => isBlackNote(name), [name] )

  return <div className={ `${style.debugKey} ${isBlack ? style.black : style.white}` }>
    <div>
      <span>Name: </span><span>{name} </span>
    </div>
    <div>
      <span>Button: </span><span>{button}</span>
    </div>
    <div>
      <span>Frequency: </span><span>{frequency.toFixed(2)}</span>
    </div>
    { isPlaying && <span>Playing</span> }
    { isPressed && <span>Pressed</span> }
  </div>
}

export default DebugKey

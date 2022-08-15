import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectConfig } from "../../Settings/store"
import { configureContext, NodeAndGain } from "../logic"
import style from "./style.css"

import type { Key as Props } from "../store"
import DebugInfo from "./DebugInfo"
import { useDispatch } from "react-redux"
import { liftKey, pressKey } from "../store"

function Key({ name, button, frequency, isPressed, isBlack }: Props) {

  const config = useSelector(selectConfig)
  const dispatch = useDispatch()

  const [ node, setNode ] = useState<NodeAndGain | null>(null)
  const { play, stop } = useMemo(
    () => configureContext(config),
    [config]
  )

  useEffect(
    () => {
      if (!node && isPressed) {
        setNode(play(frequency))
      } else if (node && !isPressed) {
        stop(node)
        setNode(null)
      }
    },
    [isPressed, node]
  )

  return <div
    className={
      [
        style.key,
        isBlack ? style.black : style.white,
        isPressed ? style.pressed : ""
      ].join(" ")
    }
    style={{
      justifyContent: config.isDebug ? "space-between" : "flex-end"
    }}
    onMouseDown={ () => dispatch(pressKey(button)) }
    onMouseEnter={ e => { if (e.buttons === 1) dispatch(pressKey(button)) }}
    onMouseUp={ () => dispatch(liftKey(button)) }
    onMouseLeave={ () => dispatch(liftKey(button)) }
  >
      <DebugInfo
        name={ name }
        button={ button }
        frequency={ frequency }
        isPressed={ isPressed }
        isBlack={ isBlack }
      />
      <span>{ button.slice(3) }</span>
      {/* { isBlack TODO: More realistic keys
        ? <div className={ style.pseudoKey }>
          <div></div>
          <div></div>
        </div>
        : null } */}
  </div>
}


export default Key

import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectConfig } from "../../Settings/store"
import { AudioPipeline, NodeAndGain, play, stop } from "../logic"
import style from "./style.css"

import type { Key as _Props } from "../store"
import DebugInfo from "./DebugInfo"
import { useDispatch } from "react-redux"
import { liftKey, pressKey } from "../store"

interface Props extends _Props {
  pipeline: AudioPipeline | null
}

function Key({ name, button, frequency, isPressed, isBlack, pipeline }: Props) {

  const config = useSelector(selectConfig)
  const dispatch = useDispatch()

  const [ node, setNode ] = useState<NodeAndGain | null>(null)

  useEffect(
    () => {
      if(!pipeline) return
      if (!node && isPressed) {
        setNode(play(pipeline)(frequency))
      } else if (node && !isPressed) {
        stop(pipeline)(node)
        setNode(null)
      }
    },
    [isPressed, pipeline, node]
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

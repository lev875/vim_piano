export interface Props {
  name: string
  button: string
  frequency: number
  isPlaying: boolean
  isPressed: boolean
}

import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { selectConfig } from "../../Settings/store"
import { configureContext, NodeAndGain, resume } from "../logic"
import DebugKey from "./DebugKey"
import style from "./style.css"

export const isBlackNote = (name: string) => name[name.length - 1] === '#'

function Key({ name, button, isPlaying, frequency, isPressed }: Props) {

  const config = useSelector(selectConfig)

  const [node, setNode] = useState<NodeAndGain | null>(null)
  const { play, stop } = useMemo(
    () => configureContext(config),
    [config]
  )

  const isBlack = useMemo( () => isBlackNote(name), [ name ] )

  useEffect(
    () => {
      if (!node && isPressed) {
        setNode(play(frequency))
      }
      else if (node && !isPressed) {
        stop(node)
        setNode(null)
      }
    }
  )

  // TODO: Fix this mess
  // useEffect(
  //   () => {
  //     if (!node && isPressed && isPlaying) {
  //       setNode( play(frequency) )
  //     }
  //     if (node && isPlaying) {
  //       resume(node)
  //     }
  //     if (node && !isPlaying && !isPressed)
  //       setNode(null)
  //     if (node && !isPressed)
  //       stop(node)
  //   },
  //   [node,isPlaying,isPressed]
  // )

  return config.isDebug
    ? <DebugKey
        name={ name }
        button={ button }
        frequency={ frequency }
        isPlaying={ isPlaying }
        isPressed={ isPressed }
      />
    : <div className={
      [
        style.key,
        isBlack ? style.black : style.white,
        isPressed ? style.pressed : ""
      ].join(" ")
    }>
      <span>{button.slice(3)}</span>
    </div>
}


export default Key

import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import { selectConfig } from "../Keyboard/store"
import { configureContext, NodeAndGain } from "../Keyboard/logic"

import style from "./style.css"

interface Props {
  name: string
  button: string
  frequency: number,
  isPlaying: boolean
}

function Key({ name, button, frequency, isPlaying }: Props) {

  const config = useSelector(selectConfig)

  const [node, setNode] = useState<NodeAndGain | null>(null)
  const { play, stop } = useMemo(
    () => configureContext(config),
    [config]
  )

  useEffect(
    () => {
      if (!node && isPlaying) {
        setNode( play(frequency) )
      } else if (node && !isPlaying) {
        stop(node)
        setNode(null)
      }
    },
    [node,isPlaying]
  )

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

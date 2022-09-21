import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import style from "./style.css"

import Key from "./Key/Key"

import { selectKeys, pressKey, liftKey, shiftOctave, selectOctave } from "./store"
import { selectConfig } from "../Settings/store"
import { AudioPipeline, initializePipeline } from "./logic"

function Keyboard() {

  const octave    = useSelector(selectOctave)
  const keys      = useSelector(selectKeys)
  const dispatch  = useDispatch()
  const config    = useSelector(selectConfig)

  const [ pipeline, setPipeline ] = useState<AudioPipeline | null>(null)

  useEffect(
    () => {
      pipeline
        ? pipeline?.audioContext
            .close()
            .then(() => initializePipeline(config).then(setPipeline))
            .catch(console.warn)
        : initializePipeline(config).then(setPipeline)
      setPipeline(null)
    },
    [config]
  )

  useEffect(
    () => {
      // TODO: Refactor
      if (!pipeline)
        return
      const keyPressEvent = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          e.preventDefault()
          dispatch(shiftOctave(-1))
        }
        if (e.code === 'Enter') {
          e.preventDefault()
          dispatch(shiftOctave(1) )
        }
      }
      const keyDownEvent = ({ code }: KeyboardEvent) => dispatch(pressKey(code))
      const keyUpEvent = ({ code }: KeyboardEvent) => dispatch(liftKey(code))
      window.addEventListener('keypress', keyPressEvent)
      window.addEventListener('keydown', keyDownEvent)
      window.addEventListener('keyup', keyUpEvent)
      return () => {
        window.removeEventListener('keypress', keyPressEvent)
        window.removeEventListener('keydown', keyDownEvent)
        window.removeEventListener('keyup', keyUpEvent)
      }
    },
    [pipeline]
  )

  return <div>
    <div className={ style.octaveDisplay }>
      <div className="flex-row">
        <button onClick={ () => dispatch(shiftOctave(-1)) }>-</button>
        <span>Space</span>
      </div>
      <span> { octave } </span>
      <div className="flex-row">
        <span>Enter</span>
        <button onClick={ () => dispatch(shiftOctave(1)) } >+</button>
      </div>
    </div>
    <div className={ style.keyboard }>
      {
        keys.map(
          (key, i) => <Key key={ i } { ...key } pipeline={ pipeline }/>
        )
      }
    </div>
  </div>

}

export default Keyboard

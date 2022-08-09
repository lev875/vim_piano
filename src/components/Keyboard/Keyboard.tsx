import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./style.css"

import Key from "../Key/Key";
import { play, stop, selectKeys } from "./store"

function Keyboard() {

  const keys = useSelector(selectKeys)
  const dispatch = useDispatch();

  useEffect(
    () => {
      const keyDownEvent = ({ code }: KeyboardEvent) => dispatch(play(code))
      const keyUpEvent = ({ code }: KeyboardEvent) => dispatch(stop(code))
      window.addEventListener('keydown', keyDownEvent)
      window.addEventListener('keyup', keyUpEvent)
      return () => {
        window.removeEventListener('keydown', keyDownEvent)
        window.removeEventListener('keyup', keyUpEvent)
      }
    },
    []
  )

  return <div className={ style.keyboard }>
    {
      keys.map(
        ({ name, button, frequency, isPlaying }, i ) =>
          <Key
            key={i}
            name={name}
            button={button}
            frequency={frequency}
            isPlaying={isPlaying}
          />
      )
    }
  </div>

}

export default Keyboard;

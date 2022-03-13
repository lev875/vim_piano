import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchTimeout as _dispatchTimeout } from "../../util";

import Key from "../Key/Key";
import { play, stop, selectKeys } from "./store"

const sustain = 300 // ms

function Keyboard() {

  const keys = useSelector(selectKeys)
  const dispatch = useDispatch();
  const dispatchTimeout = _dispatchTimeout(dispatch)

  useEffect(
    () => {
      const eventListener = event => {
        dispatchTimeout(sustain, stop(event.code))
        dispatch(play(event.code))
      }
      window.addEventListener('keydown', eventListener)
      return () => window.removeEventListener('keydown', eventListener)
    },
    []
  )

  return <div id="keyboard">
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

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setVolume } from "../Keyboard/logic"
import { changeVolume, selectConfig } from "./store"

function VolumeControl() {

  const dispatch = useDispatch()
  const { volume } = useSelector(selectConfig)

  useEffect(
    () => setVolume(volume),
    [volume]
  )

  return <div>
    <span>Volume: </span>
    <input
      type="range"
      value={ volume }
      min={ 0 }
      max={ 100 }
      onChange={({ target }) => dispatch(changeVolume(parseInt(target.value)))}
    />
    <span> { volume }%</span>
  </div>
}

export default VolumeControl

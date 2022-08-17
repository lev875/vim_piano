import { useSelector, useDispatch } from "react-redux"
import { changeVolume, selectConfig } from "./store"

function VolumeControl() {

  const dispatch = useDispatch()
  const { volume } = useSelector(selectConfig)

  return <div>
    <span>Volume: </span>
    <input
      type="range"
      defaultValue={ volume.toString() }
      min={ 0 }
      max={ 100 }
      onChange={
        ({ currentTarget: { value } }) =>
          dispatch(changeVolume(parseInt(value)))
      }
    />
    <span> { volume }%</span>
  </div>
}

export default VolumeControl

import { useSelector, useDispatch } from "react-redux"
import { selectConfig, setDebugState } from "./store"

function DebugControl() {

  const dispatch = useDispatch()
  const { isDebug } = useSelector(selectConfig)

  return <div>
    <span>Debug: </span>
    <input
      type="checkbox"
      defaultChecked={ isDebug }
      onChange={ ({ target: { checked } }) =>
        { dispatch(setDebugState(checked)) }
      }
    />
  </div>
}

export default DebugControl

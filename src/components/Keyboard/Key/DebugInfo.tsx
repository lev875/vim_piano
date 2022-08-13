import { useSelector } from "react-redux"
import { selectConfig } from "../../Settings/store"
import type { Props } from "./Props"

function DebugInfo({ name, button, frequency, isPlaying, isPressed }: Props) {

  const { isDebug } = useSelector(selectConfig)

  return isDebug
    ? <div style={{
        fontSize: "initial"
    }}>
      <div>
        <span>Name: {name} </span>
      </div>
      <div>
        <span>Button: {button}</span>
      </div>
      <div>
        <span>Frequency: {frequency.toFixed(2)}</span>
      </div>
      <div className="flex-column">
        { isPlaying && <span>Playing</span> }
        { isPressed && <span>Pressed</span> }
      </div>
    </div>
    : null
}

export default DebugInfo

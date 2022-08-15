import { useSelector } from "react-redux"
import { selectConfig } from "../../Settings/store"
import type { Key as Props } from "../store"

function DebugInfo({ name, button, frequency, isPressed }: Props) {

  const { isDebug } = useSelector(selectConfig)

  return isDebug
    ? <div style={{
        fontSize: "initial",
        textAlign: "start"
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
        { isPressed && <span>Pressed</span> }
      </div>
    </div>
    : null
}

export default DebugInfo

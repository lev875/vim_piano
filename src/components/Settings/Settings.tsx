import { useState } from "react"

import style from "./style.css"
import VolumeControl from "./VolumeControl"
import SustainControl from "./SustainControl"
import SustainSteepnessControl from "./SustainSteepnessControl"
import DebugControl from "./DebugControl"
import ReverbControl from "./ReverbControl"
import WaveFormControl from "./CustomWaveControl/WaveFormControl"

function Settings() {

  const [ isOpen, setOpen ] = useState(false)

  return <div className={ style.container }>

    <button onClick={() => setOpen(!isOpen)}>Settings</button>

    <div className={ `${style.innerContainer} ${isOpen ? style.open : style.hidden}` }>
      <VolumeControl/>
      <SustainControl/>
      <SustainSteepnessControl/>
      <WaveFormControl/>
      <ReverbControl/>
      <DebugControl/>
    </div>
  </div>

}

export default Settings

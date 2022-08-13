import { useState } from "react"

import style from "./style.css"
import VolumeControl from "./VolumeControl"
import SustainControl from "./SustainControl"
import SusteainStepnessControl from "./SustainStepnessControl"
import DebugControl from "./DebugControl"
import WaveFormControl from "./CustomWaveControl/WaveFormControl"

function Settings() {

  const [ isOpen, setOpen ] = useState(false)

  return <div className={ style.container }>

    <button onClick={() => setOpen(!isOpen)}>Settings</button>

    <div className={ `${style.innerContainer} ${isOpen ? style.open : style.hidden}` }>
      <VolumeControl/>
      <SustainControl/>
      <SusteainStepnessControl/>
      <WaveFormControl/>
      <DebugControl/>
    </div>
  </div>

}

export default Settings

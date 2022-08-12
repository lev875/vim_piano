import { Props } from "react"


function WaveTypeOption({ type }: { type: OscillatorType }) {

  return <option value={ type }>{ `${type[0].toUpperCase()}${type.slice(1)}` }</option>

}


export default WaveTypeOption

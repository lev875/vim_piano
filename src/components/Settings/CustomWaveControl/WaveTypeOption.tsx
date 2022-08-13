const WaveTypeOption = ({ type }: { type: OscillatorType }) =>
  <option value={ type }>{ `${type[0].toUpperCase()}${type.slice(1)}` }</option>

export default WaveTypeOption

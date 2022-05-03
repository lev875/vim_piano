const AudioContext = window.AudioContext || window.webkitAudioContext;

export const context = new AudioContext()

const createConfig = ({ type, waveForm: { imag, real } }) =>
  type === "custom"
    ? ({
      periodicWave: new PeriodicWave(
        context,
        {
          imag: new Float32Array(imag),
          real: new Float32Array(real)
        }
      )
    })
    : { type }

export const play = config => freq => {
  const node = new OscillatorNode(
    context,
    {
      frequency: freq,
      ...createConfig(config)
    }
  )
  console.log(node)
  node.connect(context.destination)
  node.start()
  return node
}

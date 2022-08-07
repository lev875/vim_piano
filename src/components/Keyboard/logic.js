const AudioContext = window.AudioContext || window.webkitAudioContext;

export const context = new AudioContext()

const gainNode = new GainNode(context, { gain: 0.5 })
gainNode.connect(context.destination)

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

const play = config => freq => {
  const node = new OscillatorNode(
    context,
    {
      frequency: freq,
      ...createConfig(config)
    }
  )
  gainNode.gain.setValueAtTime(config.volume / 100, 0)
  node.connect(gainNode)
  node.start()
  return node
}

const stop = config => node =>
  node.stop(context.currentTime + config.sustain / 1000)

export const configureContext = config => [ play(config), stop(config) ]

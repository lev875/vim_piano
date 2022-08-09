import type { Config } from "../Keyboard/store"

const AudioContext = window.AudioContext // || window.webkitAudioContext;

export const context = new AudioContext()

const globalGain = new GainNode(context, { gain: 0.5 })
globalGain.connect(context.destination)

interface CreateConfigArgs {
  type: OscillatorType
  waveForm: {
    imag: number[]
    real: number[]
  }
}

const createConfig = ({ type, waveForm: { imag, real } }: CreateConfigArgs) =>
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

export const setVolume = (n: number) =>
  n >= 0 && n <= 100
    ? void globalGain.gain.setValueAtTime(n / 100, 0)
    : console.error(`Invalid volume value: ${n}!`)

export interface NodeAndGain {
  node: OscillatorNode,
  gain: GainNode
}
const play = (config: Config) => (freq: number) => {
  const gainNode = new GainNode(context, { gain: 1 })
  gainNode.connect(globalGain)
  const node = new OscillatorNode(
    context,
    {
      frequency: freq,
      ...createConfig(config)
    }
  )
  node.connect(gainNode)
  node.start(0)
  return { node, gain: gainNode } as NodeAndGain
}

const stop = (config: Config) => ({ node, gain: gainNode }: NodeAndGain) => {
  const end = context.currentTime + config.sustain / 1000
  gainNode.gain.exponentialRampToValueAtTime(0.001, end)
  node.stop(end)
}

export const configureContext = (config: Config) => ({ play: play(config), stop: stop(config) })

import { generateArray } from "../../util"
import type { Config } from "../Settings/store"

const AudioContext = window.AudioContext

const context = new AudioContext()

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

export const resume = ({ gain: gainNode }: NodeAndGain ) =>
  gainNode.gain.cancelScheduledValues(context.currentTime)

const stop = (config: Config) => ({ node, gain: gainNode }: NodeAndGain) => {
  const sustainDuration = config.sustain / 1000
  const currentTime = context.currentTime
  if (config.sustainStepness > 1) {
    const array = Float32Array.from(
      generateArray(15)
        .map(i => i - 15)
        .map(i => Math.pow(config.sustainStepness,i))
        .reverse()
    )
    gainNode.gain.setValueCurveAtTime(array, currentTime, sustainDuration)
  }
  node.stop(currentTime + sustainDuration)
}

export const configureContext = (config: Config) =>
  ({ play: play(config), stop: stop(config) })

import { generateArray } from "../../util"
import type { Config } from "../Settings/store"

interface ReverbPreset {
  name: string,
  url: string
}

export interface NodeAndGain {
  node: OscillatorNode,
  gain: GainNode
}

export interface AudioPipeline {
  audioContext: AudioContext
  volumeNode: GainNode
  reverb?: ConvolverNode
  waveFormConfig: OscillatorOptions
  sustain: number
  sustainStepness: number
}

const AudioContext = window.AudioContext

export const REVERB_PRESETS: Map<string, ReverbPreset> = new Map([
  [
    "large_church",
    {
      name: "Large Church",
      url: "reverbs/large_church.wav"
    }
  ],
  [
    "larget_hall",
    {
      name: "Large Hall",
      url: "reverbs/large_hall.wav"
    }
  ],
  [
    "medium_chamber.wav",
    {
      name: "Medium Chamber",
      url: "reverbs/medium_chamber.wav"
    }
  ],
  [
    "medium_hall",
    {
      name: "Medium Hall",
      url: "reverbs/medium_hall.wav"
    }
  ],
  [
    "open_air",
    {
      name: "Open Air",
      url: "reverbs/open_air.wav"
    }
  ]
])

export const play = (pipeline: AudioPipeline) => (freq: number) => {
  const gainNode = new GainNode(pipeline.audioContext, { gain: 1 })
  const node = new OscillatorNode(
    pipeline.audioContext,
    {
      ...pipeline.waveFormConfig,
      frequency: freq
    }
  )
  const output = pipeline.reverb ?? pipeline.volumeNode
  node.connect(gainNode)
  gainNode.connect(output)
  node.start(0)
  return { node, gain: gainNode } as NodeAndGain
}

export const stop = (pipeline: AudioPipeline) =>
  ({ node, gain: gainNode }: NodeAndGain) => {
    const sustainDuration = pipeline.sustain / 1000
    const currentTime = pipeline.audioContext.currentTime
    if (pipeline.sustainStepness > 1) {
      const array = Float32Array.from(
        generateArray(15)
          .map(i => i - 15)
          .map(i => Math.pow(pipeline.sustainStepness,i))
          .reverse()
      )
      gainNode.gain.setValueCurveAtTime(array, currentTime, sustainDuration)
    }
    node.stop(currentTime + sustainDuration)
  }

const createGainNode = (context: AudioContext, gain: number, destination: AudioNode) => {
  if (gain < 0 || gain > 1) throw new Error("Invalid volume parameter!")
  const node = new GainNode(context, { gain })
  node.connect(destination)
  return node
}

const createReverb = (context: AudioContext, buffer: AudioBuffer, destination: AudioNode) => {
  const node = new ConvolverNode(context, { buffer, disableNormalization: false })
  node.connect(destination)
  return node
}

const createConfig: (config: Config, context: AudioContext) => OscillatorOptions =
  ({ type, waveForm: { imag, real } }, context) =>
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

// export const setVolume = (pipeline: AudioPipeline) => (n: number) =>
//   n >= 0 && n <= 100
//     ? pipeline.volumeNode.gain.setValueAtTime(n / 100, 0)
//     : console.error(`Invalid volume value: ${n}!`)

const defaultPipeline = (config: Config, context: AudioContext) =>
  ({
    audioContext: context,
    volumeNode: createGainNode(context, config.volume / 100, context.destination),
    waveFormConfig: createConfig(config, context),
    sustain: config.sustain,
    sustainStepness: config.sustainStepness
  })

export const initializePipeline: (config: Config) => Promise<AudioPipeline> = config => {
  const context = new AudioContext()
  return config.reverbEnabled
    ? fetch(REVERB_PRESETS.get(config.reverbPreset)?.url!!)
        .then(r =>
          r.ok
            ? r.arrayBuffer()
            : Promise.reject(
              {
                status: r.status,
                erorr: r.statusText
              }
            )
        )
        .then(buffer => context.decodeAudioData(buffer))
        .then( buffer => {
          const volumeNode = createGainNode(
            context,
            config.volume / 100,
            context.destination
          )
          return ({
            audioContext: context,
            volumeNode,
            reverb: createReverb(context, buffer, volumeNode),
            waveFormConfig: createConfig(config, context),
            sustain: config.sustain,
            sustainStepness: config.sustainStepness
          })
        })
        .catch(
          e => {
            console.error(e)
            return defaultPipeline(config, context)
          }
        )
  : Promise.resolve(defaultPipeline(config, context))
}


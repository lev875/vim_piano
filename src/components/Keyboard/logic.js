const AudioContext = window.AudioContext || window.webkitAudioContext;

export const context = new AudioContext()

const waveForm = {
  imag: new Float32Array([0,1,1,1,1,1,1]),
  real: new Float32Array(7)
}

export const play = freq => {
  const node = new OscillatorNode(
    context,
    {
      type: "sine",
      frequency: freq,
      periodicWave: new PeriodicWave(context, waveForm)
    }
  )
  node.connect(context.destination)
  node.start()
  return node
}

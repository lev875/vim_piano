const AudioContext = window.AudioContext || window.webkitAudioContext;

export const context = new AudioContext()

export const play = freq => {
  const node = new OscillatorNode(
    context,
    {
      type: "sine",
      frequency: freq
    }
  )
  node.connect(context.destination)
  node.start()
  return node
}

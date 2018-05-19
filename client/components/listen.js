module.exports = ()=>{

const toggleEffectsButton = document.getElementById("toggle-button");

/* Globals */
let audioContext;
let micSensitivityValue = 1500;
let on = false;

/* Event handlers */
toggleEffectsButton.addEventListener("click", toggleEffects);

/* Helper functions */
function toggleEffects(e) {
if (!on) {
  on = true;
  audioContext = new AudioContext();
  navigator.getUserMedia({audio: true}, handleUserMediaStream, handleUserMediaError);
}
else {
  reset();
}
}

function reset() {
on = false;
audioContext.close();
}

function handleUserMediaStream(stream) {
const mediaStreamSource = audioContext.createMediaStreamSource(stream);
const processor = createProcessor();

mediaStreamSource.connect(processor);
}

function handleUserMediaError(err) {
console.log(err);
}

function createProcessor() {
const processor = audioContext.createScriptProcessor();
processor.volume = 0;

processor.onaudioprocess = handleAudioProcess;
processor.connect(audioContext.destination);

return processor;
}

function handleAudioProcess(e) {
const buffer = e.inputBuffer.getChannelData(0);

let sum = 0;
let x;

for (let i = 0; i < buffer.length; i++) {
  x = Math.abs(buffer[i]);
  sum += x * x;
}

let average = sum / buffer.length;
this.volume = Math.floor(average * micSensitivityValue);

detectAudio(this.volume);
}

function detectAudio(micValue){
if(micValue>100){
  console.log('I hear ya.');
  return true;
}
}
};

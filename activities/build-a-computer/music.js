/* Original, quiet 32-bar chiptune. No audio downloads or copyrighted melody. */
let audio, musicOn=false, musicTimer, beat=0;
const melody=[72,76,79,76,74,71,67,71,69,72,76,72,67,71,74,71,72,76,81,79,76,74,72,69,67,71,74,76,74,71,67,0];
function note(midi,time,length,volume,type='square'){
 if(!audio||!midi)return;
 const oscillator=audio.createOscillator(),gain=audio.createGain();
 oscillator.type=type;oscillator.frequency.value=440*2**((midi-69)/12);
 gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.01);gain.gain.setValueAtTime(volume,time+length*.6);gain.gain.linearRampToValueAtTime(0,time+length);
 oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(time);oscillator.stop(time+length+.01);
}
function musicTick(){if(!musicOn || document.hidden)return;const time=audio.currentTime+.025;note(melody[beat%32],time,.22,.017);if(beat%2===0)note([48,43,45,43][Math.floor(beat/8)%4],time,.38,.025,'triangle');beat++;}
async function toggleMusic(){try{audio ||= new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')await audio.resume();musicOn=!musicOn;clearInterval(musicTimer);if(musicOn){musicTick();musicTimer=setInterval(musicTick,300);}document.querySelector('#music').textContent=musicOn?'Music: on':'Music: off';document.querySelector('#music').setAttribute('aria-pressed',String(musicOn));}catch{document.querySelector('#music').textContent='Audio unavailable';}}
function chime(){if(audio && musicOn){const t=audio.currentTime;[72,76,79].forEach((n,i)=>note(n,t+i*.065,.12,.025));}}
document.addEventListener('visibilitychange',()=>{if(!audio)return;if(document.hidden)audio.suspend();else if(musicOn)audio.resume().catch(()=>{});});

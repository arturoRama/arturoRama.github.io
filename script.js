// beep('700', '1000', '0.8', 'sine');
//beep('500', '2000', '0.8', 'sine');
//if you have another AudioContext class use that one, as some browsers have a limit
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    //if (callback){oscillator.onended = callback;}
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + ((duration || 500) / 1000));
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

var globalTimer = 0;
var timer, secondsLeft;
var started = false;
var repetion = 0;
var nextSound = 0;
var inhaleExhale = [0,0];
let hipopresive = 0;

function getGlobalTimer(){
  const minToSecond = 60;
	timer = document.getElementById("timer").value;
  if (timer == null || timer.length == 0)
    timer = 0;
  return parseInt(timer) * minToSecond;
}

function starttimer(){
  if (!started){
    secondsLeft = getGlobalTimer();
    getInformation();
    started = true;
    repetion = 0;
    nextSound = secondsLeft - Number(inhaleExhale[repetion++ % 2]);
    beep();
  }
  countdown();
}

function getInformation(){
  inhaleExhale[0] = document.getElementById("inhale").value;
  inhaleExhale[1] = document.getElementById("exhale").value;
  hipopresive = document.getElementById("hipopresive").value;

}

function cddisplay() {
  const minute = 60;

  document.getElementById("minutes").innerText = Math.floor(secondsLeft / minute),
    document.getElementById("seconds").innerText = Math.floor(secondsLeft % minute);
}

function countdown() {
    cddisplay();

    if (secondsLeft == nextSound)
    {
      if (repetion == 6){
        nextSound = secondsLeft - Number(hipopresive);
        repetion = 0;
        console.log("Hipopressive timer");
      }
      else{
        nextSound = secondsLeft - Number(inhaleExhale[repetion++ % 2]);
        console.log("Setting next timer ", repetion);
      }
      console.log("Next beep in ", nextSound)
      console.log("Beep-----------------");
      beep();
    }


    if (secondsLeft === 0) {
        cdpause()
    } else {
      secondsLeft--;
      timer = setTimeout(countdown, 1000);
    }
}

function cdpause() {
    clearTimeout(timer);
}

function cdreset() {
    cdpause();
    secondsLeft = getGlobalTimer();
    cddisplay();
    started = false;
}
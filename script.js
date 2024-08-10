// (function () {
//     const milliseconds = 1,
//           second = milliseconds * 1000,
//           minute = second * 60,
//           hour = minute * 60,
//           day = hour * 24;
  
//     //I'm adding this section so I don't have to keep updating this pen every year :-)
//     //remove this if you don't need it
//     let today = new Date(),
//         dd = String(today.getDate()).padStart(2, "0"),
//         mm = String(today.getMonth() + 1).padStart(2, "0"),
//         yyyy = today.getFullYear(),
//         nextYear = yyyy + 1,
//         dayMonth = "09/27/",
//         birthday = dayMonth + yyyy;
    
//     today = mm + "/" + dd + "/" + yyyy;
//     if (today > birthday) {
//       birthday = dayMonth + nextYear;
//     }
//     //end
    
//     const countDown = new Date(birthday).getTime(),
//         x = setInterval(function() {    
  
//           const now = new Date().getTime(),
//                 distance = countDown - now;
  
//           // document.getElementById("days").innerText = Math.floor(distance / (day)),
//           //   document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
//           //   document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
//           //   document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
//           //do something later when date is reached
//           if (distance < 0) {
//             document.getElementById("headline").innerText = "It's my birthday!";
//             document.getElementById("countdown").style.display = "none";
//             document.getElementById("content").style.display = "block";
//             clearInterval(x);
//           }
//           //seconds
//         }, 0)
//   }
//   ()
// );

function startTimer(){
  const milliseconds = 1,
          second = milliseconds * 1000,
          minute = second * 60,
          hour = minute * 60,

	inhale1 = document.getElementById("inhale1").value;
	exhale1 = document.getElementById("exhale1").value;
	inhale2 = document.getElementById("inhale2").value;
	exhale2 = document.getElementById("exhale2").value;
	inhale3 = document.getElementById("inhale3").value;
	exhale3 = document.getElementById("exhale3").value;
	hipopresive = document.getElementById("hipopresive").value;
	totalTimer = document.getElementById("timer").value;

  const intervals = [
    inhale1,
    exhale1,
    inhale2,
    exhale2,
    inhale3,
    exhale3,
    hipopresive
  ];
  
  let i = 0;
  let now = new Date();
  let firstBeep = new Date();
  let nextBeep = firstBeep.setSeconds(firstBeep.getSeconds() + Number(intervals[i++]));
  const timer = addMinutes(now, Number(totalTimer));
  const x = setInterval(function() {    

          now = new Date();
          firstBeep = new Date();
          let distance = timer - now;
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

          let distance2 = nextBeep - firstBeep
          //do something later when date is reached
          if (distance2 <= 0) {
            nextBeep = firstBeep.setSeconds(firstBeep.getSeconds() + Number(intervals[i++]));
            i = i % intervals.length;
            beep('500', '450', '0.8', 'sine');
          }

          if (distance < 0) {
            document.getElementById("headline").innerText = "It's my birthday!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
            beep('3000', '900', '1', 'sine');
          }
          //seconds
        }, 0)

	console.log(inhale1, exhale1, inhale2, exhale2, inhale3, exhale3, hipopresive, totalTimer)
}

function stopWatch() { 
	if (timer) { 
	  setTimeout(stopWatch, 1000);
    console.log("Something")
	} 
}

let startBtn = document.getElementById('start'); 
let stopBtn = document.getElementById('stop'); 
let resetBtn = document.getElementById('reset');

let inhale1 = 0;
let exhale1 = 0;
let inhale2 = 0;
let exhale2 = 0;
let inhale3 = 0;
let exhale3 = 0;
let hipopresive = 0;
let totalTimer = 0;
  
stopBtn.addEventListener("click", function () { 
    timer = false; 
});  

resetBtn.addEventListener('click', function () { 
  timer = false; 
  inhale1 = 0;
  exhale1 = 0;
  inhale2 = 0;
  exhale2 = 0;
  inhale3 = 0;
  exhale3 = 0;
  hipopresive = 0;
  totalTimer = 0;
  beep();
}); 

startBtn.addEventListener('click', function () { 
    timer = true;
    beep();
    stopWatch(); 
});


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
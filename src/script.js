// Tombol start dan stop
const startButton = document.getElementById('start');
const stopButton = document.getElementById('end');

//
const timerWrapper = document.getElementById('timer-wrapper');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Button Timer
const firstButton = document.getElementById('tombol-1');
const secButton = document.getElementById('tombol-2');

// audio
const beepSound = new Audio("src/audio/beep.mp3");

let timerLoop = null;
let min = 0;
let sec = 0;

startButton.addEventListener('click', () => {
    if(min === 0 && sec === 0){
        startButton.disabled = false
    }
    else{
        startButton.disabled = true;
    }
    const startTime = Date.now();
    timerLoop = setInterval(countdownTimer);
    function countdownTimer(){
        const minutes = min * 60000;
        const seconds = sec * 1000;
        const setTime = minutes + seconds;
        const currentTime = Date.now();
        const futureTime = startTime + setTime;
        const remainingTime = futureTime - currentTime;
    
        const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        timerWrapper.innerHTML = `
            <div id="minutes" class="text-[30vw] font-semibold flex-grow" style='flex-grow: 1;'>${mins}</div>
            <div class="text-[30vw] font-semibold flex-grow" style='flex-grow: 1;'>:</div>
            <div id="seconds" class="text-[30vw] font-semibold flex-grow" style='flex-grow: 1;'>${secs}</div>
        `;
        
        if(remainingTime < 0){
            clearInterval(timerLoop);
            timerLoop = null;
            timerWrapper.innerHTML = `
                <div id="minutes" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">00</div>
                <div class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">:</div>
                <div id="seconds" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">00</div>
            `;
        }
        if(remainingTime >= 0 && remainingTime <= 6100){
            beepSound.play();
        }
        if(remainingTime >= 1000 && remainingTime <= 2000){
            startButton.disabled = false;
        }
    }
    
});

stopButton.addEventListener('click', () => {
    firstButton.classList.remove('border-black');
    secButton.classList.remove('border-black');
    min = 0;
    sec = 0;
    if(min === 0 && sec === 0){
        startButton.disabled = false
    }
    clearInterval(timerLoop);
    timerWrapper.innerHTML = `
        <div id="minutes" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">00</div>
        <div class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">:</div>
        <div id="seconds" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">00</div>
    `;
    beepSound.pause();
});

firstButton.addEventListener('click', () => {
    firstButton.classList.add('border-black');
    secButton.classList.remove('border-black');
    min = 1;
    sec = 30;
    timerWrapper.innerHTML = `
        <div id="minutes" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">01</div>
        <div class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">:</div>
        <div id="seconds" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">30</div>
    `;
});

secButton.addEventListener('click', () => {
    firstButton.classList.remove('border-black');
    secButton.classList.add('border-black');
    min = 2;
    sec = 30;
    timerWrapper.innerHTML = `
        <div id="minutes" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">02</div>
        <div class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">:</div>
        <div id="seconds" class="text-[30vw] font-semibold flex-grow" style="flex-grow: 1;">30</div>
    `;
});

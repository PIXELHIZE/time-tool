let stopwatchStartTime = 0;
let stopwatchUpdatedTime = 0;
let stopwatchDifference = 0;
let stopwatchInterval;
let isStopwatchRunning = false;

let timerStartTime = 0;
let timerInterval;
let isTimerRunning = false;
let timerDuration = 0;

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startPauseStopwatchBtn = document.getElementById('startPauseStopwatchBtn');
const resetStopwatchBtn = document.getElementById('resetStopwatchBtn');

const timerDisplay = document.getElementById('timerDisplay');
const timerHourInput = document.getElementById('timerHourInput');
const timerMinuteInput = document.getElementById('timerMinuteInput');
const timerSecondInput = document.getElementById('timerSecondInput');
const timerInputContainer = document.getElementById('timerInputContainer');
const startPauseTimerBtn = document.getElementById('startPauseTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

const clockDisplay = document.getElementById('clockDisplay');

const stopwatchTab = document.getElementById('stopwatch');
const timerTab = document.getElementById('timer');
const clockTab = document.getElementById('clock');

const header = document.getElementById('header');
const toggleHeaderBtn = document.getElementById('toggleHeaderBtn');

// Tab Navigation
document.getElementById('stopwatchBtn').addEventListener('click', () => {
    showTab('stopwatch');
});
document.getElementById('timerBtn').addEventListener('click', () => {
    showTab('timer');
});
document.getElementById('clockBtn').addEventListener('click', () => {
    showTab('clock');
});

toggleHeaderBtn.addEventListener('click', () => {
    if (header.style.display === 'none') {
        header.style.display = 'flex';
        toggleHeaderBtn.textContent = 'Hide Header';
    } else {
        header.style.display = 'none';
        toggleHeaderBtn.textContent = 'Show Header';
    }
});

function showTab(tabName) {
    stopwatchTab.style.display = 'none';
    timerTab.style.display = 'none';
    clockTab.style.display = 'none';

    if (tabName === 'stopwatch') {
        stopwatchTab.style.display = 'flex';
    } else if (tabName === 'timer') {
        timerTab.style.display = 'flex';
    } else if (tabName === 'clock') {
        clockTab.style.display = 'flex';
    }
}

// Stopwatch Functions
function startPauseStopwatch() {
    if (!isStopwatchRunning) {
        stopwatchStartTime = new Date().getTime() - stopwatchDifference;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms
        startPauseStopwatchBtn.textContent = 'Pause';
        isStopwatchRunning = true;
    } else {
        clearInterval(stopwatchInterval);
        stopwatchDifference = new Date().getTime() - stopwatchStartTime;
        startPauseStopwatchBtn.textContent = 'Start';
        isStopwatchRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchStartTime = 0;
    stopwatchUpdatedTime = 0;
    stopwatchDifference = 0;
    isStopwatchRunning = false;
    stopwatchDisplay.textContent = '00:00:00.000';
    startPauseStopwatchBtn.textContent = 'Start';
}

function updateStopwatch() {
    stopwatchUpdatedTime = new Date().getTime() - stopwatchStartTime;

    let milliseconds = parseInt((stopwatchUpdatedTime % 1000) / 10);
    let seconds = Math.floor((stopwatchUpdatedTime / 1000) % 60);
    let minutes = Math.floor((stopwatchUpdatedTime / (1000 * 60)) % 60);
    let hours = Math.floor((stopwatchUpdatedTime / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Timer Functions
function startPauseTimer() {
    if (!isTimerRunning) {
        const hours = parseInt(timerHourInput.value) || 0;
        const minutes = parseInt(timerMinuteInput.value) || 0;
        const seconds = parseInt(timerSecondInput.value) || 0;

        timerDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
        timerStartTime = new Date().getTime();

        if (timerDuration > 0) {
            timerInterval = setInterval(updateTimer, 10); // Update every 10ms
            startPauseTimerBtn.textContent = 'Pause';
            timerInputContainer.style.display = 'none';
            isTimerRunning = true;
        }
    } else {
        clearInterval(timerInterval);
        timerDuration -= (new Date().getTime() - timerStartTime);
        startPauseTimerBtn.textContent = 'Start';
        isTimerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerDisplay.textContent = '00:00:00.00';
    startPauseTimerBtn.textContent = 'Start';
    timerInputContainer.style.display = 'block';
}

function updateTimer() {
    let remainingTime = timerDuration - (new Date().getTime() - timerStartTime);

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00:00.00';
        isTimerRunning = false;
        startPauseTimerBtn.textContent = 'Start';
        timerInputContainer.style.display = 'block';
        alert('Time is up!');
        return;
    }

    let milliseconds = parseInt((remainingTime % 1000) / 10);
    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    timerDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Clock Functions
function updateClock() {
    const now = new Date();

    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

startPauseStopwatchBtn.addEventListener('click', startPauseStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);

startPauseTimerBtn.addEventListener('click', startPauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Show default tab
showTab('stopwatch');

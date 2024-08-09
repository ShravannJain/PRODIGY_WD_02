let timerInterval;
let isRunning = false;
let startTime = 0; // Start time in milliseconds
let elapsedTime = 0; // Elapsed time in milliseconds
let lapCount = 0; // Variable to keep track of lap numbers

function run() {
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    let mil_sec = document.getElementById("mili-sec");
    let startPauseBtn = document.getElementById("start-btn");

    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.value = "Start";
    } else {
        // Start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            const totalSeconds = Math.floor(elapsedTime / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const milliseconds = Math.floor(elapsedTime % 1000 / 10);

            min.innerHTML = (minutes < 10 ? "0" : "") + minutes;
            sec.innerHTML = (seconds < 10 ? "0" : "") + seconds;
            mil_sec.innerHTML = (milliseconds < 10 ? "0" : "") + milliseconds;

        }, 10); // Update every 10 milliseconds for more accurate time
        isRunning = true;
        startPauseBtn.value = "Pause";
    }
}

function reset() {
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    let mil_sec = document.getElementById("mili-sec");

    // Stop the timer
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;

    // Reset the display
    min.innerHTML = "00";
    sec.innerHTML = "00";
    mil_sec.innerHTML = "00";

    // Clear lap times
    document.getElementById("laps-list").innerHTML = "";
    lapCount = 0;

    // Reset button text
    document.getElementById("start-btn").value = "Start";
}

function laps() {
    if (isRunning) {
        lapCount++;
        let lapTime = document.createElement("li");
        lapTime.innerHTML = `Lap ${lapCount}: ${document.getElementById("min").innerHTML}:${document.getElementById("sec").innerHTML}:${document.getElementById("mili-sec").innerHTML}`;
        document.getElementById("laps-list").appendChild(lapTime);
    }
}


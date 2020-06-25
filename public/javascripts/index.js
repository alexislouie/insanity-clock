import {
    plyoCardioCircuit,
    cardioPowerResist,
    pureCardio,
    maxIntervalPlyo,
    maxIntervalCircuit,
    maxCardioCondit, test
} from './workouts.js';

const sound = new Audio('../beep.mp3');
let selectedWorkout;
let delayTime = 0;
let prevDelayTime = 0;
let timerHasStarted = false;

$("#workouts").on('change', function () {
    selectedWorkout = $(this).find('option:selected').attr('id');
});

$('.menuButton').on('click', function(e) {
    e.preventDefault();
    if (!selectedWorkout) {
        $('.error').remove();
        $('.welcomeScreen').append(`
            <div class="error">Please select a workout</div>
        `)
    } else {
        $('.error').remove();
        // $(this).parent().parent().toggleClass('hide');
        $(this).parent().parent().css('display', 'none');
        findWorkout(selectedWorkout);
    }
})

$('.startButton').on('click', function (e) {
    e.preventDefault();
    timerHasStarted = true;
    setWorkout(selectedWorkout);
    $(this).parent().remove();
})

$(window).on('click', function(e) {
    if (timerHasStarted) {
        togglePause();
    }
})

function togglePause() {
    console.log('app will pause');
}

function findWorkout(workout) {
    $('.startScreen').toggleClass('hide');
    switch (workout) {
        case 'test':
            displayWorkout('Test');
            break;
        case 'plyoCardioCircuit':
            displayWorkout('Plyometric Cardio Circuit');
            break;
        case 'cardioPowerResist':
            displayWorkout('Cardio, Power, & Resistance');
            break;
        case 'pureCardio':
            displayWorkout('Pure Cardio');
            break;
        case 'maxIntervalPlyo':
            displayWorkout('Max Interval Plyo');
            break;
        case 'maxIntervalCircuit':
            displayWorkout('Max Interval Circuit');
            break;
        case 'maxCardioCondit':
            displayWorkout('Max Cardio Conditioning');
            break;
    }
}

function displayWorkout(workoutName) {
    $('.startScreen').prepend(`
        <span class="workoutName">${workoutName}</span><br />
        <span class="time">00:00</span><br />
    `);
}

function setWorkout(workout) {
    switch (workout) {
        case 'test':
            loopThroughWorkout(test);
            break;
        case 'plyoCardioCircuit':
            loopThroughWorkout(plyoCardioCircuit);
            break;
        case 'cardioPowerResist':
            loopThroughWorkout(cardioPowerResist);
            break;
        case 'pureCardio':
            loopThroughWorkout(pureCardio);
            break;
        case 'maxIntervalPlyo':
            loopThroughWorkout(maxIntervalPlyo);
            break;
        case 'maxIntervalCircuit':
            loopThroughWorkout(maxIntervalCircuit);
            break;
        case 'maxCardioCondit':
            loopThroughWorkout(maxCardioCondit);
            break;
    }
}

function loopThroughWorkout(workout) {
    Object.values(workout).forEach((phase) => {
        loopThroughPhase(phase);
    })
}

function loopThroughPhase(phase) {
    let circuitCount = 0;
    phase.forEach(circuit => {
        const exercises = circuit.exercises;

        while (circuitCount < circuit.repeat) {
            exercises.forEach(exercise => {
                const { name, duration, unitTime, notes } = exercise;
                const durationInSeconds = calcDurationInSeconds(duration, unitTime);
                setCountDown(durationInSeconds, name, notes);
            })
            circuitCount++;
        }
        circuitCount = 0; 
    })
}

function calcDurationInSeconds(duration, units) {
    let durationInSeconds;
    if (units === 's') {
        durationInSeconds = duration;
    } else if (units === 'm') {
        let minInSeconds = Math.floor(duration) * 60;
        let seconds = (duration - Math.floor(duration)) * 60;
        durationInSeconds = minInSeconds + seconds;
    }
    return durationInSeconds;
}

function setCountDown(durationInSeconds, name, notes) {
    console.log(name, ' duration in seconds: ', durationInSeconds)
    delayTime = (durationInSeconds + 1) * 1000;

    console.log(name, ': ', prevDelayTime)
    setTimeout(function () {
        let timer = durationInSeconds;
        let secondCount = 0;

        let bgColor, textColor;
        if (name === 'break' || name === 'stretch') {
            bgColor = '#53b882';
            textColor = 'white';

        } else if (name === 'Cool Down') {
            bgColor = '#5dcfcf';
            textColor = 'white';
        } else {
            bgColor = '#f0eded';
        }

        while (timer >= 0) {
            const time = deriveMinAndSec(timer);
            setTimeout(function () {
                displayCountDown(time, name, notes, bgColor, textColor);
            }, 1000 * secondCount);

            timer--;
            secondCount++
        }

    }, prevDelayTime);
    prevDelayTime += delayTime;
}

function deriveMinAndSec(durationInSeconds) {
    let displayMin;
    let displaySec;
    let timer = durationInSeconds; 

    if (durationInSeconds < 60) {
        displayMin = '00';
        displaySec = durationInSeconds < 10 ? `0${durationInSeconds}` : durationInSeconds;
    } else {
        let minutes = Math.floor(durationInSeconds / 60);
        displayMin = minutes < 10 ? `0${minutes}` : minutes;

        timer = timer - minutes * 60;
        let seconds = timer;
        displaySec = seconds < 10 ? `0${seconds}` : seconds;
    }
    return { min: displayMin, sec: displaySec };
}

function displayCountDown(time, name, notes, bgColor, textColor) {
    if (time.min === '00' && time.sec === '00') {
        sound.play();
    }

    $('main').css('background', bgColor);
    $('.timer').css('background-color', bgColor);
    $('.bgColor').css('background-color', bgColor);
    $('.timer').html(`
        <span class="name" style="background: ${bgColor};color: ${textColor}">${name}</span><br />
        <span class="time" style="background: ${bgColor};color: ${textColor}">${time.min}:${time.sec}</span><br />
        <div class="notes" style="background: ${bgColor};color: ${textColor}">${notes}</span>
    `);
}

$('.muteButton').on('click', function(e) {
    
})

// const Timer = function (callback, delayTime, name, notes) {
//     let timerId, start, remaining = delayTime;

//     this.pause = function () {
//         window.clearTimeout(timerId);
//         remaining -= Date.now() - start;
//     };

//     this.resume = function () {
//         start = Date.now();
//         window.clearTimeout(timerId);
//         timerId = window.setTimeout(callback, remaining);
//     };

//     this.resume();
// };

// var timer = new Timer(function () {
//     alert("Done!");
// }, 1000);

// timer.pause();
// // Do some stuff...
// timer.resume();

// Must be able to pause 
// set Timeout to a variable 
// use variable to get the time details
// when unpause, restart the time using the variables 
// will also need to know where in the loop of sets and exercises we are to restart the loop from there as well 
// https://stackoverflow.com/questions/3969475/javascript-pause-settimeout

// mute button
import {
    plyoCardioCircuit,
    pureCardio,
    maxIntervalPlyo,
    maxIntervalCircuit,
    maxCardioCondit, test
} from './workouts.js';


let exerciseCount = 0;
let selectedWorkout = 'plyoCardioCircuit';
$("#workouts").on('change', function () {
    selectedWorkout = $(this).find('option:selected').attr('id');
});

$('.dropdownButton').on('click', function (e) {
    e.preventDefault();
    // $(this).parent().addClass('hide')
    setWorkout(selectedWorkout);
})

// $('.dropdownButton').on('click', function(e) {
//   e.preventDefault();
//   $(this).parent().addClass('hide')
//   displayStartScreen();
// })

// $('.startButton').on('click', function(e) {
//   e.preventDefault();
//   setWorkout(selectedWorkout)
// })

// function displayStartScreen() {
//   $('.startScreen').toggleClass('hide');

// }


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
    // let circuitCount = -1;
    // workout.warmUp.forEach(circuit => {
    //   let exercises = circuit.exercises;
    //   let exerciseCount = 0;
    //   while (circuitCount <= circuit.repeat) {
    //     exercises.forEach(exercise => {
    //       const {name, duration, unitTime, notes} = exercise;
    //       const durationInSeconds = calcDurationInSeconds(duration, unitTime);

    //       setCountDown(durationInSeconds, exerciseCount, name)
    //       circuitCount++;
    //       exerciseCount++;
    //     })
    //   }
    // })

    Object.values(workout).forEach((phase) => {
        loopThroughPhase(phase);
    })
}

function loopThroughPhase(phase) {
    let circuitCount = -1;
    phase.forEach(circuit => {
        const exercises = circuit.exercises;
        console.log('circuits exercises: ', exercises )
        while (circuitCount <= circuit.repeat) {
            // loopThroughExercises(exercises);
            exercises.forEach(exercise => {
                const { name, duration, unitTime, notes } = exercise;
                console.log('name & exercise count: ', name, ', ', exerciseCount);
                console.log('circuit repeat: ', circuit.repeat);
                const durationInSeconds = calcDurationInSeconds(duration, unitTime);
                setCountDown(durationInSeconds, exerciseCount, name)
                circuitCount++;
                exerciseCount++;
            })
        }
        circuitCount = -1; 

    })
}

// function loopThroughExercises() {

// }

function setCountDown(durationInSeconds, exerciseCount, name) {
    let delayTime = (durationInSeconds + 1) * 1000 * exerciseCount;
    // let delayTime = 5000 * exerciseCount;
    console.log('delayed Time for ', name, ': ', delayTime)

    // resets for however long the exercise duration is
    setTimeout(function () {
        console.log('setTimeOut', name);
        let timer = durationInSeconds;
        let displayMin;
        let displaySec;

        let secondCount = 0;
        while (timer >= 0) {
            const time = deriveMinAndSec(timer);
            console.log('naem & time: ', name, ': ', time);

            setTimeout(function () {
                displayCountDown(time, name);
            }, 1000 * secondCount);

            timer--;
            secondCount++
        }

    }, delayTime);

}

function displayCountDown(time, name) {
    $('.timer').append(`${name} ${time.min}:${time.sec}<br />`);
}

function deriveMinAndSec(durationInSeconds) {
    let displayMin;
    let displaySec;
    let seconds;

    if (durationInSeconds < 60) {
        displayMin = '00';
        displaySec = durationInSeconds < 10 ? `0${durationInSeconds}` : durationInSeconds;

    } else {
        let minutes = Math.floor(durationInSeconds / 60);
        displayMin = minutes < 10 ? `0${minutes}` : minutes;

        // (127 / 60) - (127/60 rounded) * 60
        let seconds = Math.floor((durationInSeconds / 60  - Math.floor(durationInSeconds / 60)) * 60);
        displaySec = seconds < 10 ? `0${seconds}` : seconds;
    }
    return { min: displayMin, sec: displaySec };

    // let displayMin;
    // let displaySec;

    // if (durationInSeconds < 60) {
    //     displayMin = '00';
    //     displaySec = parseInt(durationInSeconds);
    // } else {
    //     let minutes = parseInt(Math.floor(durationInSeconds / 60));
    //     displayMin = minutes < 10 ? `0${minutes}` : minutes;

    //     let seconds = parseInt(durationInSeconds - Math.floor(durationInSeconds / 60));
    //     displaySec = durationInSeconds < 10 ? `0${durationInSeconds}`: seconds;
    // }
    // return { min: displayMin, sec: displaySec };
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

// Must be able to pause 
// set Timeout to a variable 
// use variable to get the time details
// when unpause, restart the time using the variables 
// will also need to know where in the loop of sets and exercises we are to restart the loop from there as well 
// https://stackoverflow.com/questions/3969475/javascript-pause-settimeout

// each exercise: 
// name:
// duration: 
// notes: 
// time in which note should show up
// (or just have note already on screen?)
//
// if exercise name = waterBreak, background color = green 
// if key = waterBreak
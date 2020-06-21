import {
    plyoCardioCircuit,
    pureCardio,
    maxIntervalPlyo,
    maxIntervalCircuit,
    maxCardioCondit, test
} from './workouts.js';


// let selectedWorkout = 'test';
let selectedWorkout;
let delayTime = 0;
let prevDelayTime = 0;
$("#workouts").on('change', function () {
    selectedWorkout = $(this).find('option:selected').attr('id');
});

// $('.menuButton').on('click', function (e) {
//     e.preventDefault();
//     setWorkout(selectedWorkout);
// })

$('.menuButton').on('click', function(e) {
    e.preventDefault();
    if (!selectedWorkout) {
        $('.error').remove();
        $('.menu').append(`
            <div class="error">Please select a workout</div>
        `)
    } else {
        $('.error').remove();
        $(this).parent().parent().toggleClass('hide');
        findWorkout(selectedWorkout);
    }
})

$('.startButton').on('click', function (e) {
    e.preventDefault();
    console.log('selectedWorkout: ', selectedWorkout)
    setWorkout(selectedWorkout);
    // $(this).hide();
    $(this).parent().remove();
})
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


function displayWorkout(workoutName, workout) {
    console.log(workoutName)
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
                console.log('name & circuitCount: ', name, ' ', circuitCount, circuit.repeat)
                const durationInSeconds = calcDurationInSeconds(duration, unitTime);
                setCountDown(durationInSeconds, name, notes);
            })
            circuitCount++;
        }
        circuitCount = 0; 
    })
}

function setCountDown(durationInSeconds, name, notes) {
    delayTime = (durationInSeconds + 1) * 1000;

    setTimeout(function () {
        let timer = durationInSeconds;
        let secondCount = 0;
        while (timer >= 0) {
            const time = deriveMinAndSec(timer);
            console.log(name, ': ', time);

            setTimeout(function () {
                displayCountDown(time, name, notes);
            }, 1000 * secondCount);

            timer--;
            secondCount++
        }

    }, prevDelayTime);
    prevDelayTime += delayTime;
}

function displayCountDown(time, name, notes) {
    let color; 
    if (name === 'break' || name === 'stretch') {
        color = '#53b882';
    } else if (name === 'Cool Down') {
        color = '#5dcfcf';
    }
    $('.timer').html(`
        <span class="name" style="color:${color}">${name}</span><br />
        <span class="time">${time.min}:${time.sec}</span><br />
        <div class="notes">${notes}</span>
    `);
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
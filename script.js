document.getElementById('add-note-btn').addEventListener('click', function() {
    const noteInput = document.getElementById('note-input').value;
    const noteTime = parseInt(document.getElementById('note-time').value) || 0;

    if (noteInput.trim() === "" || noteTime <= 0) {
        alert('Please enter a note and a valid time.');
        return;
    }

    const notesContainer = document.getElementById('notes-container');
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');

    const noteText = document.createElement('p');
    noteText.innerText = noteInput;

    const timer = document.createElement('span');
    timer.classList.add('timer');
    timer.innerText = `${noteTime}:00`;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => {
        notesContainer.removeChild(noteItem);
    };

    noteItem.appendChild(noteText);
    noteItem.appendChild(timer);
    noteItem.appendChild(deleteBtn);
    notesContainer.appendChild(noteItem);

    startTimer(timer, noteTime, noteItem);
    document.getElementById('note-input').value = "";
    document.getElementById('note-time').value = "";
});

function startTimer(timerElement, minutes, noteItem) {
    let totalSeconds = minutes * 60;

    const interval = setInterval(() => {
        totalSeconds--;

        const minutesLeft = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const secondsLeft = String(totalSeconds % 60).padStart(2, '0');
        timerElement.innerText = `${minutesLeft}:${secondsLeft}`;

        if (totalSeconds <= 0) {
            clearInterval(interval);
            alertSound();
            makeSticky(noteItem);
        }
    }, 1000);
}

function alertSound() {
    const alertAudio = document.getElementById('alert-sound');
    alertAudio.play();
}

function makeSticky(noteItem) {
    noteItem.classList.add('sticky');
}

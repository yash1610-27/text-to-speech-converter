let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let isSpeaking = false; // Track whether speech is currently in progress

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
}

window.speechSynthesis.onvoiceschanged = populateVoices;

// Wait for voices to be loaded before setting the voice
window.addEventListener('DOMContentLoaded', (event) => {
    populateVoices();
    speech.voice = voices[0]; // Set the default voice

    // Event listener for voice selection change
    voiceSelect.addEventListener('change', function () {
        speech.voice = voices[this.value];
    });

    // Event listener for the "Listen" button click
    document.getElementById("listenButton").addEventListener("click", function () {
        speech.text = document.querySelector("textarea").value;
        window.speechSynthesis.speak(speech);
        isSpeaking = true;
    });

    // Event listener for the "Stop" button click
    document.getElementById("stopButton").addEventListener("click", function () {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
        }
    });
});
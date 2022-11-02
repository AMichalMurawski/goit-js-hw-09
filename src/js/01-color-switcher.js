const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyHtml = document.querySelector('body');

let timerChangeColor = null;

btnStart.addEventListener('click', () => {
    timerChangeColor = setInterval(() => {
        bodyHtml.style.backgroundColor=getRandomHexColor();
    }, 1000);
    btnStart.setAttribute('disabled','');
})

btnStop.addEventListener('click', () => {
    clearInterval(timerChangeColor);
    btnStart.removeAttribute('disabled','');
})

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
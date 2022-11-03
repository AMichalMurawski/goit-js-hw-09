import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerBtn = document.querySelector('[data-start]');
const timerInput = document.querySelector('#datetime-picker');
const timerContainer = document.querySelector('.timer');
const timerField = timerContainer.querySelectorAll('.field');
const timerValue = timerContainer.querySelectorAll('.value');
const timerLabel = timerContainer.querySelectorAll('.label');
const timerDays = timerContainer.querySelector('[data-days]');
const timerHours = timerContainer.querySelector('[data-hours]');
const timerMinutes = timerContainer.querySelector('[data-minutes]');
const timerSeconds = timerContainer.querySelector('[data-seconds]');

//////////////////////////////////////////////////////////

timerContainer.style.display = 'flex';
timerContainer.style.gap = '12px';
timerContainer.style.marginTop = '40px';

timerField.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
});

timerValue.forEach(value => {
  value.style.textAlign = 'center';
  value.style.scale = '2.1';
});

timerLabel.forEach(label => {
  label.style.scale = '0.8';
});

//////////////////////////////////////////////////////////

let countingDown = null;
timerBtn.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    clearInterval(countingDown);
    changeCounting(0, 0, 0, 0);
    if (selectedDates[0] > Date.now()) {
      timerBtn.removeAttribute('disabled', '');
    } else {
      timerBtn.setAttribute('disabled', '');
    }
  },
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const timerAction = flatpickr(timerInput, options);

timerBtn.addEventListener('click', () => {
  timerBtn.setAttribute('disabled', '');
  countingDown = setInterval(() => {
    const timeEnd = new Date(timerInput.value);
    const remainingTime = convertMs(timeEnd.getTime() - Date.now());
    changeCounting(
      remainingTime.days,
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (value = value < 10 ? '0' + value : value);
}

function changeCounting(days, hours, minutes, seconds) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

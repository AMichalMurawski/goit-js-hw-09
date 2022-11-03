import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

/* === HTML elements === */

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

/* === layout of interface elements === */

timerContainer.style.display = 'flex';
timerContainer.style.gap = '0.5em';
timerContainer.style.marginTop = '1em';

timerField.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.width = '3em';
});

timerValue.forEach(value => {
  value.style.textAlign = 'center';
  value.style.fontSize = '1.8em';
});

timerLabel.forEach(label => {
  label.style.fontSize = '0.6em';
  label.style.textTransform = 'uppercase';
  label.style.fontWeight = '700';
});

/* === working of calendar and counting === */

// counting variable
let countingDown = null;

// start with disable start button
timerBtn.setAttribute('disabled', '');

// options for calendar
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // change start button disable with change date
  // clear interval and interface elements with change date
  onChange(selectedDates) {
    clearInterval(countingDown);
    changeCounting(0, 0, 0, 0);
    if (selectedDates[0] > Date.now()) {
      timerBtn.removeAttribute('disabled', '');
    } else {
      timerBtn.setAttribute('disabled', '');
    }
  },
  // show alert whith close calendar when the set date is in past
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
    } else {
      Notify.failure('Please choose a date in the future');
      timerBtn.setAttribute('disabled', '');
    }
  },
};

// calendar from flatpickr library
const timerAction = flatpickr(timerInput, options);

// start counting when click start button
timerBtn.addEventListener('click', () => {
  timerBtn.setAttribute('disabled', '');
  countingDown = setInterval(() => {
    const timeEnd = new Date(timerInput.value);
    const remainingTime = timeEnd.getTime() - Date.now();
    // checking if date is before the set date
    // // if yes change interface elements
    if (timeEnd.getTime() - Date.now() > 0) {
      const timeInput = convertMs(remainingTime);
      changeCounting(
        timeInput.days,
        timeInput.hours,
        timeInput.minutes,
        timeInput.seconds
      );
      // // if no end interval
    } else {
      clearInterval(countingDown);
    }
  }, 1000);
});

/* === functions === */

// convert time in milliseconds to days, hours, minutes, seconds
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

// set a 2 digit counter
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// change interface elements
function changeCounting(days, hours, minutes, seconds) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerContainer = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.value');
const timerLabel = document.querySelectorAll('.label');

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

const timerBtn = document.querySelector('[data-start]');
const timerInput = document.querySelector('#datetime-picker');
timerBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      timerBtn.removeAttribute('disabled', '');
    } else {
      timerBtn.setAttribute('disabled', '');
    }
  },
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] > Date.now()) {
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const timerAction = flatpickr(timerInput, options);

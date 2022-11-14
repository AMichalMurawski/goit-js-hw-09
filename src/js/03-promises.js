import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');
const btnSubmit = document.querySelector('button');

btnSubmit.addEventListener('click', submitPromise);

function submitPromise(event) {
  event.preventDefault();
  const promiseObj = {
    position: 0,
    delay: 0,
    isLast: false,
  };
  inputAmount.value > 0 ? btnSubmit.setAttribute('disabled', '') : '';
  for (let i = 0; i < inputAmount.value; i++) {
    promiseObj.position = i + 1;
    promiseObj.delay = +inputDelay.value + inputStep.value * i;
    promiseObj.isLast = i === +inputAmount.value - 1 ? true : false;
    createPromise(promiseObj)
      .then(resolve => {
        Notify.success(resolve, {
          useIcon: false,
        });
      })
      .catch(reject => {
        Notify.failure(reject, {
          useIcon: false,
        });
      });
  }
}

function createPromise({ position, delay, isLast }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
      isLast === true ? btnSubmit.removeAttribute('disabled', '') : '';
    }, delay);
  });
}

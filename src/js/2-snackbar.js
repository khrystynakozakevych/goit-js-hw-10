import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// selecting DOM elements
const form = document.querySelector('.form');

// function to create and handle promise
const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

// handling form submission
form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements['delay'].value;
  const stateInput = form.elements['state'].value;

  const delay = parseInt(delayInput);

  createPromise(delay, stateInput)
    .then(delay => {
      // handling fulfilled promise
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        class: 'custom-toast-success',
        width: '383px',
        titleLineHeight: '150%',
        messageLineHeight: '150%',
      });
    })
    .catch(delay => {
      // handling rejected promise
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        class: 'custom-toast-error',
        width: '383px',
        titleLineHeight: '150%',
        messageLineHeight: '150%',
      });
    });

  form.elements['state'].forEach(radio => (radio.checked = false));
  form.elements['delay'].value = '';
});

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);
function onSubmit(ev) {
  ev.preventDefault();
  const delay = Number(ev.currentTarget.elements.delay.value);
  const radioBtn = ev.currentTarget.elements.state.value;
  createPromise(radioBtn, delay)
    .then(response => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${response.delay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error.delay}ms`,
      });
    });
  ev.currentTarget.reset();
}

function createPromise(state, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res({ delay });
      } else if (state === 'rejected') {
        rej({ delay });
      }
    }, delay);
  });
}

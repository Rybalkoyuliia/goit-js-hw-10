import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysStr = document.querySelector('[data-days]');
const hoursStr = document.querySelector('[data-hours]');
const minutesStr = document.querySelector('[data-minutes]');
const secondsStr = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalID = null;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};
flatpickr(input, options);

function onStartBtnClick() {
  button.disabled = true;
  intervalID = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      return clearInterval(intervalID);
    }
    const time = convertMs(diff);
    const { days, hours, minutes, seconds } = time;
    daysStr.textContent = addLeadingZero(days);
    hoursStr.textContent = addLeadingZero(hours);
    minutesStr.textContent = addLeadingZero(minutes);
    secondsStr.textContent = addLeadingZero(seconds);
  }, 1000);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

button.addEventListener('click', onStartBtnClick);

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
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

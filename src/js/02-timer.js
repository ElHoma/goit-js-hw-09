import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);

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
  return value.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
// const timeValue = options.selectedDates.toTimeString().getTime();
flatpickr(inputEl, options);

let timerInterval;

function timer() {
  const selectedDate = new Date(inputEl.value);

  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = selectedDate.getTime() - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (
      daysEl.textContent == `00` &&
      hoursEl.textContent == `00` &&
      minutesEl.textContent == `00` &&
      secondsEl.textContent == `00`
    ) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startBtn.addEventListener(`click`, timer);

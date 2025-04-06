import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimeInput = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const counters = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let timerInterval;

const startBtnHighlight = isHovered => {
  if (isHovered === undefined) {
    startBtn.disabled = true;
    startBtn.style.color = `#989898`;
    startBtn.style.backgroundColor = `#cfcfcf`;
    return;
  }
  startBtn.disabled = false;
  if (isHovered) {
    startBtn.style.color = `#ffffff`;
    startBtn.style.backgroundColor = `#6C8CFF`;
  } else {
    startBtn.style.color = `#ffffff`;
    startBtn.style.backgroundColor = `#4E75FF`;
  }
};

const startBtnListen = () => {
  const events = ['pointerover', 'pointerout', 'click'];
  events.forEach(eventType => {
    startBtn.addEventListener(eventType, event => {
      if (!startBtn.disabled) {
        if (event.type === 'click') {
          startTimer();
        } else if (event.type === 'pointerover') {
          startBtnHighlight(true);
        } else if (event.type === 'pointerout') {
          startBtnHighlight(false);
        }
      }
    });
  });
};

flatpickr(dateTimeInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      startBtnHighlight();
      iziToast.error({
        theme: 'dark',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtnHighlight(false);
    }
  },
});

const startTimer = () => {
  if (userSelectedDate > new Date()) {
    startBtnHighlight();
    dateTimeInput.disabled = true;
    timerInterval = setInterval(() => {
      const now = new Date();
      const timer = userSelectedDate - now;
      if (timer <= 0) {
        clearInterval(timerInterval);
        dateTimeInput.disabled = false;
        iziToast.success({
          theme: 'dark',
          backgroundColor: '#59A10D',
          progressBarColor: '#326101',
          message: 'Timer finished!',
          position: 'topRight',
        });
      } else {
        updateTimerDisplay(convertMs(timer));
      }
    }, 1000);
  }
};

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  for (const key in counters) {
    counters[key].textContent = String(
      { days, hours, minutes, seconds }[key]
    ).padStart(2, '0');
  }
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

startBtnHighlight();
startBtnListen();

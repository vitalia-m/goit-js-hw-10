import './assets/modulepreload-polyfill-B5Qt9EMX.js';
import { f as h, i as c } from './assets/vendor-BbbuE1sJ.js';
document.addEventListener('DOMContentLoaded', () => {
  const l = document.getElementById('datetime-picker'),
    r = document.querySelector('[data-start]'),
    u = document.querySelector('[data-days]'),
    m = document.querySelector('[data-hours]'),
    p = document.querySelector('[data-minutes]'),
    f = document.querySelector('[data-seconds]');
  let s,
    a = null;
  h(l, {
    enableTime: !0,
    time_24hr: !0,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(t) {
      (a = t[0]),
        a < new Date()
          ? (c.error({
              title: 'Not available',
              message: 'Please choose a date in the future',
              position: 'topRight',
            }),
            (r.disabled = !0))
          : (r.disabled = !1);
    },
  }),
    r.addEventListener('click', () => {
      if ((clearInterval(s), !a)) {
        c.warning({
          title: 'Error',
          message: 'Please choose a date before activating the timer',
          position: 'topRight',
        });
        return;
      }
      s = setInterval(() => {
        const e = a - new Date();
        if (e <= 0) {
          clearInterval(s),
            c.success({
              title: 'Time has ended up',
              message: 'Timer ran out',
              position: 'topRight',
            }),
            d(0, 0, 0, 0);
          return;
        }
        const { days: n, hours: o, minutes: i, seconds: g } = S(e);
        d(n, o, i, g);
      }, 1e3);
    });
  function S(t) {
    const e = Math.floor(t / 864e5),
      n = Math.floor((t % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
      o = Math.floor((t % (1e3 * 60 * 60)) / (1e3 * 60)),
      i = Math.floor((t % (1e3 * 60)) / 1e3);
    return { days: e, hours: n, minutes: o, seconds: i };
  }
  function d(t, e, n, o) {
    (u.textContent = String(t).padStart(2, '0')),
      (m.textContent = String(e).padStart(2, '0')),
      (p.textContent = String(n).padStart(2, '0')),
      (f.textContent = String(o).padStart(2, '0'));
  }
});

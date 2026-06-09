(function () {
  let dueDate = new Date('2027-01-08T00:00:00');
  const fullTermDays = 280;

  const dueDateEl = document.getElementById('dueDate');
  const dueDateInputEl = document.getElementById('dueDateInput');
  const todayDateEl = document.getElementById('todayDate');
  const monthsEl = document.getElementById('months');
  const weeksEl = document.getElementById('weeks');
  const daysEl = document.getElementById('days');
  const totalDaysEl = document.getElementById('totalDays');
  const pregnancyAgeEl = document.getElementById('pregnancyAge');

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function toInputDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function addMonths(date, months) {
    const d = new Date(date);
    const day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + months);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, lastDay));
    return d;
  }

  function splitMonthsWeeksDays(fromDate, toDate) {
    let months = 0;
    let cursor = new Date(fromDate);

    while (true) {
      const next = addMonths(cursor, 1);
      if (next <= toDate) {
        months += 1;
        cursor = next;
      } else {
        break;
      }
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const remainingDays = Math.max(0, Math.floor((toDate - cursor) / msPerDay));
    const weeks = Math.floor(remainingDays / 7);
    const days = remainingDays % 7;

    return { months, weeks, days };
  }

  function updateCountdown() {
    const today = startOfDay(new Date());
    const due = startOfDay(dueDate);
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.max(0, Math.floor((due - today) / msPerDay));

    dueDateEl.textContent = due.toDateString();
    todayDateEl.textContent = today.toDateString();

    if (today >= due) {
      monthsEl.textContent = '0';
      weeksEl.textContent = '0';
      daysEl.textContent = '0';
      totalDaysEl.textContent = 'Delivery date reached!';
      pregnancyAgeEl.textContent = '';
      return;
    }

    const split = splitMonthsWeeksDays(today, due);
    monthsEl.textContent = String(split.months);
    weeksEl.textContent = String(split.weeks);
    daysEl.textContent = String(split.days);

    totalDaysEl.textContent = `${daysRemaining} days left until delivery.`;

    const pregnancyDaysElapsed = Math.max(0, fullTermDays - daysRemaining);
    const pregWeeks = Math.floor(pregnancyDaysElapsed / 7);
    const pregDays = pregnancyDaysElapsed % 7;
    pregnancyAgeEl.textContent = `Current pregnancy age: ${pregWeeks} weeks ${pregDays} days.`;
  }

  dueDateInputEl.value = toInputDateString(startOfDay(dueDate));
  dueDateInputEl.addEventListener('change', (event) => {
    if (!event.target.value) {
      return;
    }

    const selectedDueDate = new Date(`${event.target.value}T00:00:00`);
    if (Number.isNaN(selectedDueDate.getTime())) {
      return;
    }

    dueDate = selectedDueDate;
    updateCountdown();
  });

  updateCountdown();
  setInterval(updateCountdown, 60 * 60 * 1000);
})();

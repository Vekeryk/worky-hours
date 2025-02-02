document.addEventListener("DOMContentLoaded", function () {
  const selectedDates = new Set();

  var calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    firstDay: 1,
    height: 460,
    eventClassNames: "event",
    dateClick: (info) => handleDayClick(info.dateStr),
    eventClick: (info) => handleDayClick(info.event.startStr),
    datesSet: function (info) {
      const viewingMonth = calendar.getDate().getMonth();
      selectWorkDays(info.start, info.end, viewingMonth);
    },
  });
  calendar.render();

  function handleDayClick(dateStr) {
    console.log(dateStr);

    if (selectedDates.has(dateStr)) {
      selectedDates.delete(dateStr);
    } else {
      selectedDates.add(dateStr);
    }
    updateCalendar();
  }

  function updateCalendar() {
    calendar.removeAllEvents();
    selectedDates.forEach((date) => {
      calendar.addEvent({
        title: "Work Day",
        start: date,
        allDay: true,
        color: "#1D6DC7",
      });
    });
    updateTotalHours();
  }

  function selectWorkDays(startDate, endDate, viewingMonth) {
    selectedDates.clear();

    let currentDate = startDate;

    while (currentDate < endDate) {
      const dayOfWeek = currentDate.getDay();
      const month = currentDate.getMonth();

      if (dayOfWeek !== 0 && dayOfWeek !== 6 && month === viewingMonth) {
        const selectedDate = new Date(currentDate);
        selectedDate.setMinutes(
          selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
        );
        selectedDates.add(selectedDate.toISOString().split("T")[0]); // Store in YYYY-MM-DD
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    updateCalendar();
  }

  function updateTotalHours() {
    const hoursPerDay =
      parseInt(document.getElementById("hoursPerDay").value) || 0;
    const totalHours = selectedDates.size * hoursPerDay;
    document.getElementById("totalHours").textContent = totalHours;
  }

  document
    .getElementById("hoursPerDay")
    .addEventListener("change", updateTotalHours);
});

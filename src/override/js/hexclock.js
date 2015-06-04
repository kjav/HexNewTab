(function() {
  'use strict';

  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  /**
  * Converts the current time to a hex color and then changes the background to that color every second
  */
  function displayHexClock() {
    // Get the current time
    var clock = new Date(),
        h = clock.getHours(),
        m = clock.getMinutes(),
        s = clock.getSeconds();

    // Make sure that hours, minutes, and seconds are all 2 digits each
    if(h.toString().length < 2) { h = '0' + h; }
    if(m.toString().length < 2) { m = '0' + m; }
    if(s.toString().length < 2) { s = '0' + s; }

    var time = h + ':' + m + ':' + s;
    var color = '#' + h + m + s;

    // Change the background color to the hex color of the current time
    document.body.style.background = color;

    // Update the current time
    document.getElementById('time').innerHTML = time;

    // Update the current hex value
    document.getElementById('hexColor').innerHTML = color;

    // Set date
    var day = clock.getDate();
    if (day % 10 == 1) {
      day = day + 'st';
    } else if (day == 2 || day == 22) {
      day = day + 'nd';
    } else if (day == 3 || day == 23) {
      day = day + 'rd';
    } else {
      day = day + 'th';
    }
    date.innerHTML = dayNames[clock.getDay()] + ' ' + day + ' ' + monthNames[clock.getMonth()];
  }

  window.onload = function() {
    // Update the clock every second
    displayHexClock();
    setInterval(displayHexClock, 1000);
  };
})();

/**
 * @file a simple calendar
 * uses Date() to get day of the week
 */
window.addEventListener("DOMContentLoaded", () => {
  /** day of the week */
  const dow = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  /** to insert calendar */
  const calendars = document.getElementsByClassName("calendar");
  for (let div of calendars) {
    // what calendar to set
    const d = new Date();
    let year = d.getFullYear(),
      month = d.getMonth() + 1,
      date = d.getDate();

    const dataset = div.dataset.yyyymmdd;
    if (dataset) {
      year = parseInt(dataset.slice(0, 4)) || year;
      month = parseInt(dataset.slice(4, 6)) || month;
      date = parseInt(dataset.slice(6)) || 0; // 0 is not highlighting today
      month = setchk(1, month, 12);
    }
    renderCalendar(year, month, date, div);
  }
  /**
   * fill calendar with daytes
   * @param {number} year year of the calendar
   * @param {number} month month of the calendar (1~12)
   * @param {number} today today or 0
   * @param {HTMLDivElement} div calendar parent div
   */
  function renderCalendar(year, month, today, div) {
    delall(div);
    let day = new Date(year, month - 1, 1).getDay();
    let alldays = getDaysOfMonth(year, month);

    for (let i = 0; i < dow.length; ++i) {
      const el = div.appendChild(createDate(0, 0, 0, dow[i]));
      el.classList.add("calendar-dayofweek");
    }
    /** how many days were inserted */
    let datecnt = 0;

    const insertDate = () => {
      const el = div.appendChild(
        createDate(year, month, datecnt + 1, (datecnt + 1).toString())
      );
      if (datecnt + 1 == today) {
        el.classList.add("calendar-today");
      }
      datecnt++;
    };
    const insertDum = () => {
      div.appendChild(createDate(0, 0, 0, ""));
    };
    // 31//7==4; 3 days left, max row is 4+2
    for (let row = 0; row < 6; ++row) {
      for (let dayindx = 0; dayindx < dow.length; ++dayindx) {
        if (datecnt == 0) {
          // have not inserted yet
          if (day == dayindx) {
            // 1st
            insertDate(); // increments cnt
          } else {
            insertDum();
          }
        } else {
          // inserting days or finished
          if (datecnt >= alldays) {
            insertDum();
          } else {
            insertDate();
          }
        }
      }
    }
  }
  /**
   * get how many days the month has
   * @param {number} year
   * @param {number} month 1~12
   * @returns {number} 28~31
   */
  function getDaysOfMonth(year, month) {
    switch (month) {
      case 2:
        if (isLeap(year)) {
          return 29;
        }
        return 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  }
  /**
   * check leap year for february
   * @param {number} year
   * @returns {boolean} true if it is leap year
   */
  function isLeap(year) {
    if (year % 100 != 0 && year % 4 == 0) {
      return true;
    } else if (year % 400 == 0) {
      return true;
    }
    return false;
  }
  /**
   * create div of the date with dataset
   * @param {number} year year of the date
   * @param {number} month month of the date (1~12)
   * @param {number} date the date (1~28,31)
   * @param {string} str div text content
   * @returns {HTMLDivElement} day textcontent
   */
  function createDate(year, month, date, str) {
    const ret = document.createElement("div");
    ret.textContent = str;
    ret.dataset.date = date.toString();
    ret.dataset.month = month.toString();
    ret.dataset.year = year.toString();
    return ret;
  }
  /**
   * value between min and max
   * @param {number} min
   * @param {number} x
   * @param {number} max
   * @returns {number}
   */
  function setchk(min, x, max) {
    return Math.max(Math.min(max, x), min) || 0;
  }
  /**
   * delete all children
   * @param {HTMLElement} elem parent element
   * @returns {void}
   */
  function delall(elem) {
    return Array.from(elem.children).forEach((item) => elem.removeChild(item));
  }
});

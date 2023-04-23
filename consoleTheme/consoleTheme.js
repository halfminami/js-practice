/**
 * @file console typing animation
 * sleep() by waiting `promise` in `async function` is
 * a concise way to sleep() in for-loop
 */
window.addEventListener("DOMContentLoaded", () => {
  const INTERVAL = 250;
  const targets = Array.from(document.querySelectorAll("p,pre"));
  animateConsole(targets);
  /**
   * call printConsole on each elements
   * @param {Element[]} lines elements to be animated
   */
  async function animateConsole(lines) {
    // async function to use await sleep()
    // of course, you can make window DOMContentLoaded callback (this arrow function) async instead
    lines.forEach((item) => item.classList.add("hidden"));
    for (let target of lines) {
      if (target) {
        const arr = Array.from(target.childNodes);
        arr.forEach((item) => item.remove());
        target.classList.remove("hidden");
        target.classList.add("current");
        await printConsole(
          target,
          arr,
          parseInt(target.dataset.interval) || INTERVAL
        );
        target.classList.remove("current");
      }
    }
  }
  /**
   * animate text typing
   * @param {Element} cur parent element
   * @param {Element[]} arr parent element's childNodes array
   * @param {number} interval
   */
  async function printConsole(cur, arr, interval) {
    for (item of arr) {
      if (item) {
        if (item.nodeName.toLowerCase() == "#text") {
          const strarr = item.textContent.split("");
          for (char of strarr) {
            cur.appendChild(document.createTextNode(char));
            await sleep(interval / 10);
            if (char == " ") {
              await sleep(interval);
            }
          }
        } else {
          cur.appendChild(item);
          await sleep(interval);
        }
      }
    }
  }
  /**
   * await this to sleep in async function
   * @param {number} time sleep time
   * @returns {Promise<any>}
   */
  function sleep(time) {
    window.scroll(0, document.body.clientHeight);
    return new Promise((res, rej) => {
      setTimeout(res, time);
    });
  }
});

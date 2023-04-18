/**
 * @file a simple color picker
 * uses parseInt(string, 16) and Number.toString(16) to convert hex number
 * html color code (#ff00ee) is red-green-blue hex number 0~255 (256 is 2**8, 16**2)
 */
window.addEventListener("DOMContentLoaded", () => {
  const colorpickers = document.getElementsByClassName("colorpicker");
  for (let cp of colorpickers) {
    /** @type {HTMLDivElement} */
    const preview = cp.querySelector(".color-preview");
    const code = cp.querySelector(".color-code");
    /** @type {HTMLInputElement} */
    const rinput = cp.querySelector(".color-r");
    /** @type {HTMLDivElement} */
    const rvalue = cp.querySelector(".color-r-value");
    /** @type {HTMLInputElement} */
    const ginput = cp.querySelector(".color-g");
    /** @type {HTMLDivElement} */
    const gvalue = cp.querySelector(".color-g-value");
    /** @type {HTMLInputElement} */
    const binput = cp.querySelector(".color-b");
    /** @type {HTMLDivElement} */
    const bvalue = cp.querySelector(".color-b-value");
    /** @type {HTMLInputElement} */
    const hexinput = cp.querySelector(".color-hex");

    for (let iv of [
      [rinput, rvalue],
      [ginput, gvalue],
      [binput, bvalue],
    ]) {
      const input = iv[0],
        value = iv[1];
      input.addEventListener("input", () => {
        onInput(input, value);
      });
      input.dispatchEvent(new Event("input")); // update initial state
    }
    /**
     * update color by every rgb input
     * @param {HTMLInputElement} input
     * @param {HTMLDivElement} value
     */
    function onInput(input, value) {
      value.textContent = input.value; // input number value preview
      const colorcode = formatColorCode(
        parseInt(rinput.value, 10),
        parseInt(ginput.value, 10),
        parseInt(binput.value, 10)
      );
      preview.style.backgroundColor = colorcode;
      code.style.color = colorcode; // for css filter
      code.textContent = colorcode;
      hexinput.value = colorcode.slice(1); // erase "#"
    }

    hexinput.addEventListener("change", () => {
      const value = hexinput.value;

      if (value.length == 6) {
        // #ff0000
        const r = parseInt(value.slice(0, 2), 16) || 0;
        const g = parseInt(value.slice(2, 4), 16) || 0;
        const b = parseInt(value.slice(4, 6), 16) || 0;
        updateRGB(r, g, b);
      } else if (value.length == 3) {
        // sometimes same letter is omitted. #efe is #eeffee
        const r = parseInt(value[0] + value[0], 16) || 0;
        const g = parseInt(value[1] + value[1], 16) || 0;
        const b = parseInt(value[2] + value[2], 16) || 0;
        updateRGB(r, g, b);
      } else {
        // invalid input
        updateRGB(0, 0, 0);
      }
    });
    /**
     * update inputs and dispatch input
     * @param {number} r 0~255
     * @param {number} g 0~255
     * @param {number} b 0~255
     */
    function updateRGB(r, g, b) {
      rinput.value = r.toString(10);
      ginput.value = g.toString(10);
      binput.value = b.toString(10);
      rinput.dispatchEvent(new Event("input"));
      ginput.dispatchEvent(new Event("input"));
      binput.dispatchEvent(new Event("input"));

      hexinput.value = formatColorCode(r, g, b).slice(1);
    }
    /**
     * @param {number} r 0~255
     * @param {number} g 0~255
     * @param {number} b 0~255
     * @returns {string} like "#ffffff"
     */
    function formatColorCode(r, g, b) {
      return `#${padstr(r.toString(16), "0", 2)}${padstr(
        g.toString(16),
        "0",
        2
      )}${padstr(b.toString(16), "0", 2)}`;
    }
  }
  /**
   * for zero padding
   * @example
   * padstr("111", "0", 5);
   * '00111'
   * @param {string} str main string
   * @param {string} chr char to pad
   * @param {number} len string length
   * @returns {string}
   */
  function padstr(str, chr, len) {
    return (Array(len).join(chr) + str).slice(-len);
  }
});

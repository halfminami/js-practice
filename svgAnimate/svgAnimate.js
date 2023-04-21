/**
 * @file animate svg elements
 */
window.addEventListener("DOMContentLoaded", () => {
  const now = new Date(); // for svg animate
  const PERIOD = 5000; // dur="5000ms"

  /** @type {SVGCircleElement} */
  const point = document.getElementById("point");
  /** @type {HTMLInputElement} */
  const rate = document.getElementById("rate");
  /** @type {number|""} */
  let intervalid = "";
  /** @type {SVGSVGElement} */
  const curve = document.getElementById("curve");
  const preview = document.getElementById("preview");

  rate.addEventListener("change", () => {
    preview.textContent = rate.value;
    intervalid = updateInterval(intervalid);
  });
  rate.dispatchEvent(new Event("change"));
  /**
   * clear and set interval
   * @param {number|""} id current interval id
   * @returns {number} next interval id
   */
  function updateInterval(id) {
    if (id) {
      clearInterval(id);
    }
    point.classList.remove("check");
    return setInterval(() => {
      point.classList.add("check");
      curve.appendChild(createSample());

      setTimeout(() => {
        point.classList.remove("check");
      }, PERIOD / 50);
    }, PERIOD / parseFloat(rate.value));
  }
  /**
   * create point moving from left to right
   * @returns {SVGCircleElement}
   */
  function createSample() {
    const ret = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const anim = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    ret.appendChild(anim);

    ret.classList.add("cp");
    setAttributes(ret, [
      ["r", "5"],
      ["cx", "590"],
      ["cy", point.cy.animVal.value.toString()],
    ]);

    setAttributes(anim, [
      ["attributeName", "cx"],
      ["values", "0;590"], // width
      ["dur", `${PERIOD * 2}ms`],
      ["repeatCount", "1"],
      // svg animation starts by clock offset: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/begin
      ["begin", `${new Date().getTime() - now.getTime()}ms`],
    ]);

    setTimeout(() => {
      ret.remove();
    }, PERIOD * 2);
    return ret;
  }
  /**
   * set all attributes
   * @param {Element} elem
   * @param {[string,string][]} arr [[attribute, value]]
   */
  function setAttributes(elem, arr) {
    // when there is a specific way to set attribute (elem.classList.add(), elem.style.backgroundColor)
    // you should use it because the value could be modified.
    for (let item of arr) {
      elem.setAttribute(item[0], item[1]);
    }
  }
});

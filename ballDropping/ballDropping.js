/**
 * @file insert and animate div.box
 * dropping box by class
 * dragging box by function
 */
window.addEventListener("DOMContentLoaded", () => {
  const containers = Array.from(document.getElementsByClassName("container"));
  for (let container of containers) {
    insertBox(container, 200, 400);
  }
  /**
   * insert dropping box
   * @param {HTMLElement} parent parent element to insert box
   * @param {number} x left
   * @param {number} y upper
   */
  function insertBox(parent, x, y) {
    const box = parent.appendChild(new DroppingBox(x, y).element);
    dragElement(box);
  }
});

/**
 * @classdesc dropping box. set box's left and bottom
 */
class DroppingBox {
  /** @type {number|""} */
  intervalid = "";
  #G = { x: 0, y: -9.8 };
  /** left lower point of the box */
  #location;
  #v;
  element;
  /** parent container width */
  WIDTH = 500;
  /** parent container height */
  HEIGHT = 500;
  /** self box width */
  width = 30;
  /** self box height */
  height = 30;
  /**
   *
   * @param {number} x left
   * @param {number} y lower
   */
  constructor(x, y) {
    this.#location = { x, y };
    this.#v = { x: 0, y: 0 };

    this.element = document.createElement("div");
    this.element.classList.add("box");
    this.#setLocation();

    this.startDrop();
    this.element.addEventListener("mousedown", () => {
      this.#v.x = 0;
      this.#v.y = 0;
      this.stopDrop();
    });
    // window because often mouse pointer will be out of the element
    window.addEventListener("mouseup", () => {
      this.#location.x = this.element.offsetLeft;
      this.#location.y = this.WIDTH - this.element.offsetTop - this.width;
      this.startDrop();
    });
    this.element.addEventListener("dblclick", () => {
      // throw it at random speed
      this.#v.x = mathrandint(-1000, 1000);
      this.#v.y = mathrandint(-1000, 1000);
    });
  }

  startDrop() {
    if (this.intervalid) {
      clearInterval(this.intervalid);
    }
    this.intervalid = setInterval(() => {
      this.#updateLocation();
    }, 25);
  }
  stopDrop() {
    if (this.intervalid) {
      clearInterval(this.intervalid);
    }
    this.intervalid = "";
  }

  #setLocation() {
    this.element.style.bottom = `${this.#location.y}px`;
    this.element.style.left = `${this.#location.x}px`;
  }
  /**
   * if location is outside of the container, fix the location and reverse v
   */
  #updateLocation() {
    this.#updateV();

    this.#location.x = this.#calcLoc(this.#location.x, this.#v.x);
    const curx = this.#location.x;
    if (!isvaluemid(0, curx, this.WIDTH - this.width)) {
      this.#location.x = setchk(0, curx, this.WIDTH - this.width);
      this.#v.x = Math.floor(-this.#v.x / 2);
    }

    this.#location.y = this.#calcLoc(this.#location.y, this.#v.y);
    const cury = this.#location.y;
    if (!isvaluemid(0, cury, this.HEIGHT - this.height)) {
      this.#location.y = setchk(0, cury, this.HEIGHT - this.height);
      this.#v.y = Math.floor(-this.#v.y / 2);
    }

    this.#setLocation();
  }
  #updateV() {
    this.#v.x = this.#calcV(this.#v.x, this.#G.x);
    this.#v.y = this.#calcV(this.#v.y, this.#G.y);
    if (this.#location.y == 0) {
      this.#v.x = Math.floor(this.#v.x / 2); // 2 is random number
      if (Math.abs(this.#v.x) < 2) {
        this.#v.x = 0;
      }
    }
  }
  // 10 is random number
  #calcV(v, a) {
    return v + a / 10;
  }
  #calcLoc(l, v) {
    return l + v / 10;
  }
}

/**
 * whether value is between min and max
 * @param {number} min
 * @param {number} x
 * @param {number} max
 * @returns {bool}
 */
function isvaluemid(min, x, max) {
  return min <= x && x <= max;
}
/**
 *
 * @param {number} min
 * @param {number} x
 * @param {number} max
 * @returns {number} value between min and max
 */
function setchk(min, x, max) {
  return Math.max(Math.min(max, x), min) || 0;
}
// includes begin and end
function mathrandint(begin, end) {
  end++;
  if (0 < end - begin && end - begin < 1) return Math.floor(end);
  begin = Math.ceil(begin);
  end = Math.floor(end);
  if (end - begin < 0) return 0;
  return Math.min(Math.floor(Math.random() * (end - begin)) + begin, end - 1);
}

/**
 * make element draggable
 * @param {HTMLElement} elem element to be dragged
 */
function dragElement(elem) {
  const WIDTH = elem.parentElement.clientWidth;
  const HEIGHT = elem.parentElement.clientHeight;
  const width = elem.clientWidth;
  const height = elem.clientHeight;
  const parentOffsetLeft = elem.parentElement.offsetLeft;
  const parentOffsetTop = elem.parentElement.offsetTop;
  /** distance inside of the element between left and pointer-x when mousedown */
  let curOffsetX = 0;
  /** distance inside of the element between top and pointer-y when mousedown */
  let curOffsetY = 0;
  elem.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  /**
   *
   * @param {MouseEvent} e
   */
  function onMouseMove(e) {
    elem.style.left = `${setchk(
      0,
      // calc left point of element from pointer X by curOffsetX, and minus parent offset to calc point inside of parent
      e.clientX - curOffsetX - parentOffsetLeft,
      WIDTH - width
    )}px`;
    elem.style.bottom = `${setchk(
      0,
      // almost same as x but setting bottom, not top
      HEIGHT - (e.clientY - curOffsetY - parentOffsetTop) - height,
      HEIGHT - height
    )}px`;
  }
  /**
   *
   * @param {MouseEvent} e
   */
  function onMouseDown(e) {
    // pointer location of element, same as e.offsetX
    curOffsetX = e.clientX - elem.offsetLeft - parentOffsetLeft;
    curOffsetY = e.clientY - elem.offsetTop - parentOffsetTop;
    window.addEventListener("mousemove", onMouseMove);
  }
  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
  }
}

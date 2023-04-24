/**
 * @file a simple todo list
 * store todo in localStorage
 */
window.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("ul");
  const input = document.querySelector("input");
  const sbmtbtn = document.querySelector("button");
  sbmtbtn.addEventListener("click", () => {
    const todo = input.value;
    if (todo) {
      addTodo(todo);
      renderTodo();
      input.value = "";
    }
  });
  if (!localStorage.getItem("simpleTodo")) {
    setTodo({ item: [] });
  }
  renderTodo();

  /**
   * fill ul with li
   */
  function renderTodo() {
    delall(ul);
    const json = getTodo();
    for (let i = 0; i < json.item.length; ++i) {
      ul.appendChild(createLi(i, json.item[i]));
    }
  }
  /**
   * create li
   * @param {number} indx todo body index
   * @param {string} str todo body
   * @returns {HTMLLIElement} li with click event
   */
  function createLi(indx, str) {
    const ret = document.createElement("li");
    ret.textContent = str;
    ret.addEventListener("click", () => {
      onDel(indx);
    });
    return ret;
  }
  /**
   * remove at index and re-render
   * @param {number} indx todo body index to be deleted
   */
  function onDel(indx) {
    removeTodo(indx);
    renderTodo();
  }
  /**
   * get todo list item
   * @returns {{item:string[]}} todo body json
   */
  function getTodo() {
    return JSON.parse(localStorage.getItem("simpleTodo"));
  }
  /**
   * set local stoage
   * @param {{item:string[]}} json will be set to localStorage.simpleTodo
   */
  function setTodo(json) {
    localStorage.setItem("simpleTodo", JSON.stringify(json));
  }
  /**
   * add todo list item
   * @param {string} str todo body
   */
  function addTodo(str) {
    const json = getTodo();
    json.item.push(str);
    setTodo(json);
  }
  /**
   * remove todo list item by index
   * @param {number} indx
   */
  function removeTodo(indx) {
    const json = getTodo();
    json.item = deletevalue(json.item, indx);
    setTodo(json);
  }
  /**
   * copy array and delete item at index
   * @param {any[]} arr array
   * @param {number} indx index to be deleted
   * @returns {any[]} copy array whose item at index is deleted
   */
  function deletevalue(arr, indx) {
    let cp = arr.concat([]);
    cp.splice(indx, 1);
    return cp;
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

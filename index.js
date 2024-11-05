/*  
 list A: pool of available freelancers from which to populate the roster list.
 */
const pool = [
  { id: 1, name: "Dr. Slice", price: 25, occupation: "gardener" },
  { id: 2, name: "Dr. Pressure", price: 51, occupation: "programmer" },
  { id: 3, name: "Prof. Possibility", price: 43, occupation: "teacher" },
  { id: 4, name: "Prof. Prism", price: 81, occupation: "teacher" },
  { id: 5, name: "Dr. Impulse", price: 43, occupation: "teacher" },
  { id: 6, name: "Prof. Spark", price: 76, occupation: "programmer" },
  { id: 7, name: "Dr. Wire", price: 47, occupation: "teacher" },
  { id: 8, name: "Prof. Goose", price: 72, occupation: "driver" },
];

/*  
list B: roster, reflects displayed freelancers 
gets populated periodically from list A:pool 
 */
let roster = [
  { id: 9, name: "Alice Wonderland", price: 30, occupation: "writer" },
  { id: 10, name: "Bob Marley", price: 50, occupation: "teacher" },
];

/* get random freelancer from list: pool */
function getFreelancer() {
  const freelancer = pool[Math.floor(Math.random() * freelancers.length)];
  return freelancer;
}

/* start app */
function init() {
  initRoster();
}

/* 
starts an interval update of roster list + display list (html table).
note: interval update stops when list:pool of available freelancers is empty.
*/
function startRosterInterval() {
  console.log("start roster interval..");

  const intervalId = setInterval(() => {
    if (pool.length > 0) {
      getRandomRoster();
    } else {
      endRosterInterval(intervalId);
    }
  }, 3000);
}

/* end interval roster update */
function endRosterInterval(id) {
  clearInterval(id);
}

/* 
displays initial set of available freelancers.
starts roster interval update. 
*/
function initRoster() {
  roster.forEach((item, i) => {
    console.log(item);
    addRoster(item);
  });
  startRosterInterval();
}

/* 
randomly select a freelancer from list A, and move to list B. 
call: addRoster() to display new selection
*/
function getRandomRoster() {
  // use: splice() + array.concat() to update roster
  const random = Math.floor(Math.random() * pool.length) - 1;
  const arr = pool.splice(random, 1);
  roster = roster.concat(arr);
  addRoster(arr[0]);
}

/* 
add new freelancer to roster list
DOM: populates display table with row (tr) using html template.
@param {object} freelancer
*/
function addRoster(freelancer) {
  const table = document.querySelector("#roster-table tbody");
  const tableRow = cloneTableItem();
  tableRow.querySelector(".roster-item-name").innerHTML = freelancer.name;
  tableRow.querySelector(
    ".roster-item-price"
  ).innerHTML = `$${freelancer.price}`;
  tableRow.querySelector(".roster-item-occupation").innerHTML =
    freelancer.occupation;

  table.appendChild(tableRow);
  const avg = (document.querySelector(
    "#average-price"
  ).innerHTML = `$${getAveragePrice()}`);
}

/* clone table row element from html template 
@return {DOM element} row <tr> to populate with new freelancer data.
*/
function cloneTableItem() {
  const temp = document
    .getElementById("roster-item-template")
    .content.querySelector("tr");
  const el = document.importNode(temp, true);
  return el;
}

/* calculates average price of all freelancers in roster 
@return {integer}
*/
function getAveragePrice() {
  const avg =
    roster.reduce((total, item, i) => {
      total += item.price;
      return total;
    }, 0) / roster.length;
  return Math.round((avg * 100) / 100);
}

/* start main */
init();

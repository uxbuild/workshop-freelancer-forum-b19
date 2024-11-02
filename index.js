// pool of available freelancers from which to add
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
const max = pool.length;

// list roster, reflects listed freelancers, contains initial 2.
let roster = [
  { id: 9, name: "Alice Wonderland", price: 30, occupation: "writer" },
  { id: 10, name: "Bob Marley", price: 50, occupation: "teacher" },
];

// get random freelancer from list: pool
function getFreelancer() {
  const freelancer = pool[Math.floor(Math.random() * freelancers.length)];
  return freelancer;
}

// start
function init() {
  console.log("freelance forum init..");
  initRoster();
}

//starts interval roster update.
// note: the intervals will stop when all freelancers in pool have been added to roster (displayed).
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

// end interval roster update.
function endRosterInterval(id) {
  clearInterval(id);
}

// iterates through roster list and populates, call to start roster update.
function initRoster() {
  roster.forEach((item, i) => {
    console.log(item);
    addRoster(item);
  });
  startRosterInterval();
}

// pull a random freelancer object from list:pool and adds it to roster.
function getRandomRoster() {
  // use: splice() + array.concat() to update roster
  const random = Math.floor(Math.random() * pool.length) - 1;
  const arr = pool.splice(random, 1);
  roster = roster.concat(arr);
  addRoster(arr[0]);
}

// add new freelancer to roster
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

// clones table row element from html template
function cloneTableItem() {
  const temp = document
    .getElementById("roster-item-template")
    .content.querySelector("tr");
  temp.querySelector(".roster-item-name").innerHTML = "poo!";
  const el = document.importNode(temp, true);
  return el;
}

function getAveragePrice() {
  console.log(`getAveragePrice, roster size: ${roster.length}`);

  const avg =
    roster.reduce((total, item, i) => {
      total += item.price;
      return total;
    }, 0) / roster.length;
  return Math.round((avg * 100) / 100);
}

function endRoster() {
  clearInterval(intervalId);
}

// start main
init();
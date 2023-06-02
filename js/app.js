const notesEl = document.querySelector(".notes");
const addBtn = document.querySelector(".note-add");
const ntsBtn = document.querySelector(".note-notes");
const favBtn = document.querySelector(".note-favorites");
const optBtn = document.querySelector(".note-options");
const delBtn = document.querySelector(".note-deleted");
const proBtn = document.querySelector(".note-profile");
let colors = ["info", "success", "warning", "danger", "dark", "primary"];

function createNote(title, text) {
  const noteEl = document.createElement("div");
  noteEl.classList.add("note");
  let rand = Math.round(Math.random() * 5);
  noteEl.innerHTML = `
    <div class="mb-3">
      <div class="card note-header border-${colors[rand]}">
        <div class="card-header text-bg-${colors[rand]}">
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h4 class="card-title" id="note-title">${title}</h4>
            </div>
            <div class="col-auto">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-sm btn-outline-primary note-edit" title="Изменить"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-sm btn-outline-warning note-favorite" title="В избранное"><i class="fa-solid fa-star"></i></button>
                <button class="btn btn-sm btn-outline-danger note-delete" title="Удалить"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
          <p id="note-text">${text}</p>
          <textarea id="note-title-input" placeholder="Заголовок" class="hidden" action="db.php"></textarea>
          <textarea id="note-textarea" placeholder="Ваш текст" class="hidden" action="db.php"></textarea>
          <input type="file" style="margin-top:17px"></p>
        </div>
      </div>
    </div>
  `;

  const editBtn = noteEl.querySelector(".note-edit");
  const favBtn = noteEl.querySelector(".note-favorite");
  const deleteBtn = noteEl.querySelector(".note-delete");
  const titleEl = noteEl.querySelector("#note-title");
  const textEl = noteEl.querySelector("#note-text");
  const titleInputEl = noteEl.querySelector("#note-title-input");
  const textInputEl = noteEl.querySelector("#note-textarea");

  editBtn.addEventListener("click", (e) => {
    titleEl.classList.toggle("hidden");
    textEl.classList.toggle("hidden");

    titleInputEl.classList.toggle("hidden");
    textInputEl.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", (e) => {
    noteEl.remove();
  });

  titleInputEl.addEventListener("input", (e) => {
    titleEl.innerText = e.target.value;
  });

  textInputEl.addEventListener("input", (e) => {
    textEl.innerText = e.target.value;
  });

  return noteEl;
}

addBtn.addEventListener("click", (e) => {
  const el = createNote("Заголовок", "Ваш текст");
  notesEl.appendChild(el);
});

var Cal = function (divId) {
  this.divId = divId;
  this.DaysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  this.Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};

Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
};

Cal.prototype.showMonth = function (y, m) {
  var d = new Date(),
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = "<table>";
  html += "<thead><tr>";
  html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
  html += "</tr></thead>";
  html += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    html += "<td>" + this.DaysOfWeek[i] + "</td>";
  }
  html += "</tr>";
  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();
    if (dow == 1) {
      html += "<tr>";
    } else if (i == 1) {
      html += "<tr>";
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + "</td>";
    } else {
      html += '<td class="normal">' + i + "</td>";
    }
    if (dow == 0) {
      html += "</tr>";
    } else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);
  html += "</table>";
  document.getElementById(this.divId).innerHTML = html;
};

window.onload = function () {
  var c = new Cal("divCal");
  c.showcurr();
  getId("btnNext").onclick = function () {
    c.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    c.previousMonth();
  };
};
function getId(id) {
  return document.getElementById(id);
}

function getDate() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("timedisplay").innerHTML =
    hours + ":" + minutes + ":" + seconds;
}
setInterval(getDate, 0);

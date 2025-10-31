const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const list = document.getElementById("list");

let active = null; // currently speaking person
let timerFlag = null;  // global interval timer

function addSpeaker() {
  const name = input.value.trim();
  if (!name) return;
  input.value = "";

  const li = document.createElement("li");
  const timeSpan = document.createElement("span");
  const toggleBtn = document.createElement("button");

  let seconds = 0;
  timeSpan.textContent = "0 s";
  toggleBtn.textContent = "Start";

  toggleBtn.onclick = () => {
    if (active && active !== li) {
      active.querySelector("button").textContent = "Start";
    }
    if (active === li) {
      stopTimer();
      toggleBtn.textContent = "Start";
      active = null;
    } else { //start this
      if (timerFlag) stopTimer();
      active = li;
      toggleBtn.textContent = "Stop";
      timerFlag = setInterval(() => {
        seconds++;
        timeSpan.textContent = seconds + " s";
      }, 1000);
    }
  };

  li.textContent = name + ": ";
  li.append(timeSpan, " ", toggleBtn);
  list.appendChild(li);
}

function stopTimer() {
  clearInterval(timerFlag);
  timerFlag = null;
}

addBtn.onclick = addSpeaker;

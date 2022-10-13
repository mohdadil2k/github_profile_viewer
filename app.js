const endpoint = "https://api.github.com/users/";

const main_div = document.createElement("div");
const child_div1 = document.createElement("div");
const child_div2 = document.createElement("div");

const input_text = document.createElement("input");
const input_submit = document.createElement("input");

const body = document.querySelector("body");

function fetchData() {
  if(child_div2.innerText) {
    child_div2.innerText=""
  }
  fetch(`${endpoint}${input_text.value}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      alert(`${res.status} not found`);
    })
    .then((data) => showDetails(data));
}

function showDetails(data) {
  const detailsToShow = [
    "name",
    "location",
    "email",
    "public_repos",
    "bio",
    "following",
    "followers",
    "login",
    "created_at",
    "twitter_username",
  ];

  for (let key of detailsToShow) {
    const p = document.createElement("p");
    if (key == "created_at") {
      let createdAt = data[key];
      const [date, time] = createdAt.split("T");
      p.innerText = ` ${key.toUpperCase()}: ${date} `;
      child_div2.append(p);
    } else {
      p.innerText = ` ${key.toUpperCase()} : ${data[key]} `;
      child_div2.append(p);
    }
  }
}

function submit(e) {
  if (e.key != "Enter") return;
  if (!input_text.value.trim()) return alert(`Input Field Can't Be Empty`);
  return fetchData();
}

function createUi() {
  input_text.placeholder = "search a github a user";
  input_text.focus = "autofocus";
  input_text.type = "text";
  input_text.classList.add("input-text");

  console.log(input_text.classList);
  input_submit.classList.add("submit-btn");
  input_submit.type = "submit";

  child_div1.append(input_text, input_submit);

  main_div.classList.add("container");
  child_div1.classList.add("search-input");
  child_div2.classList.add("user-details");

  main_div.append(child_div1, child_div2);
  body.append(main_div);
}
input_text.addEventListener("keydown", submit);
input_submit.addEventListener("click", fetchData);
window.addEventListener("DOMContentLoaded", createUi);

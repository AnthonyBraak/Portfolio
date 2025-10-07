let outName = document.getElementById("out-name");
let outAge = document.getElementById("out-age");
let background = document.querySelector(".character");
let container = document.getElementById("dropdown-container");
let image = document.getElementById("char-img");

let select = document.createElement("select");
select.id = "imgDropdown";

let options = ["neutral", "masculine", "feminine"];

options.forEach((text) => {
  let option = document.createElement("option");
  option.value = text;
  option.text = text;
  select.appendChild(option);
});

container.appendChild(select);

function create() {
  let character = {
    name: document.getElementById("char-name").value,
    age: document.getElementById("char-birth").value,
    color: document.getElementById("char-color").value,
  };
  outName.innerText = character.name;
  outAge.innerText = character.age;
  background.style.backgroundColor = character.color;

  if (select.value === "masculine") {
    image.src = "./images/male.png";
  } else if (select.value === "feminine") {
    image.src = "./images/female.png";
  } else {
    image.src = "./images/neutral.png";
  }
}

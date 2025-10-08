const outName = document.getElementById("out-name");
const outAge = document.getElementById("out-age");
const background = document.querySelector(".character");
const container = document.getElementById("dropdown-container");
const image = document.getElementById("char-img");

const select = document.createElement("select");
select.id = "imgDropdown";

const options = ["neutral", "masculine", "feminine"];

options.forEach((text) => {
  const option = document.createElement("option");
  option.value = text;
  option.text = text;
  select.appendChild(option);
});

container.appendChild(select);

function create() {
  const character = {
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

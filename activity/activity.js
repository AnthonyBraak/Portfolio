const imgEl = document.getElementById("img-container");

// get a random picture of one or more dogs from the internet
async function getDogs() {
  fetch("https://apis.scrimba.com/dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => {
      const imageElement = document.createElement("img");
      imageElement.src = data.message;
      imageElement.alt = "random dog picture";
      imgEl.appendChild(imageElement);
    });
}

//gives a random activity
async function getSuggestion() {
  const response = await fetch("https://apis.scrimba.com/bored/api/activity");
  const data = await response.json();
  console.log(data);
  const activityText = document.getElementById("activity-text");
  activityText.textContent = `${data.activity}. That's some kind of ${
    data.type
  } activity where you need ${data.participants} people and pay $${
    data.price * 100
  }.`;
}
getDogs();
getSuggestion();
function newAction() {
  getSuggestion();
}
function newDog() {
  imgEl.removeChild(imgEl.firstElementChild);
  getDogs();
}

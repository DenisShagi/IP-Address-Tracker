const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_GmBLQD3OaLBs27ao2Gqd88eAUwbWu&ipAddress=${ipInput.value}`
  )
    .then((response) => response.json())
    .then(console.log);
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

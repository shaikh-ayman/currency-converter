const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdown = document.querySelectorAll(".DROPDOWN select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg ");

for (let select of dropdown) {
  for (let currcode in countryList) {
    let option = document.createElement("option");
    option.value = currcode;
    option.innerText = currcode;
    if (currcode === "USD" && select.name === "from") {
      option.selected = "selected";
    }
    else if (currcode === "INR" && select.name === "to") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  })
}

const changeFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

const updateExchangRate = async () => {
  let amount = document.querySelector(".amt input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  let URL = `${baseUrl}/${from.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
  let finalamt = amtval * rate;
  msg.innerText = `${amtval} ${from.value}  =  ${finalamt} ${to.value}`;

}
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangRate();
})
window.addEventListener("load", () => {
  updateExchangRate();
})
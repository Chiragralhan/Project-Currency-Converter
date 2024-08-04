const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Define updateFlag function
const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `https://v6.exchangerate-api.com/v6/d40dcedb00f6fbfedfef0acd/latest/USD`;
    let resp = await fetch(URL);
    let data = await resp.json();

    let fromExchangeRate = data.conversion_rates[fromCurr.value];
    let toExchangeRate = data.conversion_rates[toCurr.value];

    const converted = (amtVal / fromExchangeRate) * toExchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${converted.toFixed(2)} ${toCurr.value}`;
    
};

// Fetch exchange rates and calculate conversion
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
// currency rate update as soon as the page loads
window.addEventListener("load",()=>{
    updateExchangeRate();
});
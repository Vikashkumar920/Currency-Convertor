const countryList = {
  AED:"AE", AFN:"AF", ALL:"AL", AMD:"AM", AUD:"AU", BDT:"BD", BGN:"BG",
  BRL:"BR", CAD:"CA", CHF:"CH", CNY:"CN", DKK:"DK", EGP:"EG", EUR:"FR",
  GBP:"GB", HKD:"HK", IDR:"ID", ILS:"IL", INR:"IN", JPY:"JP", KRW:"KR",
  KWD:"KW", LKR:"LK", MXN:"MX", MYR:"MY", NGN:"NG", NOK:"NO", NPR:"NP",
  NZD:"NZ", OMR:"OM", PHP:"PH", PKR:"PK", PLN:"PL", QAR:"QA", RUB:"RU",
  SAR:"SA", SEK:"SE", SGD:"SG", THB:"TH", TRY:"TR", TWD:"TW", USD:"US",
  ZAR:"ZA"
};

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const btn = document.getElementById("btn");

// Populate dropdowns
for (let code in countryList) {
  fromCurrency.innerHTML += `<option value="${code}">${code}</option>`;
  toCurrency.innerHTML += `<option value="${code}">${code}</option>`;
}

fromCurrency.value = "INR";
toCurrency.value = "AUD";

// Update flag
function updateFlag(select, img) {
  img.src = `https://flagcdn.com/w40/${countryList[select.value].toLowerCase()}.png`;
}

updateFlag(fromCurrency, fromFlag);
updateFlag(toCurrency, toFlag);

fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));

// Swap currencies
document.getElementById("swap").addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
});

// 🔥 BUTTON CLICK — GUARANTEED WORKING
btn.addEventListener("click", async () => {
  let amt = amount.value || 1;
  let from = fromCurrency.value;
  let to = toCurrency.value;

  try {
    const url = `https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`;
    const response = await fetch(url);
    const data = await response.json();

    const converted = data.rates[to];
    result.innerText = `${amt} ${from} = ${converted.toFixed(5)} ${to}`;
  } catch (err) {
    result.innerText = "Error fetching exchange rate";
  }
});

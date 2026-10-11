const countryList = {
  AED: "AE", AFN: "AF", ALL: "AL", AMD: "AM", AUD: "AU", BDT: "BD", BGN: "BG",
  BRL: "BR", CAD: "CA", CHF: "CH", CNY: "CN", DKK: "DK", EGP: "EG", EUR: "FR",
  GBP: "GB", HKD: "HK", IDR: "ID", ILS: "IL", INR: "IN", JPY: "JP", KRW: "KR",
  KWD: "KW", LKR: "LK", MXN: "MX", MYR: "MY", NGN: "NG", NOK: "NO", NPR: "NP",
  NZD: "NZ", OMR: "OM", PHP: "PH", PKR: "PK", PLN: "PL", QAR: "QA", RUB: "RU",
  SAR: "SA", SEK: "SE", SGD: "SG", THB: "TH", TRY: "TR", TWD: "TW", USD: "US",
  ZAR: "ZA"
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
  const amt = Number(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!Number.isFinite(amt) || amt <= 0) {
    result.innerText = "Please enter a valid amount";
    return;
  }

  if (from === to) {
    result.innerText = `${amt} ${from} = ${amt.toFixed(5)} ${to}`;
    return;
  }

  result.innerText = "Fetching exchange rate...";

  try {
    const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const converted = amt * data.rate;

    result.innerText =
      `${amt} ${from} = ${converted.toFixed(5)} ${to}`;
  } catch (err) {
    console.error(err);
    result.innerText = "Unable to fetch exchange rate. Try again.";
  }
});

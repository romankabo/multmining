// import axios from "axios";
let selectedCurrency = "DGB";
let hashRate = 0;
let miners;
function selectedCurrencyChanged(e) {
  selectedCurrency = e.target.value;
  document.getElementById("startMiningToday").innerHTML = `${selectedCurrency}`;
  console.log(e.target.value);
}

if (getCookie("investorWallet") || getCookie("investorWalletTicker")) {
  document.getElementById("loginOrDashBoard").innerHTML = `<a href="/dashboard" class="btn btn--transparent btn--header">Dashboard</a>`;

}

let DGBMiner;

//get referral data from url
(async function() {
  let ref = getUrlParams(window.location.href);
  console.log(ref);
  if (ref) {
    let refcoin = ref.substring(0, 3);
    ref = ref.substring(3);
    if (!ref.includes("/")) {
      setCookie("ref", ref, 7);
      setCookie("refcoin", refcoin, 7);
    }
  }
})();

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

(async function() {
  let ref = getCookie("ref");
  let refcoin = getCookie("refcoin");
  if (ref && refcoin) {
    console.log(ref);
    console.log(refcoin);
  }

  // const axios = require("axios");
  miners = await axios.get("/get/minerhashrates");
  console.log("miners");
  console.log(miners);

  //DGB data
  DGBMiner = miners.data.DGBMiner;
  let dailyPercentageDGB = math.eval(
    `(100* ${DGBMiner.hourlyRewardPerMhs} * 24)/${DGBMiner.mhsPriceInDGB}`
  );
  dailyPercentageDGB = parseFloat(dailyPercentageDGB).toFixed(8);
  document.getElementById("DGBDifficulty").innerHTML = `${DGBMiner.difficulty}`;
  document.getElementById("DGBhourlyreward").innerHTML = `${parseFloat(
    DGBMiner.hourlyRewardPerMhs * 24
  ).toFixed(8)} DGB`;
  document.getElementById("DGBmhsprice").innerHTML = `${parseFloat(
    DGBMiner.mhsPriceInDGB
  ).toFixed(8)} DGB`;
  document.getElementById(
    "dailyPercentage"
  ).innerHTML = `${dailyPercentageDGB}%`;

  //BTC data
  let BTCMiner = miners.data.BTCMiner;
  let dailyPercentageBTC = math.eval(
    `(100* ${BTCMiner.hourlyRewardPerGhs} * 24)/${BTCMiner.ghsPriceInBTC}`
  );
  dailyPercentageBTC = parseFloat(dailyPercentageBTC).toFixed(8);
  document.getElementById("BTCDifficulty").innerHTML = `${BTCMiner.difficulty}`;
  document.getElementById("BTChourlyreward").innerHTML = `${parseFloat(
    BTCMiner.hourlyRewardPerGhs * 24
  ).toFixed(8)} BTC`;
  document.getElementById("BTCmhsprice").innerHTML = `${parseFloat(
    BTCMiner.ghsPriceInBTC
  ).toFixed(8)} BTC`;
  document.getElementById(
    "BTCdailyPercentage"
  ).innerHTML = `${dailyPercentageBTC}%`;
  
  //LTC data
  let LTCMiner = miners.data.LTCMiner;
  console.log(LTCMiner);
  let dailyPercentageLTC = math.eval(
    `(100* ${LTCMiner.hourlyRewardPerGhs} * 24)/${LTCMiner.ghsPriceInLTC}`
  );
  dailyPercentageLTC = parseFloat(dailyPercentageLTC).toFixed(8);
  document.getElementById("LTCDifficulty").innerHTML = `${LTCMiner.difficulty}`;
  document.getElementById("LTChourlyreward").innerHTML = `${parseFloat(
    LTCMiner.hourlyRewardPerGhs * 24
  ).toFixed(8)} LTC`;
  document.getElementById("LTCmhsprice").innerHTML = `${parseFloat(
    LTCMiner.ghsPriceInLTC
  ).toFixed(8)} LTC`;
  document.getElementById(
    "LTCdailyPercentage"
  ).innerHTML = `${dailyPercentageLTC}%`;

  //BCH data
  let BCHMiner = miners.data.BCHMiner;
  let dailyPercentageBCH = math.eval(
    `(100* ${BCHMiner.hourlyRewardPerGhs} * 24)/${BCHMiner.ghsPriceInBCH}`
  );
  dailyPercentageBCH = parseFloat(dailyPercentageBCH).toFixed(8);
  document.getElementById("BCHDifficulty").innerHTML = `${BCHMiner.difficulty}`;
  document.getElementById("BCHhourlyreward").innerHTML = `${parseFloat(
    BCHMiner.hourlyRewardPerGhs * 24
  ).toFixed(8)} BCH`;
  document.getElementById("BCHmhsprice").innerHTML = `${parseFloat(
    BCHMiner.ghsPriceInBCH
  ).toFixed(8)} BCH`;
  document.getElementById(
    "BCHdailyPercentage"
  ).innerHTML = `${dailyPercentageBCH}%`;
})();

function calculateRevenue(e) {
  switch (selectedCurrency) {
    case "DGB":
      let DGBhourlyRewardPerMhs = DGBMiner.hourlyRewardPerMhs || 0;
      document.getElementById(
        "calculateText"
      ).innerHTML = `${hashRate}GH/s of DGB mining gives<br> ${parseFloat(
        DGBhourlyRewardPerMhs * hashRate
      ).toFixed(
        8
      )} DGB hourly<br>Will change based on mining difficulty<p> Calculator updates hourly to reflect difficulty changes`;
      document.getElementById(
        "priceOfMining"
      ).innerHTML = `1GH/s of DGB mining costs ${
        DGBMiner.mhsPriceInDGB
      }DGB/year <p>Price updated daily based on market demand and supply.`;
      break;
    case "BTC":
      let BTCMiner = miners.data.BTCMiner;
      let BTChourlyRewardPerGhs = BTCMiner.hourlyRewardPerGhs || 0;
      document.getElementById(
        "calculateText"
      ).innerHTML = `${hashRate}TH/s of BTC mining gives<br> ${BTChourlyRewardPerGhs *
        hashRate} BTC hourly<br>Will change based on mining difficulty<p> Calculator updates hourly to reflect difficulty changes`;
      document.getElementById(
        "priceOfMining"
      ).innerHTML = `1TH/s of BTC mining costs ${
        BTCMiner.ghsPriceInBTC
      }BTC /year<p>Price updated daily based on market demand and supply.`;
      break;
    case "LTC":
      let LTCMiner = miners.data.LTCMiner;
      let LTChourlyRewardPerGhs = LTCMiner.hourlyRewardPerGhs || 0;
      document.getElementById(
        "calculateText"
      ).innerHTML = `${hashRate}GH/s of LTC mining gives<br> ${LTChourlyRewardPerGhs *
        hashRate} LTC hourly<br>Will change based on mining difficulty<p> Calculator updates hourly to reflect difficulty changes`;
      document.getElementById(
        "priceOfMining"
      ).innerHTML = `1GH/s of BTC mining costs ${
        LTCMiner.ghsPriceInLTC
      }LTC /year<p>Price updated daily based on market demand and supply.`;
      break;
    case "BCH":
      let BCHMiner = miners.data.BCHMiner;
      let BCHhourlyRewardPerGhs = BCHMiner.hourlyRewardPerGhs || 0;
      document.getElementById(
        "calculateText"
      ).innerHTML = `${hashRate}TH/s of BCH mining gives<br> ${BCHhourlyRewardPerGhs *
        hashRate} BCH hourly<br>Will change based on mining difficulty<p> Calculator updates hourly to reflect difficulty changes`;
      document.getElementById(
        "priceOfMining"
      ).innerHTML = `1TH/s of BCH mining costs ${
        BCHMiner.ghsPriceInBCH
      }BCH /year<p>Price updated daily based on market demand and supply.`;
      break;
  }
}

function changeHashrateAmount(e) {
  hashRate = e.target.value;
}

function getUrlParams(search) {
  return search.substr(search.lastIndexOf("?") + 1);
}

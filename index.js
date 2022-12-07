document.querySelector("button").addEventListener("click", getWeather);

function getBackground() {
   getQuote()
   fetch("https://api.unsplash.com/photos/random?client_id=PGR3m4IhJwRziQDAarEDZxFC201BpNQ68y026rYEn-I&orientation=landscape&query=nature")
      .then((resp) => resp.json())
      .then((data) => {
         document.body.style.backgroundImage = `url(${data.urls.full})`;
         document.getElementById("author").innerHTML = `By: <a href="${data.user.links.html}" target="_blank">${data.user.username}</a>`;
      })
      .catch((err) => {
         console.log(err + " :Cannot send anymore requests. Try again later. (Refreshes every hour)")
         document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
         document.getElementById("author").innerHTML = `By: <a href="https://unsplash.com/@dodiachmad" target="_blank">dodiachmad</a>`;
      });
}


function getWeather() {
   getBackground()
   const location = document.getElementById("search-input").value;
   fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location.replace(
         " ",
         "+"
      )}&units=metric&appid=16712e942c2fcb053e119f0e6ae2ae55`
   )
      .then((resp) => resp.json())
      .then((data) => {
         const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
         document.getElementById("weather-section").innerHTML = `
      <div class="head">
               <p class="head">${location} <img class="main-icon" src="${iconUrl}"></p>
            </div>
            <p class="temp">${Math.round(data.main.temp)}°C | ${Math.round(data.main.temp*(9/5)+32)}°F</p>
            <p class="extras">Humidity: ${data.main.humidity}% <img src="images/humidity.png" /></p>
            <p class="extras">Wind: ${Math.round(data.wind.speed*3.6)} km/h <img src="images/wind.png" /></p>
            <p class="extras">Visibility: ${data.visibility/1000} km <img src="images/visible.png"/></p>
            <p class="extras">Weather: ${data.weather[0].main} <img src="images/smoke.png" /></p>`;
      })
      .catch(err => {
         console.log(err)
         document.getElementById("weather-section").innerHTML = `
      <div class="head">
               <p class="head">Mumbai <img class="main-icon" src="images/weather-icon.png"></p>
            </div>
            <p class="temp">28°C | 82°F</p>
            <p class="extras">Humidity: 60% <img src="images/humidity.png" /></p>
            <p class="extras">Wind: 17 km/h <img src="images/wind.png" /></p>
            <p class="extras">Visibility: 2.5 km <img src="images/visible.png"/></p>
            <p class="extras">Weather: Smoke <img src="images/smoke.png" /></p>`;
      })
}


function getQuote() {
   fetch("https://api.quotable.io/random")
      .then((resp) => resp.json())
      .then((data) => {
         document.getElementById("quote").innerText = `${data.content}`;
      })
      .catch((err) => {
         console.log(err)
         document.getElementById("quote").innerText = `The way to get started is to quit talking and begin doing.`
      });
}


function getCryptoData() {
   fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin&vs_currencies=usd"
   )
      .then((resp) => resp.json())
      .then((data) => {
         document.getElementById("crypto-section").innerHTML += `
            <ul>
                <li><p class="btc">Bitcoin: $${data.bitcoin.usd}</p></li>
                <li><p class="eth">Ethereum: $${data.ethereum.usd}</p></li>
                <li><p class="ltc">Litecoin: $${data.litecoin.usd}</p></li>
            </ul>`;
      })
      .catch(err => {
         console.log(err)
         document.getElementById("crypto-section").innerHTML += `
            <ul>
                <li><p class="btc">Bitcoin: $17500</p></li>
                <li><p class="eth">Ethereum: $1300</p></li>
                <li><p class="ltc">Litecoin: $85</p></li>
            </ul>`;
      })
}


function getCurrentTime() {
   const date = new Date();
   document.getElementById("timer").textContent = date.toLocaleTimeString(
      "en-us",
      { hour: "2-digit", minute: "2-digit", second: "2-digit" }
   );
}

setInterval(getCurrentTime, 1000);
getCryptoData();
getWeather();
getQuote();

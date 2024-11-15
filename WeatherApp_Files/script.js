let isCelsius = true; // початковий стан в Цельсіях
let currentCity = ''; // змінна для зберігання назви поточного міста

async function getWeather(city = null) {
    if(city){
        currentCity = city;
    }else if(!currentCity){
        alert("Будь ласка, введіть назву міста");
        return;
    }
        

    const apiKey = "4f70c532cd37606000c3d68f88ae0e24"; 
    const units = isCelsius ? `metric` : `imperial`; // Вибір одиниці
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}&lang=uk`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Місто не знайдено");
      }
  
      const data = await response.json();
      displayWeather(data);

      // Показуєм кнопку для перемикання одиниць
      document.getElementById("toggle-units-button").style.display = "block";

      // Змінюємо фон залежно від основного стану погоди
    setWeatherBackground(data.weather[0].main);

    } catch (error) {
      alert(`Помилка: ${error.message}`);
    }
  }

  function displayWeather(data) {
    const temperatureUnit = isCelsius ? '°C' : '°F';
    document.getElementById("city-name").innerText = `Місто: ${data.name}`;
    document.getElementById("temperature").innerText = `Температура: ${data.main.temp.toFixed(2)}${temperatureUnit}`;
    document.getElementById("description").innerText = `Опис: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `Вологість: ${data.main.humidity}%`;

    // Додаємо іконку погоди
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const weatherIcon = document.getElementById("weather-icon");

  weatherIcon.src = iconUrl;
  weatherIcon.style.display = "block"; // Показуємо іконку

  // Додаємо анімацію для weather-info
  const weatherInfo = document.querySelector('.weather-info');
  weatherInfo.classList.remove('show');
  void weatherInfo.offsetWidth;
  weatherInfo.classList.add('show');
  }  


  // Функція для перемикання градусів
  function toggleUnits(){
    isCelsius = !isCelsius;
    getWeather(); 
  }



  // Функція для зміни відео фону залежно від стану погоди
function setWeatherBackground(weatherMain) {
  const backgroundVideo = document.getElementById("background-video");

  switch (weatherMain.toLowerCase()) {
    case 'clear':
      backgroundVideo.src = 'videos/clear.mp4';
      break;
    case 'clouds':
      backgroundVideo.src = 'videos/cloudy.mp4';
      break;
    case 'rain':
    case 'drizzle':
      backgroundVideo.src = 'videos/rain.mp4';
      break;
    case 'snow':
      backgroundVideo.src = 'videos/snow.mp4';
      break;
    case 'thunderstorm':
      backgroundVideo.src = 'videos/thunderstorm.mp4';
      break;
    case 'mist':
    case 'fog':
      backgroundVideo.src = 'videos/mist.mp4';
      break;
    default:
      backgroundVideo.src = 'videos/default.mp4';
      break;
  }

  // Оновлюємо відео
  backgroundVideo.load();
}
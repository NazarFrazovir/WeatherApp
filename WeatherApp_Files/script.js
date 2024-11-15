async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "4f70c532cd37606000c3d68f88ae0e24"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Місто не знайдено або помилка підключення до OpenWeatherMap API");
      }
  
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      alert(`Помилка: ${error.message}`);
    }
  }

  function displayWeather(data) {
    document.getElementById("city-name").innerText = `Місто: ${data.name}`;
    document.getElementById("temperature").innerText = `Температура: ${data.main.temp}°C`;
    document.getElementById("description").innerText = `Опис: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `Вологість: ${data.main.humidity}%`;
  }  
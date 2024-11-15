async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "4f70c532cd37606000c3d68f88ae0e24"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Місто не знайдено");
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

    // Додаємо іконку погоди
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const weatherIcon = document.getElementById("weather-icon");

  weatherIcon.src = iconUrl;
  weatherIcon.style.display = "block"; // Показуємо іконку

  // Додаємо анімацію для weather-info
  const weatherInfo = document.querySelector('.weather-info');

  // Видаляємо клас .show і додаємо його з невеликою затримкою для перезапуску анімації
  weatherInfo.classList.remove('show');
  setTimeout(() => {
    weatherInfo.classList.add('show');
  }, 50);
  }  
const form = document.querySelector('form')
const cityInput = document.querySelector('#city')
const weatherDiv = document.querySelector('#weather')

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const city = cityInput.value;
    const apiKey = '7638ce4dd56d88fb36b184d10c1b1fc2'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data =>
        {
            console.log(data.main.temp);
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const windDirection = data.wind.deg;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            weatherDiv.innerHTML =  `
            <p>${city}:</p>
            <p>Temp:${temperature}°C</p>
            <p>Condition: ${description}</p>

            `;
            
            console.log("Data fetched.");
            console.log(data);  
 
        })
        .catch(error =>
        {
            console.log(error);
            weatherDiv.innerHTML = `Could not fetch data from ${city}, touch grass`;
        });

});


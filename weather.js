const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    var city = data.city;
    fetchWeatherCurrent(city);
});

async function fetchWeatherCurrent (city) {
    const apiKey = '42c62cfd4be5453ebf693903240406';
    const url = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city +'';
    
    try {
        const response = await fetch(url, {mode: 'cors'});
        const responseData = await response.json();

        console.log(responseData);
        updateDisplay(responseData);
        document.getElementById('errorMessage').textContent = '';
    } catch(err) {
        document.getElementById('errorMessage').textContent = 'City not found.';
    }

}

function updateDisplay(responseData) {
    // location details
    const city = responseData.location.name;
    const country = responseData.location.country;
    const datetime = responseData.location.localtime;
    document.getElementById('city').textContent = city;
    document.getElementById('country').textContent = country;
    document.getElementById('datetime').textContent = datetime;

    // current weather details: all presented in celsius
    const temp = responseData.current.temp_c;
    const feelslike = responseData.current.feelslike_c;
    const conditionText = responseData.current.condition.text; 
    const conditionIcon = responseData.current.condition.icon;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('feelslike').textContent = feelslike;
    document.getElementById('condition').textContent = conditionText;
    document.querySelector('img').src = conditionIcon;

    // current weather details: miscellaneous
    const wind = responseData.current.wind_kph;
    const humidity = responseData.current.humidity;
    const visibility = responseData.current.vis_km;
    const pressure = responseData.current.pressure_mb;
    const dewpoint = responseData.current.dewpoint_c;
    document.getElementById('wind').textContent = wind + ' km/h';
    document.getElementById('humidity').textContent = humidity + '%';
    document.getElementById('visibility').textContent = visibility + ' km';
    document.getElementById('pressure').textContent = pressure + ' mb';
    document.getElementById('dewpoint').textContent = dewpoint + ' °C';
}

fetchWeatherCurrent('Manila');
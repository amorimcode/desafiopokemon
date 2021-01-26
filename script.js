
function getWeather(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2adf549400eb9c35662f525b64b1c89a`);
}
function getPokemon(type) {
    return fetch(`https://pokeapi.co/api/v2/type/${type}`)
}

const form = document.querySelector('#weather_form');
form.addEventListener("submit", el => {
    el.preventDefault();
})

async function doSubmit() {
    const city = document.querySelector('#city');
    const weather_el = document.querySelector('#result');
    console.log(city.value)
    weather_el.innerHTML = '<div class="spinner-grow" role="status" ><span></span></div>'

    try {
        const weatherResponse = await getWeather(city.value);
        const weatherData = await weatherResponse.json();
        const weatherMain = weatherData.weather[0].main
        const temperature = (weatherData.main.temp - 273.15).toFixed(2);
        console.log(weatherData.weather[0].main);
        console.log(temperature);

        var type;
        // var isRaining

        if (weatherMain == 'Rain') {
            type = 'electric'
            isRaining = 'Sim 🌧️'
            console.log(type)
        } else {
            if (temperature < 5) {
                type = 'ice'
                isRaining = 'Não ❌'
                console.log(type);
            } else if (temperature >= 5 && temperature < 10) {
                type = 'water'
                isRaining = 'Não ❌'
                console.log(type);
            } else if (temperature >= 12 && temperature < 15) {
                type = 'grass'
                isRaining = 'Não ❌'
                console.log(type)
            } else if (temperature >= 15 && temperature < 21) {
                type = 'ground'
                isRaining = 'Não ❌'
                console.log(type)
                //temp 22?
            } else if (temperature >= 23 && temperature < 27) {
                type = 'bug'
                isRaining = 'Não ❌'
                console.log(type)
            } else if (temperature >= 27 && temperature < 33) {
                type = 'rock'
                isRaining = 'Não ❌'
                console.log(type)
            } else if (temperature > 33) {
                type = 'fire'
                console.log(type)
            } else {
                type = 'normal'
                isRaining = 'Não ❌'
                console.log(type)
            }
        }
        const pokemonResponse = await getPokemon(type)
        const pokemonData = await pokemonResponse.json();
        const pokemonName = pokemonData.pokemon[Math.floor(Math.random() * pokemonData.pokemon.length)].pokemon.name
        console.log(pokemonName)
        let result = document.getElementById('result')
        result.innerHTML = `Temperatura: ${temperature}ºC 🌡️ \n Está chovendo? ${isRaining} \n Pokemon: ${pokemonName}`



    } catch (err) {
        console.log(err);
    }
}

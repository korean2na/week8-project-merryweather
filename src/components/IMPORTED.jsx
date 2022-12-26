// FORMATS
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// https://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}

// EXAMPLES
// https://api.openweathermap.org/geo/1.0/direct?q=houston,tx,us&limit=5&appid=5a16a8c096c6d9a7ad2dc7550df0b025

// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=5a16a8c096c6d9a7ad2dc7550df0b025

const apiKey = '5a16a8c096c6d9a7ad2dc7550df0b025'

let info = {
    cityName: '',
    zipCode: '',
    country: '',
    tempF: 0,
    tempC: 0,
    tempLowF: 0,
    tempLowC: 0,
    tempHighF: 0,
    tempHighC: 0,
    forecast: '',
    forecastDetails: '',
    humidity: 0,
    windMPH: 0,
    windKMPH: 0,
}

const locationEl = document.getElementById('location')
const weatherEl = document.getElementById('weather')
const cityFormEl = document.getElementById('cityForm')
const zipFormEl = document.getElementById('zipForm')

function convF(kel) {
    return kel * 1.8 - 459.67    
}

function convC(kel) {
    return kel - 273.15
}

function convMPH(mps) {
    return mps * 2.23694
}

function convKMPH(mps) {
    return mps * 3.6
}

// useful function found online which replicates .title()
function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

// HTML Templates
const errorTemplate = `
    <div class="card col-4 py-3 gap-1 shadow-lg rounded">
        <h2><strong>Oops!</strong></h2>
        <p>Looks like there was an error, please try again with a different search query.</p>
    </div>
`

function locationTemplate(cityName, country) {
    return `
        <div class="card col-4 py-3 gap-1 shadow-lg rounded">
            <h2><strong>${cityName}</strong></h2>
            <p>Country: &nbsp; ${country}</p>
        </div>
    `
}

function weatherTemplate(tempF, tempC, tempLowF, tempLowC, tempHighF, tempHighC, forecast, forecastDetails, windMPH, windKMPH, humidity) {
    return `
        <div class="card p-4 gap-4 shadow-lg rounded">
            <div class="row px-2 gap-4">
                <div class="col card bg-success text-white">
                    <div class="row">
                        <div class="col d-flex align-items-center ps-5">
                            <h2><strong>Current</strong></h2>
                        </div>
                        <div class="col pt-3">
                            <p class="text-center fs-4">${tempF} &nbsp; <strong>°F</strong></p>
                            <p class="text-center fs-4">${tempC} &nbsp; <strong>°C</strong></p>
                        </div>
                    </div>
                </div>

                <div class="col card bg-info text-white">
                    <div class="row">
                        <div class="col d-flex align-items-center ps-5">
                            <h2><strong>Low</strong></h2>
                        </div>
                        <div class="col pt-3">
                            <p class="text-center fs-4">${tempLowF} &nbsp; <strong>°F</strong></p>
                            <p class="text-center fs-4">${tempLowC} &nbsp; <strong>°C</strong></p>
                        </div>
                    </div>
                </div>

                <div class="col card bg-danger text-white">
                    <div class="row">
                        <div class="col d-flex align-items-center ps-5">
                            <h2><strong>High</strong></h2>
                        </div>
                        <div class="col pt-3">
                            <p class="text-center fs-4">${tempHighF} &nbsp; <strong>°F</strong></p>
                            <p class="text-center fs-4">${tempHighC} &nbsp; <strong>°C</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row px-2 gap-4">
                <div class="col card bg-warning">
                    <div class="row" id="fore">
                        <div class="col d-flex align-items-center ps-5">
                            <h2><strong>Forecast</strong></h2>
                        </div>
                        <div class="col">
                            <p class="text-center fs-4">${forecast}</p>
                            <p class="text-center fs-6">(${forecastDetails})</p>
                        </div>
                    </div>
                </div>

                <div class="col card bg-secondary text-white">
                    <div class="row">
                        <div class="col d-flex align-items-center ps-5">
                            <h2><strong>Wind</strong></h2>
                        </div>
                        <div class="col pt-3">
                            <p class="text-center fs-4">${windMPH} &nbsp; <strong>mi/hr</strong></p>
                            <p class="text-center fs-4">${windKMPH} &nbsp; <strong>km/hr</strong></p>
                        </div>
                    </div>
                </div>

                <div class="col card bg-primary text-white">
                    <div class="row" id="humid">
                        <div class="col ps-5">
                            <h2><strong>Humidity</strong></h2>
                        </div>
                        <div class="col">
                            <p class="text-center fs-4">${humidity} &nbsp; <strong>%</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

const getCityWeather = async function(city) {
    try{
        const locationResponse = await fetch(`//api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
        const locationData = await locationResponse.json()

        const lat = locationData[0].lat
        const lon = locationData[0].lon
        info.country = locationData[0].country

        const weatherResponse = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const weatherData = await weatherResponse.json()
        info.tempF = convF(weatherData.main.temp).toFixed(1)
        info.tempC = convC(weatherData.main.temp).toFixed(1)
        info.tempLowF = convF(weatherData.main.temp_min).toFixed(1)
        info.tempLowC = convC(weatherData.main.temp_min).toFixed(1)
        info.tempHighF = convF(weatherData.main.temp_max).toFixed(1)
        info.tempHighC = convC(weatherData.main.temp_max).toFixed(1)
        info.forecast = weatherData.weather[0].main
        info.forecastDetails = toTitleCase(weatherData.weather[0].description)
        info.humidity = weatherData.main.humidity.toFixed(1)
        info.windMPH = convMPH(weatherData.wind.speed).toFixed(1)
        info.windKMPH = convKMPH(weatherData.wind.speed).toFixed(1)
    }
    catch (err) {
        console.log('ERROR! ERROR! ERROR!')
        console.log(err)
    
        locationEl.innerHTML = errorTemplate
    }
}

const getZipWeather = async function(zip) {
    try{
        const locationResponse = await fetch(`//api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`)
        const locationData = await locationResponse.json()

        const lat = locationData.lat
        const lon = locationData.lon
        info.cityName = locationData.name
        info.country = locationData.country

        const weatherResponse = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const weatherData = await weatherResponse.json()
        info.tempF = convF(weatherData.main.temp).toFixed(1)
        info.tempC = convC(weatherData.main.temp).toFixed(1)
        info.tempLowF = convF(weatherData.main.temp_min).toFixed(1)
        info.tempLowC = convC(weatherData.main.temp_min).toFixed(1)
        info.tempHighF = convF(weatherData.main.temp_max).toFixed(1)
        info.tempHighC = convC(weatherData.main.temp_max).toFixed(1)
        info.forecast = weatherData.weather[0].main
        info.forecastDetails = toTitleCase(weatherData.weather[0].description)
        info.humidity = weatherData.main.humidity.toFixed(1)
        info.windMPH = convMPH(weatherData.wind.speed).toFixed(1)
        info.windKMPH = convKMPH(weatherData.wind.speed).toFixed(1)
    }
    catch (err) {
        console.log('ERROR! ERROR! ERROR!')
        console.log(err)

        locationEl.innerHTML = errorTemplate
    }
}

cityFormEl.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    locationEl.innerHTML = ''
    weatherEl.innerHTML = ''

    let cityInput = document.getElementsByName('city')[0]
    let zipInput = document.getElementsByName('zip')[0]
    const cityName = toTitleCase(cityInput.value)
    info.cityName = cityName

    await getCityWeather(info.cityName)

    locationEl.innerHTML = locationTemplate(info.cityName, info.country)

    weatherEl.innerHTML = weatherTemplate(info.tempF, info.tempC, info.tempLowF, info.tempLowC, info.tempHighF, info.tempHighC, info.forecast, info.forecastDetails, info.windMPH, info.windKMPH, info.humidity)

    cityInput.value = ''
    zipInput.value = ''
})

zipFormEl.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    locationEl.innerHTML = ''
    weatherEl.innerHTML = ''
    
    let cityInput = document.getElementsByName('city')[0]
    let zipInput = document.getElementsByName('zip')[0]
    info.zipCode = zipInput.value

    await getZipWeather(info.zipCode)

    locationEl.innerHTML = locationTemplate(info.cityName, info.country)

    weatherEl.innerHTML = weatherTemplate(info.tempF, info.tempC, info.tempLowF, info.tempLowC, info.tempHighF, info.tempHighC, info.forecast, info.forecastDetails, info.windMPH, info.windKMPH, info.humidity)

    cityInput.value = ''
    zipInput.value = ''
})
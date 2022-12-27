import { useState, useEffect, createContext, useContext} from "react";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const [cities, setCities] = useState([])
    const [zips, setZips] = useState([])
    const { user } = useContext(AuthContext)
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

    const searchErrorTemplate = `
        <div class="card col-4 py-3 gap-1 shadow-lg rounded">
            <h2><strong>Oops!</strong></h2>
            <p>Looks like there was an error, please try again with a different search query.</p>
        </div>
    `
    
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

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    const getCityWeather = async function(city) {
        try{
            const locationResponse = await fetch(`//api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
            const locationData = await locationResponse.json()
    
            const lat = locationData[0].lat
            const lon = locationData[0].lon
            const cityInfo = locationData[0].name
            const country = locationData[0].country
    
            const weatherResponse = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            const weatherData = await weatherResponse.json()
            const tempF = convF(weatherData.main.temp).toFixed(1)
            const tempC = convC(weatherData.main.temp).toFixed(1)
            const tempLowF = convF(weatherData.main.temp_min).toFixed(1)
            const tempLowC = convC(weatherData.main.temp_min).toFixed(1)
            const tempHighF = convF(weatherData.main.temp_max).toFixed(1)
            const tempHighC = convC(weatherData.main.temp_max).toFixed(1)
            const forecast = weatherData.weather[0].main
            const forecastDetails = toTitleCase(weatherData.weather[0].description)
            const humidity = weatherData.main.humidity.toFixed(1)
            const windMPH = convMPH(weatherData.wind.speed).toFixed(1)
            const windKMPH = convKMPH(weatherData.wind.speed).toFixed(1)

            return {
                cityName: cityInfo,
                zipCode: '',
                country: country,
                tempF: tempF,
                tempC: tempC,
                tempLowF: tempLowF,
                tempLowC: tempLowC,
                tempHighF: tempHighF,
                tempHighC: tempHighC,
                forecast: forecast,
                forecastDetails: forecastDetails,
                humidity: humidity,
                windMPH: windMPH,
                windKMPH: windKMPH,
            }
        }

        catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }
    
    const getZipWeather = async function(zip) {
        try{
            const locationResponse = await fetch(`//api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`)
            const locationData = await locationResponse.json()
    
            const lat = locationData.lat
            const lon = locationData.lon
            const cityName = locationData.name
            const country = locationData.country
    
            const weatherResponse = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            const weatherData = await weatherResponse.json()
            const tempF = convF(weatherData.main.temp).toFixed(1)
            const tempC = convC(weatherData.main.temp).toFixed(1)
            const tempLowF = convF(weatherData.main.temp_min).toFixed(1)
            const tempLowC = convC(weatherData.main.temp_min).toFixed(1)
            const tempHighF = convF(weatherData.main.temp_max).toFixed(1)
            const tempHighC = convC(weatherData.main.temp_max).toFixed(1)
            const forecast = weatherData.weather[0].main
            const forecastDetails = toTitleCase(weatherData.weather[0].description)
            const humidity = weatherData.main.humidity.toFixed(1)
            const windMPH = convMPH(weatherData.wind.speed).toFixed(1)
            const windKMPH = convKMPH(weatherData.wind.speed).toFixed(1)

            return {
                cityName: cityName,
                zipCode: zip,
                country: country,
                tempF: tempF,
                tempC: tempC,
                tempLowF: tempLowF,
                tempLowC: tempLowC,
                tempHighF: tempHighF,
                tempHighC: tempHighC,
                forecast: forecast,
                forecastDetails: forecastDetails,
                humidity: humidity,
                windMPH: windMPH,
                windKMPH: windKMPH,
            }
        }

        catch (err) {
            console.log('ERROR! ERROR! ERROR!')
            console.log(err)
        }
    }

    useEffect(() => {
        async function getCities() {
            // const querySnapshot = await getDocs(collection(db, 'users', `${user.uid} `, 'cities'))
            const q = query(collection(db, 'users', `${user.uid} `, 'cities'), orderBy('cityName', 'asc'))
            const querySnapshot = await getDocs(q)
            const cityDocs = []
    
            querySnapshot.forEach((doc) => {
                // const userData = await getDoc(doc.ref.parent.parent)
                // const username = userData.data().username
    
                cityDocs.push({
                    id: doc.id,
                    uid: user.uid,
                    ...doc.data()
                })
    
                setCities(cityDocs)
            })
        }

        getCities()
    }, [user])

    useEffect(() => {
        async function getZips() {
            const q = query(collection(db, 'users', `${user.uid} `, 'zips'), orderBy('zipCode', 'asc'))
            const querySnapshot = await getDocs(q)
            const zipDocs = []
    
            querySnapshot.forEach((doc) => {
                zipDocs.push({
                    id: doc.id,
                    uid: user.uid,
                    ...doc.data()
                })
            
                setZips(zipDocs)
            })
        }

        getZips()
    }, [user])

    async function addCity(cityName) {
        const newCity = {
            cityName: cityName
        }

        const userDoc = await setDoc(doc(db, 'users', `${user.uid} `), {
            username: user.username
        })

        const cityDoc = await addDoc(collection(db, 'users', `${user.uid} `, 'cities'), newCity)

        newCity.id = cityDoc.id

        setCities([newCity, ...cities])
    }

    async function addZip(zipCode) {
        const newZip = {
            zipCode: zipCode
        }

        const userDoc = await setDoc(doc(db, 'users', `${user.uid} `), {
            username: user.username
        })

        const zipDoc = await addDoc(collection(db, 'users', `${user.uid} `, 'zips'), newZip)

        newZip.id = zipDoc.id

        setZips([newZip, ...zips])
    }
    
    async function removeCity(id) {
        await deleteDoc(doc(db, 'users', `${user.uid} `, 'cities', `${id}`))

        const q = query(collection(db, 'users', `${user.uid} `, 'cities'), orderBy('cityName', 'asc'))
        const querySnapshot = await getDocs(q)
        const cityDocs = []

        querySnapshot.forEach((doc) => {
            cityDocs.push({
                id: doc.id,
                uid: user.uid,
                ...doc.data()
            })

            setCities(cityDocs)
        })
    }

    async function removeZip(id) {
        await deleteDoc(doc(db, 'users', `${user.uid} `, 'zips', `${id}`))

        const q = query(collection(db, 'users', `${user.uid} `, 'zips'), orderBy('zipCode', 'asc'))
        const querySnapshot = await getDocs(q)
        const zipDocs = []

        querySnapshot.forEach((doc) => {
            zipDocs.push({
                id: doc.id,
                uid: user.uid,
                ...doc.data()
            })

            setZips(zipDocs)
        })
    }

    const value = {
        cities,
        zips,
        toTitleCase,
        getCityWeather,
        getZipWeather,
        addCity,
        addZip,
        removeCity,
        removeZip
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}
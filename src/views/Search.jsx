import { useState, useEffect, useContext } from "react"
import { DataContext } from "../contexts/DataProvider"
import Weather from "../components/Weather"

export default function Search() {
    const { toTitleCase, getCityWeather, getZipWeather } = useContext(DataContext)
    const [info, setInfo] = useState({})
    // cityName: '',
    //     zipCode: '',
    //     country: '',
    //     tempF: 0,
    //     tempC: 0,
    //     tempLowF: 0,
    //     tempLowC: 0,
    //     tempHighF: 0,
    //     tempHighC: 0,
    //     forecast: '',
    //     forecastDetails: '',
    //     humidity: 0,
    //     windMPH: 0,
    //     windKMPH: 0,

    useEffect(() => {
        async function loadDefault() {
            const data = await getCityWeather('Los Angeles')
            setInfo(data)
        }
        
        loadDefault()
    }, [])

    async function searchCity(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const cityName = toTitleCase(formData.get('city'))

        const data = await getCityWeather(cityName)
        setInfo(data)

        ev.target.reset()
    }

    async function searchZip(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const zipCode = formData.get('zip')

        const data = await getZipWeather(zipCode)
        setInfo(data)

        ev.target.reset()
    }

    return (
        <div className="Search">
            <h1 className="text-center text-light pb-3"><strong>Search Weather By...</strong></h1>
            <div className="row justify-content-center gap-5 pb-4">
                <div className="card col-4 p-4 shadow-lg rounded">
                    <form onSubmit={searchCity}>
                        <label htmlFor="city" className="form-label fs-3"><strong>City Name</strong></label>
                        <input name="city" type="text" className="form-control mt-2 fs-5" placeholder="Examples: &nbsp; Houston, Denver, London, etc."/>
                        <div className="d-grid mt-3 justify-content-end">
                        <button type="submit" className="btn btn-primary px-5 fs-4"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>

                <div className="card col-4 p-4 shadow-lg rounded">
                    <form onSubmit={searchZip}>
                        <label htmlFor="zip" className="form-label fs-3"><strong>Zip/Post Code</strong></label>
                        <input name="zip" type="text" className="form-control mt-2 fs-5" placeholder="Examples: &nbsp; 90064, 80204, SW1A, etc."/>
                        <div className="d-grid mt-3 justify-content-end">
                        <button type="submit" className="btn btn-primary px-5 fs-4"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>
            </div>

            <Weather info={info}/>
            {/* <Weather cityName={info.cityName} zipCode={info.zipCode} country={info.country} tempF={info.tempF} tempC={info.tempC} tempLowF={info.tempLowF} tempLowC={info.tempLowC} tempHighF={info.tempHighF} tempHighC={info.tempHighC} forecast={info.forecast} forecastDetails={info.forecastDetails} windMPH={info.windMPH} windKMPH={info.windKMPH} humidity={info.humidity}/> */}
        </div>
    )
}
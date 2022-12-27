import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../contexts/DataProvider'
import Weather from "../components/Weather"

export default function SingleCity() {
    const { cityName } = useParams()
    const { getCityWeather } = useContext(DataContext)
    const [info, setInfo] = useState({})

    useEffect(() => {
        async function loadCity() {
            const data = await getCityWeather(cityName)
            setInfo(data)
        }
        
        loadCity()
    }, [])

    return (
        <div className="SingleCity pt-5">
            <Weather info={info}/>
        </div>
    )
}
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../contexts/DataProvider'
import Weather from "../components/Weather"

export default function SingleZip() {
    const { zipCode } = useParams()
    const { getZipWeather } = useContext(DataContext)
    const [info, setInfo] = useState({})

    useEffect(() => {
        async function loadZip() {
            const data = await getZipWeather(zipCode)
            setInfo(data)
        }
        
        loadZip()
    }, [])

    return (
        <div className="SingleZip pt-5">
            <Weather info={info}/>
        </div>
    )
}
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function FavCity(props) {
    const { removeCity } = useContext(DataContext)

    function handleRemoveCity(cityName) {
        removeCity(cityName)
    }

    if (!props.city) {
        return (
            <div className="row justify-content-center">
                <div className="card col-9 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                    <h2><strong>Not Found</strong></h2>
                </div>
            </div>
        )
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-9 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                <h2><strong>{ props.city.cityName }</strong></h2>
                <div className="row justify-content-evenly gap-4">
                    <Link to={ `/weather/city/${props.city.cityName}` } className="col-6 btn btn-primary">Show Weather</Link>
                    <button onClick={() => handleRemoveCity(props.city.id)} className="col-3 btn btn-danger">Remove</button>
                </div>
            </div>
        </div>
    )
}
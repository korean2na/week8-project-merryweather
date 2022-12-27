import { Link } from "react-router-dom"

export default function FavCity(props) {
    if (!props.city) {
        return (<p>LOADING</p>)
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-9 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                <h2><strong>{ props.city.cityName }</strong></h2>
                <div className="row justify-content-evenly gap-4">
                    <Link to={ `/weather/city/${props.city.cityName}` } className="col-6 btn btn-primary">Show Weather</Link>
                    <button className="col-3 btn btn-danger">Remove</button>
                </div>
            </div>
        </div>
    )
}
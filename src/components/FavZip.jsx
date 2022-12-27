import { Link } from "react-router-dom"

export default function FavZip(props) {
    if (!props.zip) {
        return (<p>LOADING</p>)
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-9 text-center gap-3 py-4 mb-5 shadow-lg rounded">
                <h2><strong>{ props.zip.zipCode }</strong></h2>
                <div className="row justify-content-evenly gap-4">
                    <Link to={ `/weather/zip/${props.zip.zipCode}` }className="col-6 btn btn-primary">Show Weather</Link>
                    <button className="col-3 btn btn-danger">Remove</button>
                </div>
            </div>
        </div>
    )
}
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function FavZip(props) {
    const { removeZip } = useContext(DataContext)
    
    function handleRemoveZip(zipCode) {
        removeZip(zipCode)
    }

    if (!props.zip) {
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
                <h2><strong>{ props.zip.zipCode }</strong></h2>
                <div className="row justify-content-evenly gap-4">
                    <Link to={ `/weather/zip/${props.zip.zipCode}` }className="col-6 btn btn-primary">Show Weather</Link>
                    <button onClick={() => handleRemoveZip(props.zip.id)} className="col-3 btn btn-danger">Remove</button>
                </div>
            </div>
        </div>
    )
}
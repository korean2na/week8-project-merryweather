export default function Weather(props) {
    if (!props.info) {
        return (<p>LOADING</p>)
    }

    return (
        <div className="Weather container mt-4 mb-5">
            <div className="row justify-content-center pb-3">
                <div className="card col-6 text-center py-3 gap-1 shadow-lg rounded">
                    {
                        (props.info.zipCode) ?
                        <h2><strong>{props.info.zipCode}</strong></h2> :
                        <h2><strong>{props.info.cityName}</strong></h2>
                    }
                    <p>Country: &nbsp; {props.info.country}</p>
                </div>
            </div>

            <div className="card p-4 gap-4 shadow-lg rounded">
                <div className="row px-2 gap-4">
                    <div className="col card bg-success text-white">
                        <div className="row">
                            <div className="col d-flex align-items-center ps-5">
                                <h2><strong>Current</strong></h2>
                            </div>
                            <div className="col pt-3">
                                <p className="text-center fs-4">{props.info.tempF} &nbsp; <strong>°F</strong></p>
                                <p className="text-center fs-4">{props.info.tempC} &nbsp; <strong>°C</strong></p>
                            </div>
                        </div>
                    </div>
    
                    <div className="col card bg-info text-white">
                        <div className="row">
                            <div className="col d-flex align-items-center ps-5">
                                <h2><strong>Low</strong></h2>
                            </div>
                            <div className="col pt-3">
                                <p className="text-center fs-4">{props.info.tempLowF} &nbsp; <strong>°F</strong></p>
                                <p className="text-center fs-4">{props.info.tempLowC} &nbsp; <strong>°C</strong></p>
                            </div>
                        </div>
                    </div>
    
                    <div className="col card bg-danger text-white">
                        <div className="row">
                            <div className="col d-flex align-items-center ps-5">
                                <h2><strong>High</strong></h2>
                            </div>
                            <div className="col pt-3">
                                <p className="text-center fs-4">{props.info.tempHighF} &nbsp; <strong>°F</strong></p>
                                <p className="text-center fs-4">{props.info.tempHighC} &nbsp; <strong>°C</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="row px-2 gap-4">
                    <div className="col card bg-warning">
                        <div className="row" id="fore">
                            <div className="col d-flex align-items-center ps-5">
                                <h2><strong>Forecast</strong></h2>
                            </div>
                            <div className="col">
                                <p className="text-center fs-4">{props.info.forecast}</p>
                                <p className="text-center fs-6">({props.info.forecastDetails})</p>
                            </div>
                        </div>
                    </div>
    
                    <div className="col card bg-secondary text-white">
                        <div className="row">
                            <div className="col d-flex align-items-center ps-5">
                                <h2><strong>Wind</strong></h2>
                            </div>
                            <div className="col pt-3">
                                <p className="text-center fs-4">{props.info.windMPH} &nbsp; <strong>mi/hr</strong></p>
                                <p className="text-center fs-4">{props.info.windKMPH} &nbsp; <strong>km/hr</strong></p>
                            </div>
                        </div>
                    </div>
    
                    <div className="col card bg-primary text-white">
                        <div className="row" id="humid">
                            <div className="col ps-5">
                                <h2><strong>Humidity</strong></h2>
                            </div>
                            <div className="col">
                                <p className="text-center fs-4">{props.info.humidity} &nbsp; <strong>%</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider"
import { DataContext } from "../contexts/DataProvider";

export default function Home() {
    const { user, login } = useContext(AuthContext)
    const { cities, zips, getZips } = useContext(DataContext)

    useEffect(() => {
        // getZips('eEzPi6ayY6fxgipnHC29TAEekFi2')
        getZips('TEST')
    },[user])

    console.log(zips)

    return (
        <div className="Home">
            <h1>Favorites</h1>
        </div>
    )
}
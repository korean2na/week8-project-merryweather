import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"

export default function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <div className="Profile text-center">
            <h1 className="text-light my-4"><strong>Profile</strong></h1>
            <div className="row justify-content-center">
                <div className="col-6 card py-4">
                    <p>Name: &nbsp; { user.username }</p>
                    <p>Email: &nbsp; { user.email }</p>
                    <p>ID: &nbsp; { user.uid }</p>
                </div>
            </div>
        </div>
    )
}
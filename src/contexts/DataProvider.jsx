import { useState, useEffect, createContext, useContext, useTransition } from "react";
import { getFirestore, collection, getDocs, doc, getDoc, Timestamp, addDoc, query, orderBy, limit, setDoc, collectionGroup } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const [cities, setCities] = useState([])
    const [zips, setZips] = useState([])
    const { user } = useContext(AuthContext)

    async function getCities() {
        // const q = query(collectionGroup(db, 'cities'), orderBy('cityName', 'asc'))
        // const q = query(collectionGroup(db, 'cities'))
        // const q = query(db, 'users', uid, 'cities'), orderBy('cityName', 'asc'))
        const q = query(collectionGroup(db, 'cities'))
        const querySnapshot = await getDocs(q)
        const cityDocs = []

        querySnapshot.forEach(async (doc) => {
            const userData = await getDoc(doc.ref.parent.parent)
            const username = userData.data().username


            cityDocs.push({
                id: doc.id,
                uid: user.uid,
                ...doc.data()
            })

            setCities(cityDocs)
        })
    }

    async function getZips(userId) {
        // const q = query(db, 'users', uid, 'zips'), orderBy('zipCode', 'asc'))
        // const q = query(collectionGroup(db, 'zips'))
        // const querySnapshot = await getDocs(q)
        const querySnapshot = await getDocs(collection(db, 'users', userId, 'zips'))
        const zipDocs = []

        querySnapshot.forEach((doc) => {
            console.log(doc.data())

            zipDocs.push({
                id: doc.id,
                uid: userId,
                ...doc.data()
            })
        
            setZips(zipDocs)
            console.log(zips)
        })
    }

    // console.log(user)
    // console.log(cities)
    // console.log(zips)

    const value = {
        getCities,
        getZips
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}
import React, {FC, useEffect, useState} from 'react'
import MapAddress, { MarkerType } from './MapAddress'

import styles from './index.css'
import Filter from './Filter'
import { Store } from '../types/stores'

export type Coordinates = {
    lat: number,
    lng: number
}

const initialMapCenter:Coordinates = {
    lat: 40.854885,
    lng: -88.081807
}
const initialStores:Store[] = []
interface Props {
    google: any
}

const WrapperCOntentForm:FC<Props> = ({google}) =>{

    const [coordinateMap, setCoordinateMap] = useState(initialMapCenter)
    const [stores, setStores] = useState(initialStores)
    let markers:MarkerType[] = [] 

    useEffect(()=>{
        const getStores = async () => {
            const data = await fetch('/api/dataentities/ST/search?_flieds=name,address,city,scheduleWeek,scheduleWeekend,lng,lat')
            const json:Store[] = await data.json()
            console.log(json)
            setStores(json)
        }
        getStores()
    },[])

    stores.forEach(({lat,lng})=>{
        markers.push({
            position:{
                lat,
                lng
            }
        })
    })
    markers.push({position:initialMapCenter})
      
    return (
        <div className={styles.wrapperContainer}>
            <Filter setMap={setCoordinateMap} stores={stores}/>
            <MapAddress coordinateMap={coordinateMap} markers={markers} google={google}/>
        </div>
    )
}

export default WrapperCOntentForm
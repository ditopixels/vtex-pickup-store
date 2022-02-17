import React, {FC, useState} from 'react'
import MapAddress from './MapAddress'

import styles from './index.css'
import Filter from './Filter'

export type Coordinates = {
    lat: number,
    lng: number
}

const initialMapCenter:Coordinates = {
    lat: 40.854885,
    lng: -88.081807
}

interface Props {
    google: any
}

const WrapperCOntentForm:FC<Props> = ({google}) =>{
    const [coordinateMap, setCoordinateMap] = useState(initialMapCenter)
      
    return (
        <div className={styles.wrapperContainer}>
            <Filter setMap={setCoordinateMap}/>
            <MapAddress coordinateMap={coordinateMap} markers={[{position:coordinateMap}]} google={google}/>
        </div>
    )
}

export default WrapperCOntentForm
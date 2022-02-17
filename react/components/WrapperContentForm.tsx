import React, {FC, useEffect, useState} from 'react'
import MapAddress, { MarkerType } from './MapAddress'

import './index.css'
import Filter from './Filter'
import { Store } from '../types/stores'
import { storesInit } from '../assets/stores-example'
import {useCssHandles} from 'vtex.css-handles'
import ListStores from './ListStores'

const HANDLES = [
    'wrapperContainer',
    'message'
]

export type Coordinates = {
    lat: number,
    lng: number
}

const initialStores:Store[] = storesInit
const initialMapCenter:Coordinates = {
    lat: initialStores[0]?.lat,
    lng: initialStores[0]?.lng
}
interface Props {
    google: any
}

const WrapperCOntentForm:FC<Props> = ({google}) =>{

    const [coordinateMap, setCoordinateMap] = useState(initialMapCenter)
    const [stores] = useState(initialStores)
    let markers:MarkerType[] = [] 
    const {handles} = useCssHandles(HANDLES)

    useEffect(()=>{
        /*const getStores = async () => {
            const data = await fetch('/api/dataentities/ST/search?_flieds=name,content,lng,lat')
            const json:Store[] = await data.json()
            console.log(json)
            setStores(json)
        }
        getStores()*/
    },[])

    stores.forEach(({lat,lng})=>{
        markers.push({
            position:{
                lat,
                lng
            }
        })
    })
      
    return (
        <div className={`${handles.wrapperContainer}`}>
            <Filter setMap={setCoordinateMap} stores={stores}/>
            <MapAddress coordinateMap={coordinateMap} markers={markers} google={google}/>
            <p className={`${handles.message}`}>
                Si no encuentras tu ciudad puedes realizar tu compra a través del whatsapp de la linea naranja 3188007804 o el chat online.
            </p>
            <ListStores stores={stores}/>
        </div>
    )
}

export default WrapperCOntentForm
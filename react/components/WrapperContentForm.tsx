import React, {FC, useState} from 'react'
import MapAddress, { MarkerType } from './MapAddress'
import STORES from '../graphql/getStores.gql'
import './index.css'
import Filter from './Filter'
import { Store } from '../types/stores'
import {useCssHandles} from 'vtex.css-handles'
import ListStores from './ListStores'
import { useQuery } from 'react-apollo'

const HANDLES = [
    'wrapperContainer',
    'message'
]

export type Coordinates = {
    lat: number,
    lng: number,
    city?: string
}

const initialMapCenter:Coordinates = {
    lat: 8.751394,
    lng: -75.890013
}
interface Props {
    google: any
}

const WrapperCOntentForm:FC<Props> = ({google}) =>{

    const [coordinateMap, setCoordinateMap] = useState(initialMapCenter)
    let stores:Store[] = []
    let markers:MarkerType[] = [] 
    const {handles} = useCssHandles(HANDLES)

    const { data, loading } = useQuery(STORES)

    if(data && data.documents){
        data.documents.forEach((store:{fields:{key:string, value:string}[]})=>stores.push({
            name: store.fields.find(field=>field.key == "name")?.value || "",
            id: parseFloat(store.fields.find(field=>field.key == "id")?.value || ""),
            lng: parseFloat(store.fields.find(field=>field.key == "lng")?.value.replace(',','.') || ""),
            lat: parseFloat(store.fields.find(field=>field.key == "lat")?.value.replace(',','.') || ""),
            city: store.fields.find(field=>field.key == "city")?.value || "",
            content: store.fields.find(field=>field.key == "content")?.value || ""
        }))

        stores.forEach(({lat,lng})=>{
            markers.push({
                position:{
                    lat,
                    lng
                }
            })
        })
    }
      
    return (
        <div className={`${handles.wrapperContainer}`}>
            <Filter setMap={setCoordinateMap} stores={stores}/>
            <MapAddress coordinateMap={coordinateMap} markers={markers} google={google}/>
            <p className={`${handles.message}`}>
                Si no encuentras tu ciudad puedes realizar tu compra a través del whatsapp de la linea naranja 3188007804 o el chat online.
            </p>
            {!loading && <ListStores stores={stores} coordinateMap={coordinateMap}/>}
        </div>
    )
}

export default WrapperCOntentForm
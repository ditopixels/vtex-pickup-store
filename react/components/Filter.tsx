import React, {SetStateAction, Dispatch, FC, useState, MouseEventHandler} from 'react'
import { Coordinates } from './WrapperContentForm'
// @ts-ignore
import { EXPERIMENTAL_Select as Select } from 'vtex.styleguide'
import { Store } from '../types/stores'
import {useCssHandles} from 'vtex.css-handles'
import './index.css'
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'

const HANDLES = [
    'filter',
    'filter__title',
    'select'
]
interface FilterProps {
    setMap: Dispatch<SetStateAction<Coordinates>>
    stores: Store[]
}

const Filter:FC<FilterProps> = ({stores, setMap}) => {
    const [city, setCity] = useState('')
    const {handles} = useCssHandles(HANDLES)

    const storesUniq = [...new Set(stores.map(option=>option.city))]
    let options:{value:string,label:string}[] = storesUniq.map((city)=>{
        return {
            value: city,
            label: city
        }
    })

    const handleSubmitCity:MouseEventHandler<HTMLButtonElement> = async () => {
        const results = await geocodeByAddress(`Colombia ${city}`)
        const latLng = await getLatLng(results[0])
        
        if(latLng) setMap({...latLng, city})
    }

    return (
        <div className={`${handles.filter}`}>
            <h3 className={`${handles.filter__title}`}>Filtrar por:</h3>
            <div className={handles.select}>
                <Select
                    placeholder="Seleccionar..."
                    label="Ciudad"
                    onChange={(values:any)=>setCity(values.value)}
                    clearable={false}
                    multi={false}
                    options={options}
                />
            </div>
            <button onClick={handleSubmitCity}>Buscar</button>
        </div>
    )
}

export default Filter
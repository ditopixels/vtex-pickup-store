import React, {SetStateAction, Dispatch, FC, useState, MouseEventHandler} from 'react'
import { Coordinates } from './WrapperContentForm'
// @ts-ignore
import { EXPERIMENTAL_Select as Select } from 'vtex.styleguide'
import { Store } from '../types/stores'
import {useCssHandles} from 'vtex.css-handles'
import './index.css'

const HANDLES = [
    'filter',
    'filter__title'
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

    const handleSubmitCity:MouseEventHandler<HTMLButtonElement> = () => {
        const storeNear:(Store | undefined) = stores.find(store=>store.city===city) 
        if(storeNear){
            setMap({
                lat:storeNear.lat,
                lng:storeNear.lng
            })
        }
    }

    return (
        <div className={`${handles.filter}`}>
            <h3 className={`${handles.filter__title}`}>Filtrar por:</h3>
            <Select
                placeholder="Seleccionar..."
                label="Ciudad"
                onChange={(values:any)=>setCity(values.value)}
                clearable={false}
                multi={false}
                options={options}
            />
            <button onClick={handleSubmitCity}>Buscar</button>
        </div>
    )
}

export default Filter
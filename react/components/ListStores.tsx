import React, { FC, useEffect, useState } from 'react'
import { Store } from '../types/stores'
import './index.css'
import {useCssHandles} from 'vtex.css-handles'
// @ts-ignore
import { Collapsible } from "vtex.styleguide";
import IconStore from '../assets/icon_store.png'
import IconWaze from '../assets/iconWaze.png'
import { Coordinates } from './WrapperContentForm';

const HANDLES = [
    'list',
    'list__item',
    'list__header',
    'open',
    'store__item',
    'list__stores',
    'store__message'
]

interface ListStoresProps {
    stores:Store[],
    coordinateMap: Coordinates
}

const initItems:{[store:string]:boolean} = {}

const ListStores:FC<ListStoresProps> = ({stores, coordinateMap}) => {
    const { handles } = useCssHandles(HANDLES)
    const [openCity, setOpenCity] = useState(initItems)

    const citiesUniq = [...new Set(stores.map(option=>option.city))]
    let itemsOpen:string[] = []
    
    for(let city in openCity){
        if(openCity[city] == true) itemsOpen.push(city)
    }

    useEffect(()=>{
        if(coordinateMap.city) setOpenCity({[coordinateMap.city]:true})
    },[coordinateMap])

    return (
        <div className={`${handles.list}`}>
            {citiesUniq.map(city=>(
                <div className={`${handles.list__item} ${openCity[city] && handles.open}`} style={{order:itemsOpen.indexOf(city)==-1?999:itemsOpen.indexOf(city)}}>
                    <Collapsible
                        header={
                            <div className={`${handles.list__header}`}>
                                <img src={IconStore} alt={city} style={{marginRight:"28px"}}/>
                                {city}
                            </div>
                        }
                        align="right"
                        isOpen={openCity[city]}
                        onClick={()=>setOpenCity({
                            ...openCity,
                            [city]:!openCity[city]
                        })}
                        >
                        <div className={`${handles.list__stores}`}>
                            <p className={`${handles.store__message}`}>Tiendas que puedes visitar</p>
                            {stores.filter(store=>store.city===city).map(store=>(
                                <div className={`${handles.store__item}`}>
                                    <span>{store.name}</span>
                                    <div dangerouslySetInnerHTML={{__html:store.content}}/>
                                    <a href={`https://www.waze.com/ul?ll=${store.lat}%2C${store.lng}&navigate=yes&zoom=17`} target='_blank' rel='noopener'>¿Como llegar? <img src={IconWaze} width="20px"/></a>
                                </div>
                            ))}
                        </div>
                    </Collapsible>
                </div>
            ))}
        </div>
    )
}

export default ListStores
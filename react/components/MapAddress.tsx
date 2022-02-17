import React, {FC} from 'react'
import {Map, Marker} from 'google-maps-react';
import { Coordinates } from './WrapperContentForm';
import MarkerImage from '../assets/Pointer.svg'

export type MarkerType = {
    position: Coordinates
}

interface Props {
    coordinateMap: Coordinates,
    markers: MarkerType[],
    google:any
}

const MapAddress:FC<Props> = ({coordinateMap,markers,google}) => {
    const containerStyle = {
        position: 'relative',  
        width: '100%',
        height: '473px'
    }
    console.log(MarkerImage)
    return (
        <Map
            containerStyle={containerStyle}
            google={google}
            initialCenter = {coordinateMap}
            center = {coordinateMap}
        >   
            {markers.map((marker,index) => (
                <Marker 
                    key={index}
                    // @ts-ignore
                    position={marker.position}
                    // @ts-ignore
                    icon={{
                        url: MarkerImage,
                        anchor: new google.maps.Point(23,43),
                        scaledSize: new google.maps.Size(31,61)
                    }}
                />
            ))}
        </Map>
    )
}

export default MapAddress
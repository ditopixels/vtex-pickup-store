import React, {FC} from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
import WrapperContentForm from './components/WrapperContentForm'

const apiKey = 'AIzaSyAymPBa7kxja6n--uC7FYWz4RKVgWf5E9I'

interface Props {
    google: any
}

const AddressFormMap:FC<Props> = ({google}) => <WrapperContentForm google={google}/>

 
export default GoogleApiWrapper({apiKey})(AddressFormMap)

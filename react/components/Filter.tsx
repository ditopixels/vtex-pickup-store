import React, {SetStateAction, Dispatch, FC, ChangeEventHandler} from 'react'
import { Coordinates } from './WrapperContentForm'
import { Input } from 'vtex.styleguide'

interface FilterProps {
    setMap: Dispatch<SetStateAction<Coordinates>>
}

const Filter:FC<FilterProps> = ({setMap}) => {

    const handleInputCity:ChangeEventHandler<HTMLElement> = (e) =>{
        console.log(e, setMap)
    }

  return (
    <div>
        <Input
            placeholder="Regular with data-attributes"
            dataAttributes={{ 'hj-white-list': true, test: 'string' }}
            label="Regular"
            onChange={handleInputCity}
        />
    </div>
  )
}

export default Filter
import React from 'react';
import { remove } from '../utils'
import { locationObject, Screens } from '../App';

export interface LocationListProps {
  setList: Function,
  list: Set<locationObject>,
  inputType: Screens
}

const LocationList: React.FC<LocationListProps> = ({setList, list, inputType}) => {
  return (
    <div>
      {Array.from(list).map((location) => (
        <div>
          <div className="inline">
            {location.address}
          </div>
          <button className="inline" onClick={() => remove(location.address, list, setList, inputType)}>remove</button>
        </div>
      ))}
    </div>
  )
}

export default LocationList;
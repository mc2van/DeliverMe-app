import axios from 'axios';
import React from 'react';
import { locationObject } from '../App';

export interface CalculateProps {
  locationList: Set<locationObject>
  carList: Set<locationObject>
  setRes: Function
}

const calcRes = (locationList: Set<locationObject>, carList: Set<locationObject>) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const data = {
    locations: locationList,
    cars: carList
  }
  axios.post("http://127.0.0.1:8000/api/mtsp", data, {
    headers: headers
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(error)
  })
}

const Calculate: React.FC<CalculateProps> = ({locationList, carList, setRes}) => {
  return (
    <button className="inline" onClick={() => setRes(calcRes(locationList, carList))}>calculate!</button>
  )
}

export default Calculate;
import axios from 'axios';
import React, { useEffect } from 'react';
import { locationObject } from '../App';

export interface CalculateProps {
  locationList: Set<locationObject>
  carList: Set<locationObject>
  setRes: Function
}

const calcRes = (locationList: Set<locationObject>, carList: Set<locationObject>, setRes: Function): void => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const data = {
    locations: Array.from(locationList),
    cars: Array.from(carList)
  }
  axios.post("https://deliver-me-balls.herokuapp.com/api/mtsp", data, {
    headers: headers
  })
  .then((response) => {
    console.log(response)
    setRes(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

const Calculate: React.FC<CalculateProps> = ({locationList, carList, setRes}) => {
  return (
    <button className="inline" onClick={() => calcRes(locationList, carList, setRes)}>calculate!</button>
  )
}

export default Calculate;
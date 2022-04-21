import axios from 'axios';
import React from 'react';
import { locationObject } from '../App';

export interface CalculateProps {
  locationList: Set<locationObject>
  carList: Set<locationObject>
  setRes: Function
  setIsLoading: Function
}

const calcRes = (locationList: Set<locationObject>, carList: Set<locationObject>, setRes: Function, setIsLoading: Function): void => {
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
    setIsLoading(false)
    setRes(response.data)
  })
  .catch((error) => {
    console.log(error)
    setIsLoading(false)
    setRes(["Bad Input"])
  })
}

const Calculate: React.FC<CalculateProps> = ({locationList, carList, setRes, setIsLoading}) => {
  return (
    <button className="inline" onClick={() => {
      setIsLoading(true);
      calcRes(locationList, carList, setRes, setIsLoading);
    }}>calculate!</button>
  )
}

export default Calculate;
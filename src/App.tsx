import React, {useState} from 'react';
import LocationList from './components/LocationList';
import Input from './components/Input';
import './App.css';
import Calculate from './components/Calculate';

export enum Screens {
  DeliveryLocations,
  CarLocation
}

function App() {
  const [ locationList, setLocationList ] = useState(new Set<locationObject>());
  const [ carLocationList, setCarLocationList ] = useState(new Set<locationObject>());
  const [ inputScreen, setInputScreen ] = useState(Screens.DeliveryLocations);
  const [ res, setRes ] = useState([""]);

  return (
    <div className="App">
      <p>
        {inputScreen === Screens.DeliveryLocations ? 'Deliveries' : 'Cars'}
      </p> 
      <select onChange={(e) => setInputScreen(e.target.value === '0' ? 0 : 1)}>
        <option value='0'>Delivery</option>
        <option value='1'>Car</option>
      </select>
      {inputScreen === Screens.DeliveryLocations 
      ? <LocationList setList={setLocationList} list={locationList} inputType={inputScreen}></LocationList> 
      : <LocationList setList={setCarLocationList} list={carLocationList} inputType={inputScreen}></LocationList>}
      <Input setLocationList={setLocationList} setCarLocationList={setCarLocationList} inputType={inputScreen}></Input>
      <Calculate locationList={locationList} carList={carLocationList} setRes={setRes}></Calculate>
      <div>
        {res.map((url: string) => {
          return <div>
            <a href={`${url}`}>{url}</a>
            </div>
        })}
      </div>
    </div>
  );
}


export interface locationObject {
  address: string
  coords: {
    lat: number
    long: number
  }
}

export default App;

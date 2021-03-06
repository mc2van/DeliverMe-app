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
  const [ isLoading, setIsLoading ] = useState(false);

  return (
    <div className="App">
      <p>
        {inputScreen === Screens.DeliveryLocations ? <p>Destinations to visit!<br></br>Please enter 1 or more destinations.</p> 
        : <p>Initial locations of cars!<br></br>Please enter 1 or more initial car location.</p>}
      </p>
      
      <div className="border">
        <div className="inline">
          <select onChange={(e) => setInputScreen(e.target.value === '0' ? 0 : 1)}>
            <option value='0'>Destinations</option>
            <option value='1'>Car Locations</option>
          </select>
        </div> 
        <div className="inline">
          <Calculate locationList={locationList} carList={carLocationList} setRes={setRes} setIsLoading={setIsLoading}></Calculate>
        </div>
      </div>
      <div>
        <Input setLocationList={setLocationList} setCarLocationList={setCarLocationList} inputType={inputScreen}></Input>
      </div>
      <div className="border">
        {inputScreen === Screens.DeliveryLocations 
        ? <LocationList setList={setLocationList} list={locationList} inputType={inputScreen}></LocationList> 
        : <LocationList setList={setCarLocationList} list={carLocationList} inputType={inputScreen}></LocationList>}
      </div>
      <div>
        {isLoading 
        ? <div>Calculating...</div>
        : res.map((url: string) => {
          if (url.startsWith("http")) {
            return <div>
                    <a href={`${url}`}>{url}</a>
                    </div>
          } else {
            return <div>{url}</div>
          } 
          }
        )}
      </div>
      <div>
          <p>
            Enter delivery locations (places for cars to visit) and car starting location(s) to get your route(s)!
            <br></br>
            Delivery locations must be unique, car starting locations do not need to be unique.
          </p>
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

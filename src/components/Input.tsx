import React, { useEffect, useRef, useState } from 'react';
import { Screens } from '../App';
import { handleScriptLoad, loadScript } from '../utils';

export interface InputProps {
  setLocationList: Function
  setCarLocationList: Function
  inputType: Screens
}

let autoComplete: any;
const MAPS_API_KEY=process.env.REACT_APP_API_KEY

const Input: React.FC<InputProps> = ({setLocationList, setCarLocationList, inputType}) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`,
      () => handleScriptLoad(autoComplete, setQuery, autoCompleteRef, setLocationList, setCarLocationList, inputType)
    );
  }, [inputType]);

  return (
    <div>
      <input className="input"
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a Location"
        value={query}
      />
    </div>
  );
};

export default Input;
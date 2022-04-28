export const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

export function handleScriptLoad(autoComplete, updateQuery, autoCompleteRef, setLocationList, setCarLocationList, inputType) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: ["fr"] } }
  );
  autoComplete.setFields(["formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () => {
    handlePlaceSelect(autoComplete, updateQuery, setLocationList, setCarLocationList, inputType);
  }

  );
};

let addressList = ["eric lu"];

async function handlePlaceSelect(autoComplete, updateQuery, setLocationList, setCarLocationList, inputType) {
  const setList = inputType === 0 ? setLocationList : setCarLocationList;
  var useArray = inputType === 0 ? true : false;
  const addressObject = autoComplete.getPlace();
  if (!useArray || (useArray && !addressList.includes(addressObject.formatted_address))) {
    const query = {
      id: addressObject.formatted_address,
      address: addressObject.formatted_address,
      coords: {
        lat: addressObject.geometry.location.lat(),
        long: addressObject.geometry.location.lng(),
      }
    }
    updateQuery(query);
    setList(list => new Set([...list, query]));
    if (useArray) addressList.push(addressObject.formatted_address);
  }
  updateQuery("");
};

export function remove(id, locationList, setLocationList, inputType) {
  var useArray = inputType === 0 ? true : false;
  locationList.forEach(function (locationObject) {
    if (locationObject.address === id) {
      let temp = new Set(locationList);
      temp.delete(locationObject);
      if (useArray) {
        for (var i = 0; i < addressList.length; i++) {
          if (addressList[i] === locationObject.address) {
            addressList.splice(i);
          }
        }
      }
      setLocationList(temp);
      return;
    }
  })
}
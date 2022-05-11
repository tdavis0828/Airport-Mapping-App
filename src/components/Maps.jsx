import React from 'react';
import { Map, Marker, Overlay } from "pigeon-maps";
import airports from "../airports.json";
import { useState, useEffect, useRef  } from "react";
import Pin from './IMGs/Airport_Pin.png';
import List from "./List";

const MyMap = (props) => {
  const [latLon, setLatLon] = useState([]);
  const [lat, setLat] = useState(	38.500000);
  const [lon, setLon] = useState(-98.000000);

  useEffect(() => {
    const getLatLon = () => {
      const usAirports = airports.filter((airport) =>
        airport.country.includes("United States")
      );
      const filteredAirports = usAirports.filter(
        (airport) => airport.runway_length > 12000
      );

      let latLon = [];

      for (const airports of filteredAirports) {
        let latLongValues = [airports.lat, airports.lon];
        latLon.push(latLongValues);
      }
      setLatLon(latLon);
    };
    getLatLon();
  }, []);

  console.log(latLon);

 
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((postion) => {
        setLat(postion.coords.latitude);
        setLon(postion.coords.longitude);
        
    })
  };  

  console.log(lat, lon)
  return (
    <Map
      height={props.height}
      defaultCenter={[lat, lon]}
      defaultZoom={11}
    >
      <button onClick={getLocation}>Get Location</button>
      {latLon.map((value) => (
        // <Marker
         
        // />
        <Overlay
         width={5}
          anchor={[parseFloat(value[0]), parseFloat(value[1])]}
          offset={[40, 85]}
        >
          <img src={Pin} alt="pin" width={70} height={70} />
        </Overlay>
      ))}
    </Map>
  );
};

export default MyMap;
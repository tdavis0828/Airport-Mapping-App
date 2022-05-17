import React from 'react';
import { Map, Marker, Overlay } from "pigeon-maps";
import airports from "../airports.json";
import { useState, useEffect, useRef  } from "react";
import Pin from './IMGs/Airport_Pin.png';
import List from "./List";
import Rating from './rating'
import { nanoid } from "nanoid";
import styled, {createGlobalStyle}  from "styled-components";


const Bod  = createGlobalStyle`
    body{
        background-color: #D9D1CE;
        font-family: 'Courier Prime';
        margin-left: 0px;
        margin-right: 0px;
    }
`;

const MapStyles = styled.div`
  width: 1200px;
  height: 65vh;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-right: none;
  border-radius: 5px 0px 0px 5px;
  margin-left: 1rem;
    .pin {
      cursor: pointer;
    }
    
    
`;

const Input = styled.input`
  width: 300px;
  height: 25px;
  text-align: center;
  margin: 1rem 0;
  border: 1.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  font-size: 1.1rem;
  font-family: 'Courier Prime';
  font-weight: 300;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-around;
margin-top: 6%;
margin-left: 0px;
margin-right: 0px;
`;

const MyMap = () => {
  const scrollRef = useRef();

  const [latLon, setLatLon] = useState([]);
  const [lat, setLat] = useState(	38.500000);
  const [lon, setLon] = useState(-98.000000);
  const [unfilteredAirports, setunfilteredAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [markerInfo, setMarkerInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValues, setSearchValues] = useState([]);

  useEffect(() => {
    const filterAirportInfo = () => {
      const usAirports = airports.filter(
        (airport) =>
          airport.country.includes("United States") &&
          airport.runway_length > 12000
      );

      let unfiltered = [];
      let searchValuesArr = [];
      for (const airports of usAirports) {
        let unfilteredValues = [airports.lat, airports.lon, airports.code];
        let searchValues = [...unfilteredValues, airports.city, airports.state];
        searchValuesArr.push(searchValues);
        unfiltered.push(unfilteredValues);
      }
      setSearchValues(searchValuesArr);
      setunfilteredAirports(unfiltered);
      console.log(filteredAirports)
    };
    filterAirportInfo();
  }, []);

  useEffect(() => {
    let filtered = [];
    for (const key of searchValues) {
      if (
        key[4].toUpperCase().includes(searchTerm.toUpperCase()) ||
        key[3].toUpperCase().includes(searchTerm.toUpperCase())
      ) {
        filtered.push(key);
      }
    }
    setFilteredAirports(filtered);
  }, [searchTerm]);


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((postion) => {
        setLat(postion.coords.latitude);
        setLon(postion.coords.longitude);
        
    })
  };  

  return (
    <>
    <Bod />
    <Wrapper>
      <MapStyles>
      {/* <button onClick={getLocation}>Get Location</button> */}
        <Map defaultCenter={[33.9862, -98.4984]} defaultZoom={4.2}>
          {filteredAirports === []
            ? unfilteredAirports.map((value) => (
                <Overlay
                  key={nanoid()}
                  width={5}
                  offset={[40, 85]}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
               
                >
                <img className='pin' src={Pin} alt="pin" width={65} height={65} 
                   onClick={() => {
                    setMarkerInfo(value);
                    setTimeout(() => {
                      scrollRef.current.scrollIntoView();
                    }, 0);
                  }}
                  />
                </Overlay>
              ))
            : filteredAirports.map((value) => (
                <Overlay
                  key={nanoid()}
                  width={5}
                  offset={[40, 70]}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
                >
                  <img className='pin' src={Pin} alt="pin" width={65} height={65}
                    onClick={() => {
                      setMarkerInfo(value);
                      setTimeout(() => {
                        scrollRef.current.scrollIntoView();
                      }, 0);
                    }}
                  />
                </Overlay>
              ))}
        </Map>

        <Input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="City, State"
        />
      </MapStyles>
      <List
        refProp={scrollRef}
        markerInfo={markerInfo}
        airports={filteredAirports}
      />
      </Wrapper>
    </>
  );
};

export default MyMap;
import React from 'react';
import { Map, Overlay } from "pigeon-maps";
import { useState, useEffect, useRef  } from "react";
import Pin from './IMGs/Airport_Pin.png';
import List from "./List";
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
margin-top: 7rem;
margin-left: 0px;
margin-right: 0px;
`;

const MyMap = ({ unfilteredAirports, unfilteredMapData }) => {
  const scrollRef = useRef();

  const [filteredAirports, setFilteredAirports] = useState([]);
  const [filteredMapData, setFilteredMapData] = useState([]);
  const [markerInfo, setMarkerInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = [];
    for (const key of unfilteredAirports) {
      if (
        key.city.toUpperCase().includes(searchTerm.toUpperCase()) ||
        key.state_full.toUpperCase().includes(searchTerm.toUpperCase())
      ) {
        filtered.push(key);
      }
    }
    setFilteredAirports(filtered);

    let filteredMap = [];

    for (const index of unfilteredMapData) {
      if (
        index[3].toUpperCase().includes(searchTerm.toUpperCase()) ||
        index[4].toUpperCase().includes(searchTerm.toUpperCase())
      ) {
        filteredMap.push(index);
      }
    }
    setFilteredMapData(filteredMap);
  }, [unfilteredAirports, unfilteredMapData, searchTerm]);

  return (
    <>
    <Bod />
    <Wrapper>
      <MapStyles>
        <Map defaultCenter={[33.9862, -98.4984]} defaultZoom={4.2}>
          {filteredMapData === []
            ? unfilteredMapData.map((value) => (
              <Overlay
              key={nanoid()}
              width={5}
              offset={[40, 85]}
              anchor={[parseFloat(value[1]), parseFloat(value[2])]}
           
            >
            <img className='pin' src={Pin} alt="pin" width={50} height={50} 
               onClick={() => {
                setMarkerInfo(value);
                setTimeout(() => {
                  scrollRef.current.scrollIntoView();
                }, 0);
              }}
              />
            </Overlay>
              ))
            : filteredMapData.map((value) => (
              <Overlay
              key={nanoid()}
              width={5}
              offset={[25, 50]}
              anchor={[parseFloat(value[1]), parseFloat(value[2])]}
           
            >
            <img className='pin' src={Pin} alt="pin" width={50} height={50} 
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
        unfilteredAirports={unfilteredAirports}
        filteredAirports={filteredAirports}
      />
      </Wrapper>
    </>
  );
};

export default MyMap;
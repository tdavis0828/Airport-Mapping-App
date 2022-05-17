import { Map, Marker } from "pigeon-maps";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import List from "./List";
// import { Link } from "react-router-dom";

const MapStyles = styled.div`
  width: 1400px;
  height: 65vh;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-right: none;
  border-radius: 5px 0px 0px 5px;
  margin-left: 1rem;
`;

const Input = styled.input`
  width: 300px;
  height: 25px;
  text-align: center;
  margin: 1rem 0;
  border: 1.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  font-size: 1.1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
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
      <MapStyles>
        <Map defaultCenter={[33.9862, -98.4984]} defaultZoom={4.2}>
          {filteredMapData === []
            ? unfilteredMapData.map((value) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[1]), parseFloat(value[2])]}
                  onClick={() => {
                    setMarkerInfo(value);
                    setTimeout(() => {
                      scrollRef.current.scrollIntoView();
                    }, 0);
                  }}
                />
              ))
            : filteredMapData.map((value) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[1]), parseFloat(value[2])]}
                  onClick={() => {
                    setMarkerInfo(value);
                    setTimeout(() => {
                      scrollRef.current.scrollIntoView();
                    }, 0);
                  }}
                />
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
    </>
  );
};

export default MyMap;

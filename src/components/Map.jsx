import { Map, Marker } from "pigeon-maps";
import airports from "../airports.json";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import List from "./List";
import { Link } from "react-router-dom";

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

const MyMap = (props) => {
  const scrollRef = useRef();

  const [latLon, setLatLon] = useState([]);
  const [markerInfo, setMarkerInfo] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValues, setSearchValues] = useState([]);
  useEffect(() => {
    const getLatLon = () => {
      const usAirports = airports.filter(
        (airport) =>
          airport.country.includes("United States") ||
          airport.runway_length > 12000
      );

      let latLon = [];
      let searchValuesArr = [];
      for (const airports of usAirports) {
        let latLongValues = [airports.lat, airports.lon, airports.code];
        let searchValues = [...latLongValues, airports.city, airports.state];
        searchValuesArr.push(searchValues);
        latLon.push(latLongValues);
      }
      setSearchValues(searchValuesArr);
      setLatLon(latLon);
    };
    getLatLon();
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

  // const scrollElement = () => {
  //   scrollRef.current.scrollIntoView();
  // };

  return (
    <>
      <MapStyles>
        <Map
          height={props.height}
          defaultCenter={[33.9862, -98.4984]}
          defaultZoom={4.2}
        >
          {filteredAirports === []
            ? latLon.map((value) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
                  onClick={() => {
                    setMarkerInfo(value);
                  }}
                />
              ))
            : filteredAirports.map((value, i) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
                  onClick={() => {
                    setMarkerInfo(value);
                    scrollRef.current.scrollIntoView();
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
      <List refProp={scrollRef} data={[markerInfo, latLon, filteredAirports]} />
    </>
  );
};

export default MyMap;

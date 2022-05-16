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

const MyMap = () => {
  const scrollRef = useRef();

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

  return (
    <>
      <MapStyles>
        <Map defaultCenter={[33.9862, -98.4984]} defaultZoom={4.2}>
          {filteredAirports === []
            ? unfilteredAirports.map((value) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
                  onClick={() => {
                    setMarkerInfo(value);
                    setTimeout(() => {
                      scrollRef.current.scrollIntoView();
                    }, 0);
                  }}
                />
              ))
            : filteredAirports.map((value) => (
                <Marker
                  key={nanoid()}
                  width={35}
                  anchor={[parseFloat(value[0]), parseFloat(value[1])]}
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
        airports={filteredAirports}
      />
    </>
  );
};

export default MyMap;

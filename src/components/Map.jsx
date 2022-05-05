import { Map, Marker } from "pigeon-maps";
import airports from "../airports.json";
import { useState, useEffect } from "react";
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
`;

const MyMap = (props) => {
  const [latLon, setLatLon] = useState([]);
  const [markerInfo, setMarkerInfo] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);

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
        let latLongValues = [airports.lat, airports.lon, airports.code];
        latLon.push(latLongValues);
      }

      setLatLon(latLon);
      setFilteredAirports(filteredAirports);
    };
    getLatLon();
  }, []);

  const filterItems = (e) => {
    console.log(filteredAirports);
  };

  return (
    <>
      <MapStyles>
        <Map
          height={props.height}
          defaultCenter={[33.9862, -98.4984]}
          defaultZoom={4.2}
        >
          {latLon.map((value) => (
            <Marker
              key={nanoid()}
              width={35}
              anchor={[parseFloat(value[0]), parseFloat(value[1])]}
              onClick={() => {
                setMarkerInfo(value);
              }}
            />
          ))}
        </Map>
        <Input
          type="text"
          onChange={(e) => filterItems(e)}
          placeholder="City, State, Airport Code ex: LAX"
        />
      </MapStyles>
      <List data={markerInfo} />
    </>
  );
};

export default MyMap;

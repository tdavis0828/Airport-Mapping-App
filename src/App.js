import "./App.css";
import List from "./components/List";
import MyMap from "./components/Map";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import airportInfo from "./airports.json";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  height: 86vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  const [unfilteredAirports, setUnfilteredAirports] = useState([]);
  const [unfilteredMapData, setUnfilteredMapData] = useState([]);

  const getUsAirports = () => {
    const usAirports = airportInfo.filter(
      (airport) =>
        airport.country.includes("United States") &&
        airport.runway_length > 12000
    );
    let codes = [];
    let unfilteredMapData = [];
    for (const airport of usAirports) {
      codes.push(airport.code);
      unfilteredMapData.push([
        airport.code,
        airport.lat,
        airport.lon,
        airport.city,
        airport.state,
      ]);
    }
    setUnfilteredMapData(unfilteredMapData);
    return codes;
  };

  useEffect(() => {
    const getAirportData = async () => {
      const res = await fetch(
        `https://api.aviationapi.com/v1/airports?apt=${getUsAirports()}`
      );
      const airportData = await res.json();
      let unfilteredAirports = [];
      for (const key in airportData) {
        if (airportData[key].length) {
          const {
            city,
            facility_name,
            county,
            state_full,
            manager,
            manager_phone,
            status,
            faa_ident,
          } = airportData[key][0];

          unfilteredAirports.push({
            city,
            facility_name,
            county,
            state_full,
            manager,
            manager_phone,
            status,
            faa_ident,
          });
        }
      }

      setUnfilteredAirports(unfilteredAirports);
    };
    getAirportData();
  }, []);

  return (
    <div className="App">
      <>
        <Header />
        <Wrapper>
          <MyMap
            unfilteredMapData={unfilteredMapData}
            unfilteredAirports={unfilteredAirports}
          >
            <List />
          </MyMap>
        </Wrapper>
        <Footer />
      </>
    </div>
  );
}

export default App;

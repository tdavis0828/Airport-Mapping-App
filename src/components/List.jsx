import styled from "styled-components";
import airports from "../airports.json";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Map = styled.div`
  width: 1500px;
  height: 65vh;
  border: 1px solid #000;
  border-radius: 5px 0px 0px 5px;
  margin-left: 1rem;
`;

const Section = styled.section`
  width: 400px;
  height: 60vh;
  color: #fff;
  scroll-behavior: smooth;
  overflow: scroll;
  overflow-x: hidden;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0px 5px 5px 0px;
  padding: 1.3rem;
  margin-right: 1.2rem;
`;

const Card = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  background: #fff;
  height: 150px;
  width: 100%;
  color: #000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &-p {
    &-i {
      padding-right: 1rem;
    }
  }
`;

const List = () => {
  const [airportsData, setAirportsData] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCodes = () => {
    const usAirports = airports.filter((airport) =>
      airport.country.includes("United States")
    );
    const filteredAirports = usAirports.filter(
      (airport) => airport.runway_length > 12000
    );
    let codes = [];
    for (const airports of filteredAirports) {
      codes.push(airports.code);
    }
    return codes;
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.aviationapi.com/v1/airports?apt=${getCodes()}`
      );
      const airportInfo = await res.json();

      let airportData = [];
      console.log(airportInfo);
      for (const key in airportInfo) {
        if (airportInfo[key].length) {
          const {
            city,
            facility_name,
            county,
            state_full,
            manager,
            status,
            manager_phone,
          } = airportInfo[key][0];

          airportData.push({
            facility_name,
            city,
            county,
            state_full,
            manager,
            status,
            manager_phone,
          });
        }
      }
      setAirportsData(airportData);
    };
    getData();
  }, []);

  return (
    <Wrapper>
      <Map>
        <p>Map goes here</p>
      </Map>
      <Section>
        {airportsData.map((airports) => (
          <Card id={nanoid()}>
            <h3>{airports.facility_name}</h3>
            <p>
              <i className="fa-solid fa-map-pin"></i> {airports.city},{" "}
              {airports.state_full}
            </p>
            <p>
              <i class="fa-solid fa-phone"></i> {airports.manager_phone}
            </p>
            {airports.status === "O" ? "Currently Open" : "Currently Closed"}
          </Card>
        ))}
      </Section>
    </Wrapper>
  );
};

export default List;

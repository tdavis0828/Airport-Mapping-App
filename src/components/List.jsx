import styled from "styled-components";
import airports from "../airports.json";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Section = styled.section`
  width: 500px;
  height: 65vh;
  color: #fff;
  scroll-behavior: smooth;
  overflow: scroll;
  overflow-x: hidden;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0px 5px 5px 0px;
  margin-right: 2rem;
`;

const Card = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  background: #fff;
  height: 175px;
  width: 100%;
  color: #000;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &.active {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const List = (props) => {
  const [airportsData, setAirportsData] = useState([]);

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
      // console.log(airportInfo);
      let airportData = [];
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
            faa_ident,
          } = airportInfo[key][0];

          airportData.push({
            facility_name,
            city,
            county,
            state_full,
            manager,
            status,
            manager_phone,
            faa_ident,
          });
        }
      }
      setAirportsData(airportData);
    };
    getData();
  }, []);

  return (
    <Section>
      {airportsData === null ? (
        <i className="fa-solid fa-spinner"></i>
      ) : (
        airportsData.map((airports) => (
          <Card
            key={nanoid()}
            className={props.data[2] === airports.faa_ident ? "active" : ""}
          >
            <p>{airports.facility_name}</p>
            <p>
              <i className="fa-solid fa-map-pin"></i> {airports.city},{" "}
              {airports.state_full}
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> {airports.manager_phone}
            </p>
            {airports.status === "O" ? "Currently Open" : "Currently Closed"}
          </Card>
        ))
      )}
    </Section>
  );
};

export default List;

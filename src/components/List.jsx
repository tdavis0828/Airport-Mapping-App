import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
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
  console.log(props);
  const [airportsData, setAirportsData] = useState([]);
  const [apCodes, setApCodes] = useState([]);
  useEffect(() => {
    const getCodes = () => {
      let codes = [];
      for (const key of props.data[2]) {
        codes.push(key[2]);
      }
      setApCodes(codes);
      return codes;
    };
    getCodes();
  }, [props]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.aviationapi.com/v1/airports?apt=${apCodes}`
      );
      const airportInfo = await res.json();
      let airportData = [];
      let filteredAirportData = [];

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

          if (filteredAirportData.includes(city)) {
          }
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
  }, [apCodes]);

  return (
    <Section>
      {airportsData.map((airports) => (
        <Card
          key={nanoid()}
          className={props.data[0][2] === airports.faa_ident ? "active" : ""}
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
      ))}
    </Section>
  );
};

export default List;

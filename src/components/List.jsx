import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  font-family: 'Courier Prime';
  font-weight: 300;
  background: #fff;
  height: 175px;
  width: 100%;
  color: #000;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &.active {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const List = ({
  refProp,
  markerInfo,
  filteredAirports,
  unfilteredAirports,
}) => {
  // console.log(unfilteredAirports);
  // console.log(filteredAirports);
  const navigate = useNavigate();
  return (
    <Section>
      {filteredAirports === []
        ? unfilteredAirports.map((airports) => (
            <Card
              ref={markerInfo[0] === airports.faa_ident ? refProp : null}
              key={nanoid()}
              className={markerInfo[0] === airports.faa_ident ? "active" : ""}
              onClick={() => navigate(`/InfoPage/${airports.faa_ident}`)}
            >
              <p><i className="fa-solid fa-building"></i>{" "}{airports.facility_name}</p>
              <p>
              <i class="fa-solid fa-location-crosshairs"></i> {" "}{airports.city}, {airports.state_full}
              </p>
              <p><i className="fa-solid fa-phone"></i> {" "}{airports.manager_phone}</p>
              {airports.status === "O" ? "Currently Open" : "Currently Closed"}
            </Card>
          ))
        : filteredAirports.map((airports) => (
            <Card
              ref={markerInfo[0] === airports.faa_ident ? refProp : null}
              key={nanoid()}
              className={markerInfo[0] === airports.faa_ident ? "active" : ""}
              onClick={() => navigate(`/InfoPage/${airports.faa_ident}`)}
            >
              <p><i className="fa-solid fa-building"></i>{" "}{airports.facility_name}</p>
              <p>
              <i class="fa-solid fa-location-crosshairs"></i> {" "}{airports.city}, {airports.state_full}
              </p>
              <p> <i className="fa-solid fa-phone"></i>{" "}{airports.manager_phone}</p>
              {airports.status === "O" ? "Currently Open" : "Currently Closed"}
            </Card>
          ))}
    </Section>
  );
};

export default List;

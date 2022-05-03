import airports from "../airports.json";
import { useState, useEffect } from "react";

const List = () => {
  const getCodes = () => {
    const usAirports = airports.filter((airport) =>
      airport.country.includes("United States")
    );
    const filteredAirports = usAirports.filter(
      (airport) => airport.runway_length > 12000
    );
    let lon = [];
    let lat = [];
    for (const airports of filteredAirports) {
      lon.push(airports.lon);
      lat.push(airports.lat);
    }
    console.log(lon, lat);
    // return codes;
  };

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
          latitude,
          longitude,
          status,
        } = airportInfo[key][0];

        airportData.push({
          facility_name,
          city,
          county,
          state_full,
          manager,
          latitude,
          longitude,
          status,
        });

        console.log(
          `Airport Name: ${facility_name}`,
          `City: ${city}`,
          `State: ${state_full}`,
          `County: ${county}`,
          `Current Manager: ${manager}`,
          `Latitude: ${latitude}`,
          `Longitude: ${longitude}`,
          `Current Status: ${status}`
        );
      }
    }
    console.log(airportData);
  };
  getData();

  return <h1>List will go here</h1>;
};

export default List;

import airports from "../airports.json";
import { useState, useEffect } from "react";

const List = () => {
  const getCodes = () => {
    const usAirports = airports.filter((airport) =>
      airport.country.includes("United States")
    );
    let codes = [];
    for (const airports of usAirports) {
      codes.push(airports.code);
    }
    return codes;
  };

  const getData = async () => {
    const res = await fetch(
      `https://api.aviationapi.com/v1/airports?apt=${getCodes()}`
    );
    const data = await res.json();
    console.log(data);
  };
  getData();

  return <h1>List will go here</h1>;
};

export default List;

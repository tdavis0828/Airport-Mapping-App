import { Map, Marker } from "pigeon-maps";
import airports from "../airports.json";
import { useState, useEffect } from "react";

const MyMap = (props) => {
  const [latLon, setLatLon] = useState([]);

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
        let latLongValues = [airports.lat, airports.lon];
        latLon.push(latLongValues);
      }
      setLatLon(latLon);
    };
    getLatLon();
  }, []);

  console.log(latLon);
  return (
    <Map
      height={props.height}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={11}
    >
      {latLon.map((value) => (
        <Marker
          width={50}
          anchor={[parseFloat(value[0]), parseFloat(value[1])]}
        />
      ))}
    </Map>
  );
};

export default MyMap;

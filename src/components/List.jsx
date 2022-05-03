import airports from "../airports.json";
import { useState, useEffect } from "react";
import { Map, Overlay } from "pigeon-maps"
import Airport from "../components/Airport_Pin.png"



const List = () => {
const [lati, setLati] = useState([])
const [long, setLong] = useState([])

  useEffect(() => {
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
      setLati(lat.map(num => Number(num)));
      setLong(lon.map(num => Number(num)))
    }
   

  }, [])
  console.log(long);
  console.log(lati)

  

  const arrCoordinates = [lati, long];

  const MultipleMarkers = () => {
  return arrCoordinates.map((coordinata, index) => {
    return <Overlay key={index} anchor={coordinata}>
      <img src={Airport} width={50} height={50} alt='' />
    </Overlay>;
  });
}
  

  // const getData = async () => {
  //   const res = await fetch(
  //     `https://api.aviationapi.com/v1/airports?apt=${getCodes()}`
  //   );
  //   const airportInfo = await res.json();

  //   let airportData = [];
  //   console.log(airportInfo);
  //   for (const key in airportInfo) {
  //     if (airportInfo[key].length) {
  //       const {
  //         city,
  //         facility_name,
  //         county,
  //         state_full,
  //         manager,
  //         latitude,
  //         longitude,
  //         status,
  //       } = airportInfo[key][0];

  //       airportData.push({
  //         facility_name,
  //         city,
  //         county,
  //         state_full,
  //         manager,
  //         latitude,
  //         longitude,
  //         status,
  //       });

  //       console.log(
  //         `Airport Name: ${facility_name}`,
  //         `City: ${city}`,
  //         `State: ${state_full}`,
  //         `County: ${county}`,
  //         `Current Manager: ${manager}`,
  //         `Latitude: ${latitude}`,
  //         `Longitude: ${longitude}`,
  //         `Current Status: ${status}`
  //       );
  //     }
  //   }
  //   console.log(airportData);
  // };
  // getData();



  

  return (
    <div>
      {/* <p>{lati}</p>
      <p>{long}</p> */}
      {/* <p>{latitude}</p>
      <p>{longitude}</p> */}
    
      <Map height={600} width={1000} defaultCenter={[lati, long]} defaultZoom={11}>
      <MultipleMarkers />
       
    </Map> 

    </div>
  );
  
};

export default List;
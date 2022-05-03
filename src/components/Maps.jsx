import React from "react"
import { Map, Overlay } from "pigeon-maps"
import Airport from "../components/Airport_Pin.png"

export function Maps() {
  return (
    <Map height={600} width={1000} defaultCenter={[33.9456, -118.391]} defaultZoom={11}>
        <Overlay anchor={[33.9456, -118.391]} offset={[0, 50]}>
            <img src={Airport} width={50} height={50} alt='' />
        </Overlay>
        <Overlay anchor={[32.7299, -117.195]} offset={[0, 50]}>
            <img src={Airport} width={50} height={50} alt='' />
        </Overlay>
    </Map>
  )
}

export default Maps;
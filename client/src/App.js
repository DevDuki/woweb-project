import React, { useState, useEffect } from 'react'
import {
  Container,
} from 'reactstrap'
import Header from './components/Header'
import JourneyForm from './components/JourneyForm'
import JourneyContainer from './components/JourneyContainer'

let map = new window.SearchChMap({ from: '', to: '', routemode:"oev", controls:"all" });



const App = () => {  

  const [departureLoc, setDepartureLoc] = useState('')
  const [arrivalLoc, setArrivalLoc] = useState('')
  const [municipality, setMunicipality] = useState([])
  const [date, setDate] = useState('')

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//map.search.ch/api/map.js?lang=de";
    script.async = true;
  
    document.body.appendChild(script);

    map.addEventListener('change', async () => {
      if(map.route) {

        const baseUrl = "https://api3.geo.admin.ch/rest/services/api/MapServer/identify?";

        const layers = "all:ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill";

        let stops = []
        if(map.route.pois) stops = Object.entries(map.route.pois).flat().filter(stop => stop instanceof Object)

        stops = stops.concat(map.route.waypoints)

        const response = await fetch(
          `${baseUrl}sr=4326&geometry=${JSON.stringify({ paths: [stops.map(point => [point.lon, point.lat])]})}&geometryType=esriGeometryPolyline&tolerance=0&returnGeometry=false&lang=de&layers=${layers}` 
        )
      
        const data = await response.json()

        const municipalityData = data.results.map(d => {
          return {
            bfsNr: d.id,
            canton: d.attributes.kanton,
            municipalityName: d.attributes.gemname
          }
        })

        setMunicipality(municipalityData)
      }
    })
  }, [])
  
  

  const styleObj = {
    maxWidth: "100vw",
    height: "500px",
    border: "2px inset #ccc",
    marginTop: "2rem"
  }

  const handleSubmit = () => {
    map.set({ from: departureLoc, to: arrivalLoc, routemode:"oev", controls:"all" })
  }

  return (
    <Container>
      <Header 
        title={'Corona Navigator'} 
        subtitle={'Tragen Sie Ihren Streckenabschnitt ein und finden Sie riskante Gebiete auf Ihrem Weg'} 
      />
      <JourneyForm updateJourneyDetails={handleSubmit} setDepartureLoc={setDepartureLoc} setArrivalLoc={setArrivalLoc} setDate={setDate} />
      <div id="mapcontainer" style={styleObj}></div>
      <JourneyContainer municipalities={municipality} departureLoc={departureLoc} arrivalLoc={arrivalLoc} date={date} />
    </Container>  
  );
}

export default App;

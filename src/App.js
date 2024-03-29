import React, { useState, useEffect } from 'react'
import {
  Container,
} from 'reactstrap'
import Header from './components/Header'
import JourneyForm from './components/JourneyForm'
import JourneyContainer from './components/JourneyContainer'

let map = new window.SearchChMap({ from: '', to: '', routemode:"oev", controls:"all" });

const kantonsServices = {
  ZH: 'https://jagd.ddns.net/api',
  GR: 'https://gr.corona-navigator.ch/v1',
  BS: 'https://86.119.34.31',
  BL: 'https://86.119.34.31',
  TG: 'https://thurgau.entry-check.ch/api/v1',
  AG: 'https://covid-navigator.ch/api',
  ZG: 'http://86.119.34.76/kantonsservice-zug',
  BE: 'https://bern.coronanavigator.ch',
  SO: 'https://conav.dvob.ch/api/v1',
  LU: 'https://86.119.34.70',
  SZ: 'https://86.119.43.84/api',
  SG: 'https://86.119.43.232:8888',
  FR: 'https://service-devl.wodss12.cf',
}



const App = () => { 

  const [departureLoc, setDepartureLoc] = useState('')
  const [arrivalLoc, setArrivalLoc] = useState('')
  const [municipality, setMunicipality] = useState([])
  const [date, setDate] = useState('')
  const [boolean, setBoolean] = useState(false)  
  const [tableContent, setTableContent] = useState([])

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

  useEffect(() => {
    if(!boolean) return
    fetchData()
    setBoolean(false)
  }, [municipality])


  const muniWithUrls = municipality.map(muni => {
    if(kantonsServices[muni.canton]){
      const urlMunicipality = `${kantonsServices[muni.canton]}/municipalities/${muni.bfsNr}`
      const urlIncidences = `${kantonsServices[muni.canton]}/incidences/${muni.bfsNr}?dateFrom=${date}&dateTo=${date}`
      return {
        bfsNr: muni.bfsNr,
        canton: muni.canton,
        municipalityName: muni.municipalityName,
        urlIncidences,
        urlMunicipality
      }
    }
  }).filter(muni => muni !== undefined)
  
  const fetchData = () => {
    let content = []

    muniWithUrls.forEach(muni => {
      fetch(muni.urlIncidences)
        .then(response => response.json())
        .then(data => {
          const tripData = {
            canton: muni.canton,
            municipalityName: muni.municipalityName,
            incidences: data[0]
          }
          content = [...content, tripData]
        })
        .then(() => {
          setTableContent(content)
        })
        .catch(err => console.error(err))
    })
  }

  const styleObj = {
    maxWidth: "100vw",
    height: "500px",
    border: "2px inset #ccc",
    marginTop: "2rem"
  }

  const handleSubmit = () => {
    map.set({ from: departureLoc, to: arrivalLoc, routemode:"oev", controls:"all" })
    setBoolean(true)
  }

  return (
    <Container>
      <Header 
        title={'Corona Navigator'} 
        subtitle={'Tragen Sie Ihren Streckenabschnitt ein und finden Sie riskante Gebiete auf Ihrem Weg'} 
      />
      <JourneyForm updateJourneyDetails={handleSubmit} setDepartureLoc={setDepartureLoc} setArrivalLoc={setArrivalLoc} setDate={setDate} />
      <div id="mapcontainer" style={styleObj}></div>
      <JourneyContainer content={tableContent} from={departureLoc} to={arrivalLoc} date={date} />
    </Container>  
  );
}

export default App;

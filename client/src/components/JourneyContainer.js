import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import JourneyTableElement from './JourneyTableElement'

const kantonsServices = {
  ZH: 'https://jagd.ddns.net/api',
  GR: 'https://gr.corona-navigator.ch/v1',
  // BS: 'https://86.119.34.31',
  // BL: 'https://86.119.34.31',
  TG: 'https://thurgau.entry-check.ch/api/v1',
  AG: 'https://covid-navigator.ch/api',
  // ZG: 's',    
  BE: 'https://bern.coronanavigator.ch',
  SO: 'https://conav.dvob.ch/api/v1',
  // LU: 'https://86.119.34.70',
  // SZ: 'https://86.119.43.84/api',
  // SG: 'https://86.119.43.232:8888',
  // FR: 'https://service-devl.wodss12.cf',
}


const stoppingPlaces = [
  {'station': 'Zürich HB', 'incidence': 24},
  {'station': 'Stettbach', 'incidence': 54},
  {'station': 'Frauenfeld', 'incidence': 35},
  {'station': 'Oerlikon', 'incidence': 12},
]

const JourneyContainer = ({ municipalities, departureLoc, arrivalLoc, date }) => {

  // console.log(municipalities)

  const muniWithUrls = municipalities.map(muni => {
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

  console.log(muniWithUrls)

  const [tableContent, setTableContent] = useState([])

  // useEffect(() => {
  //   fetchData()
  // }, [municipalities])

  // const fetchData = async () => {
  //   const content = await Promise.all(muniWithUrls.map(async (muni) => {
  //     console.log(muni)
  //     const incidenceResponse = await fetch(muni.urlIncidences, { })
  //     const incidenceData = await incidenceResponse.json()

  //     return {
  //       canton: muni.canton,
  //       municipalityName: muni.municipalityName,
  //       incidences: incidenceData
  //     }
  //   }))

  //   console.log('content', tableContent)
  //   setTableContent(content)
  // }

  

  // incidences/:bfsNr?dateFrom=YYYY-MMM-DD&dateTo=YYYY-MM-DD

  return (
    <>
      <h2 style={{ marginTop: '2rem' }}>Haltestellentabelle</h2>
      <p>Von {departureLoc} bis {arrivalLoc}</p>
      <Table>
        <thead>
          <tr>
            <th>Kanton</th>
            <th>Gemeinde</th>
            <th>Inzidenzwert</th>
          </tr>
        </thead>
        <tbody>
          {stoppingPlaces.map(stop => 
            <JourneyTableElement key={stop.station} station={stop.station} incidence={stop.incidence} />
          )}
        </tbody>
      </Table>
    </>
  )
}

export default JourneyContainer
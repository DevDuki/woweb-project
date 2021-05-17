import React from 'react'
import { Table } from 'reactstrap'
import JourneyTableElement from './JourneyTableElement'


const JourneyContainer = ({ content, departureLoc, arrivalLoc }) => {

  const incidences = content.map(contentElement => contentElement.incidences.incidence)
  const highestIncidence = Math.max(...incidences)

  console.log('highest', highestIncidence)

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
          {content.map((contentElement, index) => 
            <JourneyTableElement key={index} canton={contentElement.canton} municipality={contentElement.municipalityName} incidence={Math.floor(contentElement.incidences.incidence)} highestIncidence={highestIncidence} />
          )}
        </tbody>
      </Table>
    </>
  )
}

export default JourneyContainer
import React from 'react'
import { Table } from 'reactstrap'
import JourneyTableElement from './JourneyTableElement'


const JourneyContainer = ({ content, from, to, date }) => {

  const incidences = content.map(contentElement => contentElement.incidences.incidence)
  const highestIncidence = Math.max(...incidences)


  return (
    <>
      <h2 style={{ marginTop: '2rem' }}>Inzidenzentabelle</h2>
      <p>{date ? `Von ${from} nach ${to} am ${date.substr(8,2)}.${date.substr(5,2)}.${date.substr(0,4)}` : 'Bitte wählen Sie eine Route aus'}</p>
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
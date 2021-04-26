import React from 'react'
import { Table } from 'reactstrap'
import JourneyTableElement from './JourneyTableElement'

const stoppingPlaces = [
  {'station': 'Zürich HB', 'incidence': 24},
  {'station': 'Stettbach', 'incidence': 54},
  {'station': 'Frauenfeld', 'incidence': 35},
  {'station': 'Oerlikon', 'incidence': 12},
]

const JourneyContainer = ({ departureLoc, arrivalLoc}) => {
  return (
    <>
      <h2 style={{ marginTop: '2rem' }}>Haltestellentabelle</h2>
      <p>Von {departureLoc} bis {arrivalLoc}</p>
      <Table>
        <thead>
          <tr>
            <th>Station</th>
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
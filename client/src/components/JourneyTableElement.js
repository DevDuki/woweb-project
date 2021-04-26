import React from 'react'

const JourneyStop = ({ station, incidence }) => {
  return (
    <tr>
      <td>{station}</td>
      <td>{incidence}</td>
    </tr>
  )
}

export default JourneyStop
import React from 'react'

const JourneyStop = ({ canton, municipality, incidence, highestIncidence }) => {
  const ratio = Math.ceil(incidence / highestIncidence * 100)

  const bgColor = ratio >= 75
    ? '#ff0101bd' : ratio >= 50
    ? 'orange' : ratio >= 25
    ? 'yellow' : '#31dc31'

  return (
    <tr>
      <td>{canton}</td>
      <td>{municipality}</td>
      <td style={{ background: bgColor }}>{incidence}</td>
    </tr>
  )
}

export default JourneyStop
import React, { useState } from 'react'
import {
  Container,
} from 'reactstrap'
import Header from './components/Header'
import JourneyForm from './components/JourneyForm'
import JourneyContainer from './components/JourneyContainer'

const App = () => {

  const [departureLoc, setDepartureLoc] = useState('')
  const [arrivalLoc, setArrivalLoc] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')


  const handleSubmit = (departure, arrival, date, time) => {
    setDepartureLoc(departure)
    setArrivalLoc(arrival)
    setDate(date)
    setTime(time)
  }

  return (
    <Container>
      <Header 
        title={'Corona Navigator'} 
        subtitle={'Tragen Sie Ihren Streckenabschnit ein und finden Sie riskante Gebiete auf Ihrem Weg'} 
      />
      <JourneyForm updateJourneyDetails={handleSubmit} />
      <JourneyContainer departureLoc={departureLoc} arrivalLoc={arrivalLoc} />
    </Container>
  );
}

export default App;

import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Button,
} from 'reactstrap'

const JourneyForm = ({ updateJourneyDetails, setDepartureLoc, setArrivalLoc, setDate }) => {

  const updateDeparture = (event) => setDepartureLoc(event.target.value)
  const updateArrival = (event) => setArrivalLoc(event.target.value)
  const updateDate = (event) => setDate(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    updateJourneyDetails()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="departureLoc">Von</Label>
            <Input 
              onChange={updateDeparture} 
              type="text" 
              name="departureLoc" 
              id="departureLoc" 
              placeholder="Abfahrtsort" 
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="arrivalLoc">Nach</Label>
            <Input 
              onChange={updateArrival} 
              type="text" name="arrivalLoc" 
              id="arrivalLoc" 
              placeholder="Ankunftsort" 
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input
            onChange={updateDate}
            type="date"
            name="date"
            id="exampleDate"
            placeholder="date placeholder"
          />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary">Route berechnen</Button>
    </Form>
  )
}

export default JourneyForm
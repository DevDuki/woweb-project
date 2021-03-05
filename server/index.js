const express = require("express")

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api', (request, response) => {
  response.json({ message: 'Hello from server!' })
})

app.get('/:kanton', (request, response) => {
  const kanton = request.params.kanton

  fetch(`/api/from/kantonsService/${kanton}`)
    .then((response) => response.json())
})


// Für Kantonsservice?
/*
app.get('/ZG', (request, response) => {
  const ZGDataForOtherStudents = {}
  fetch('api/from/covidPage')
    .then((response) => response.json())
    .then((data) => {
      * do something with data that fits the needs for other students
      * example: ZGDataForOtherStudents.gemeinden = data.gemeinden
      * etc...
    })
  
  * After ZGDataForOtherStudents has been fileld with necessary data
  response.json(ZGDataForOtherStudents)
})
*/

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
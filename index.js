const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

let counter = 0

app.get("/counter", (req, res) => {
  console.log('im here')
  res.json({counter})
})

app.delete("/counter", (req, res) => {
  counter = 0

  res.json({counter})
})


const port = 3030
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
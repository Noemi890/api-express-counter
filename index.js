const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const counters = require("./counters")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const findCounter = (name) => {
  const found = counters.find(counter => counter.name === name)

  if (found) return found
  else throw new Error("No counter found")
}

app.get("/counters", (req, res) => {
  console.log('im here')
  res.json(counters)
})

app.delete("/counters/:name", (req, res) => {
  const name = req.params.name

  const counter = findCounter(name)

  counter.value = 0

  res.json({counter})
})

app.post("/counters/:name/increment", (req, res) => {
  const name = req.params.name
  let counter = findCounter(name)
  counter.value++

  res.json({counter})
})

app.post("/counters/:name/decrement", (req, res) => {
  const name = req.params.name
  let counter = findCounter(name)
  counter.value--

  res.json({counter})
})

app.post("/counters/:name/double", (req, res) => {
  const name = req.params.name
  let counter = findCounter(name)
  counter.value *= 2

  res.json({counter})
})

app.put("/counters/:name", (req, res) => {
  if (req.query.value) {
    const value = Number(req.query.value)
    const name = req.params.name
    const counter = findCounter(name)
    counter.value = value
    res.json(counter)
  }

})


const port = 3030
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`)
})
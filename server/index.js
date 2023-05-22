require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const { rateLimiter } = require('./rateLimiter')
const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(rateLimiter())

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_KEY
})
const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })


app.post('/', async (req, res, next) => {
    try {
        const { chats } = req.body
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are Lola, and you can help with any tasks" }, ...chats],
            temperature: 0.2,
            n: 3
        })
    res.send({ responses: completion.data.choices})
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, async () => {
    console.log(`App is listening on port ${PORT}`)
})

module.exports = app
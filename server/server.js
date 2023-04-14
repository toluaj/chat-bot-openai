const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({origin: 'http://localhost:3000'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_KEY
})
const openai = new OpenAIApi(configuration)


app.post('/', async (req, res, next) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: req.body.question}],
        temperature: 0.2,
        n: 3
    })
    res.send({ responses: completion.data.choices})
})

app.listen(PORT, async () => {
    console.log(`App is listening on port ${PORT}`)
})
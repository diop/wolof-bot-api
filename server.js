const express = require('express')
const app = express()

const translations = require('translations.json')
const definitions = require('definitions')

app.get('/', (req, res) => {
  const { word, language } = req.query

  const wordInfo = {
    word: null,
    definition: null
  }

  wordInfo.word = translations.find(t => t[language] === word)

  wordInfo.definition = definitions[wordInfo.word.en]

  res.send(wordInfo)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on', port))

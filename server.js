const express = require('express')
const app = express()

const translations = require('./translations.json')
const definitions = require('./definitions.json')

app.get('/', (req, res) => {
  const { word, language } = req.query

  if (!word) {
    res.send({message: `You must specify a word in the query string.`})
    return
  }

  const wordInfo = {
    word: null,
    definition: null
  }

  wordInfo.word = translations.find(t => {
    return t.en === word || t.wo === word
  })

  if (!wordInfo.word)
    res.send({message: `Word ${word} not found.`})

  wordInfo.definition = definitions[wordInfo.word.en]

  res.send(wordInfo)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on', port))

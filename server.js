const express = require('express')
const app = express()

const wordsArray = require('./words.json')
const wordsHash = makeHash(wordsArray)

function makeHash(inputArray) {
  const result = {}

  inputArray.forEach(wordObject => {
    result[wordObject.word.en] = wordObject
    result[wordObject.word.wo] = wordObject
  })

  return result
}

app.get('/', (req, res) => {
  const { word } = req.query

  if (!word) {
    res.send({message: `You must specify a word in the query string.`})
    return
  }

  const wordInfo = wordsHash[word]

  if (!wordInfo) {
    res.send({message: `Word ${word} not found.`})
    return
  }

  res.send(wordInfo)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on', port))

module.exports = app

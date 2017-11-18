const express = require('express')
const app = express()

const translations = require('translations.json')

app.get('/', (req, res) => {
  const { word, language } = req.query

  const translation = translations.find(t => t[language] === word)



  res.send()
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Listening on', port))

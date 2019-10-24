import express from "express"
import React from "react"
import { renderToString } from "react-dom/server"
import fs from "fs"
import ProviderApp from "../src/components/ProviderApp"
import { StaticRouter } from 'react-router-dom'

const PORT = process.env.PORT || 3000

const html = fs.readFileSync("dist/index.html").toString()

const app = express()

app.use("/dist", express.static("dist"))
app.use((req, res) => {
  const context = {}
  const reactMarkup = (
    <StaticRouter location={req.url} context={context}>
      <ProviderApp />
    </StaticRouter>
  )
  res.send(html.replace('<div id="root"></div>', `<div id="root">${renderToString(reactMarkup)}</div>`))
  res.end()
})

console.log(`listening on ${PORT}`)
app.listen(PORT)
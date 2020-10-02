"use strict"
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const DatabaseManager = require("./database-manager")

const port = 3001
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

const databaseManager = new DatabaseManager()

server.post("/createAccount", (req, res) =>
  databaseManager.createAccount(req, res)
)

server.post("/saveMoney", (req, res) => {
  databaseManager.saveMoney(req, res)
})

server.post("/saveNewSkin", (req, res) => {
  databaseManager.saveNewSkin(req, res)
})

server.post("/equipSkin", (req, res) => {
  databaseManager.equipSkin(req, res)
})

server.post("/getAccountProgress", (req, res) =>
  databaseManager.getAccountProgress(req, res)
)

server.post("/getLevelScoresAndNicknames", (req, res) =>
  databaseManager.getLevelScoresAndNicknames(req, res)
)
server.post("/getLevelScoreByNickname", (req, res) => {
  databaseManager.getLevelScoreByNickname(req, res)
})

server.post("/postLevelScore", (req, res) => {
  databaseManager.postLevelScore(req, res)
})

server.get("/getConfigurations", (req, res) =>
  databaseManager.getConfigurations(res)
)

server.listen(port, () => databaseManager.connectDatabase())

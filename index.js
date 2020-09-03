const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const usersRouter = require("./users/users-router")
const db = require("./data/config")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUnitiialized: false,
    secret: "keep it secret, keep it safe",
    store: new KnexSessionStore({
        knex: db,
        createTable: true,
    }),
}))

server.use(usersRouter)

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})
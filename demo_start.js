/* globals require, __dirname */

var express = require("express")
var app = express()

app.use(express.static("dist")) //serves the index.html
app.use("/example", express.static(__dirname + "/example")) //serves the index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/example/index.html")
})
app.listen(3000) //listens on port 3000 -> http://localhost:3000/

const path = require("path")
const https = require("https");
const fs = require("fs")

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require('helmet');
const morgan = require("morgan")
const useragent = require('express-useragent');
const cors = require("cors")

const app = express();

const adminRouter = require("./routers/admin")
const authorRouter = require("./routers/author")

dotenv.config()

// mongodb username : admin
// mongodb password : ASMNlkA3Cg48dLm4

const MONGO_URL = "mongodb+srv://admin:ASMNlkA3Cg48dLm4@cluster0.uzsw1.mongodb.net/main?retryWrites=true&w=majority"


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log("[!] - haven't connected to MongoDB")
    else console.log("[+] - have conncted successfully ")
})


app.use(cors({
    origin: "*"
}));
app.use(express.json({ limit: '25mb' }));
// app.use(express.json());
app.use(express.urlencoded({ limit: '25mb' }));
app.use(helmet())
app.use(morgan("common"))
app.use(useragent.express());

// app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/api/admin", adminRouter)
app.use("/api/author", authorRouter)

const port = process.env.PORT || 8700

app.listen(port, () => {
    console.log("[+] - server : listen port --> " + port)
})



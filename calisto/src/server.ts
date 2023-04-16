import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import compression from "compression"
import expressWinston from "express-winston"
import winston from "winston"
import { Server } from 'socket.io';
import cors from "cors"
import http from "http"

import { resolve } from "path"

import { route } from "./routes"

const app = express()

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATH"]
    }
});



io.on('connection', (socket: any) => {
    console.log("ID: ", socket.id);
    
    socket.join(socket.id)
    socket.on("/user", ({ email }) => {
        console.log(email);
        socket.join(email)
    })

    socket.on("/new-balance", (balance) => {
        io.sockets.in(socket.id).emit('message', { update: true })
    })


})

app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD, PATH")
    response.header("Access-Control-Allow-Headers", "*")
    next()
})
// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     )
// }));

app.use(cors())
app.use(compression())
app.use(express.json())

app.use("/comprovante-pagamentos", express.static(resolve(__dirname, "public")))
app.use(route)

// @ts-ignore
serverHttp.listen(process.env.PORT || 4005, "0.0.0.0", () => {
    console.log(`server running... 🐱‍🏍 http://0.0.0.0:${process.env.PORT}`)
})


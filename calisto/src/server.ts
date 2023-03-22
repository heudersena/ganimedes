import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import compression from "compression"
import expressWinston from "express-winston"
import winston from "winston"
import { Server } from 'socket.io';
import http from "http"

import { resolve } from "path"

import { route } from "./routes"

const app = express()
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

let userEmail: string | undefined = ""

app.use((request: Request, response: Response, next: NextFunction) => {
    userEmail = request.user?.content?.email
    console.log("IO::userEmail", userEmail);
    next()
})



io.on('connection', (socket: any) => {
    if (userEmail != undefined) {
        socket.leave(userEmail)
    }

    socket.emit('socket connection', {
        connection: 'success'
    })

    console.log("IO: ", socket)

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

app.use(compression())
app.use(express.json())

app.use("/comprovante-pagamentos", express.static(resolve(__dirname, "public")))
app.use(route)

// @ts-ignore
app.listen(process.env.PORT || 4005, "0.0.0.0", () => {
    console.log(`server running... 🐱‍🏍 http://0.0.0.0:${process.env.PORT}`)
})
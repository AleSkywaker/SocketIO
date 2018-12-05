import express from "express";
import { SERVER_PORT } from "../global/enviroment";
import socketIO from "socket.io";
import http from "http";

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  private httpServer: http.Server;

  public io: socketIO.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log("Escuchando conexiones - sockets");

    this.io.on("connection", cliente => {
      console.log("Cliente conectado");
    });
  }

  start(callback: Function) {
    this.app.listen(this.port, callback);
  }
}

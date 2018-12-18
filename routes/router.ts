import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/socket";

const router = Router();

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = { cuerpo, de };

  const server = Server.instance;

  server.io.emit("mensaje-nuevo", payload);

  res.json({
    ok: true,
    mensaje: "Todo esta bien!!!"
  });
});
router.post("/mensajes/:id", (req: Request, res: Response) => {
  var cuerpo = req.body.cuerpo;
  var de = req.body.de;
  var id = req.params.id;

  const payload = {
    de,
    cuerpo
  };

  const server = Server.instance;

  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    mensaje: `POST - LISTO ${cuerpo} ${de} ${id} NUEVO`
  });
});

//Servicio para obtener todos los ids de  los usuarios
router.get("/usuarios", (req: Request, res: Response) => {
  const server = Server.instance;

  //clients devuelve un callback, cuyo primer argumento es un error y segundo son los ids
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clientes
    });
  });
});

//Obtner usuarios y sus nombres
router.get("/usuarios/detalle", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  });
});

export default router;

import { Router, Request, Response } from "express";

const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Todo esta bien!!!"
  });
});
router.post("/mensajes/:id", (req: Request, res: Response) => {
  var nombre = req.body.name;
  var apellido = req.body.surname;
  var id = req.params.id;
  res.json({
    ok: true,
    mensaje: `POST - LISTO ${nombre} ${apellido} ${id} NUEVO`
  });
});
export default router;

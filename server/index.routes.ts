import { Router } from "express";
import { postMessageHandler } from "./handlers/message/postMessageHandler";
import { getEmployerHandler } from "./handlers/employer/getEmployerHandler";
import { updateEmployerHandler } from "./handlers/employer/updateEmployerHandler";
import { createEmployerHandler } from "./handlers/employer/createEmployerHandler";
import { deleteEmployerHandler } from "./handlers/employer/deleteEmployerHandler";

export const apiRouter = Router()

apiRouter.post('/message', postMessageHandler)
apiRouter.post('/employer', createEmployerHandler)
apiRouter.get('/employer', getEmployerHandler)
apiRouter.put('/employer', updateEmployerHandler)
apiRouter.delete('/employer', deleteEmployerHandler)
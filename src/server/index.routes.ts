import { Router } from "express";
import { postMessageHandler } from "./handlers/postMessageHandler";
import { getDataHandler } from "./handlers/getDataHandler";

export const apiRouter = Router()

apiRouter.post('/message', postMessageHandler)
apiRouter.get('/data', getDataHandler)
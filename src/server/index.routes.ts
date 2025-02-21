import { Router } from "express";
import { postMessageHandler } from "./handlers/postMessageHandler";
import { getDataHandler } from "./handlers/getDataHandler";
import { putDataHandler } from "./handlers/putDataHandler";

export const apiRouter = Router()

apiRouter.post('/message', postMessageHandler)
apiRouter.get('/data', getDataHandler)
apiRouter.put('/data', putDataHandler)
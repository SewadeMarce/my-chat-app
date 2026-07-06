import { Router } from "express";
import authRouter from "./routers/auth.route.ts";
import messagesRouter from "./routers/message.route.ts";

const apiRouter = Router()

apiRouter.use('/auth',authRouter)
apiRouter.use('/messages',messagesRouter)
export default apiRouter;
import { Router } from "express";
import authRouter from "./routers/auth.route.ts";

const apiRouter = Router()

apiRouter.use('/api',(req,res)=>res.send("L'API fonctionne !"))
apiRouter.use('/auth',authRouter)

export default apiRouter;
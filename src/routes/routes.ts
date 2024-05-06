import { Router, Request, Response } from "express";
import sendMessage from "./sendMessage";

export default (router: Router) => {
    /**
     * HealthCheck
     */
    router.use('/healthcheck', (req: Request, res: Response) => res.json(":)"));

    sendMessage(router);

    return router;
}
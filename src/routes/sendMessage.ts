import { Router, Request, Response } from "express";
import SendMessage from "../services/sendMessage";

export default (router: Router) => {
    router.post(
        '/send-message',
        async (req: Request, res: Response): Promise<any> =>
            res.json(await (new SendMessage(req.body)).execute())
    );

    return router;
};

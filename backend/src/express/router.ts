import { main } from './chess/main';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServerError } from './error';

const appRouter = Router();

let lock = false;

appRouter.post('/api/:gameString', (req, res) => {
    if (lock) {
        res.status(StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS).send('busy');
        return;
    }

    lock = true;
    res.send(main(req.body.board, req.params.gameString));
    lock = false;
});

appRouter.use('/isAlive', (_req, res) => {
    res.status(StatusCodes.OK).send('alive');
});

appRouter.use('*', (_req, res, next) => {
    if (!res.headersSent) {
        next(new ServerError(StatusCodes.NOT_FOUND, 'Invalid route'));
    }
    next();
});

export default appRouter;

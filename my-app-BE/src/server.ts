import express from 'express';
import * as Sentry from '@sentry/node';
import type { NextFunction, Request, Response } from 'express';
import { zodiosContext } from '@zodios/express';
import { makeApi, makeEndpoint, makeParameters} from '@zodios/core';
import { z, ZodError } from 'zod';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext, tRPCRouter } from './tRPCRouter/_tRPC';
// Tạo ngữ cảnh Zodios
const ctx = zodiosContext();

// Tạo instance của Express
const expressInstance = express();

const parameters = makeParameters([
  {
    name: 'name',
    type: 'Query',
    schema: z.string(),
  },
]);
// Định nghĩa API
const api = makeApi([
  makeEndpoint({
    method: 'get',
    path: '/hello',
    parameters,
    response: z.object({
      message: z.string(),
    })
  }),
]);
// Middleware để xử lý query parameters

const _app = ctx.app(api, {
  express: expressInstance,
  enableJsonBodyParser: true,
  validate: true,
  transform: true,
  validationErrorHandler: (err, _req, res, next: NextFunction) => {
    if (err instanceof ZodError) {
      console.error('Validation error:', err);
      res.status(400).json({ error: 'Invalid input' });
    } else {
      next(err);
    }
  },
});
_app.use(Sentry.expressErrorHandler());

_app.use('/trpc',createExpressMiddleware({
  router: tRPCRouter,
  createContext
}),
);

_app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  next(err)
  return res.json();
});


// Khởi động server
const PORT = process.env.PORT || 5000;
_app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


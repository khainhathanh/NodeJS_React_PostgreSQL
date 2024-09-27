import express from 'express';
import { zodiosContext } from '@zodios/express';
import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext, tRPCRouter } from './tRPCRouter/_tRPC';
// Tạo ngữ cảnh Zodios
const ctx = zodiosContext();
// Định nghĩa API
const api = makeApi([
    {
        method: 'get',
        path: '/hello',
        request: {
            query: z.object({
                name: z.string().optional().default('World'),
            }),
        },
        response: z.object({
            message: z.string(),
        })
    }
]);
// Tạo instance của Express
const expressInstance = express();
// Cấu hình ứng dụng với Zodios
const _app = ctx.app(api, {
    express: expressInstance,
    enableJsonBodyParser: true,
    validate: true,
    transform: true,
    validationErrorHandler: (err, req, res, next) => {
        res.status(400).json({ error: 'Invalid input' });
    },
});
// Thêm một route cơ bản để kiểm tra
expressInstance.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Khởi động server
const PORT = process.env.PORT || 5000;
expressInstance.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
_app.use('/trpc', createExpressMiddleware({
    router: tRPCRouter,
    createContext,
}));
//# sourceMappingURL=server.js.map
import { initTRPC } from '@trpc/server';
// Khởi tạo tRPC
const t = initTRPC.create();
// Định nghĩa router
export const tRPCRouter = t.router({
    hello: t.procedure.query(() => {
        return 'Hello, World!';
    }),
});
// Tạo ngữ cảnh
export const createContext = () => ({}); // Bạn có thể thêm logic để tạo ngữ cảnh ở đây
//# sourceMappingURL=_tRPC.js.map
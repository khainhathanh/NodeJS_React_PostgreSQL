import { initTRPC } from '@trpc/server';
import { z } from 'zod';
// Khởi tạo tRPC
const t = initTRPC.create();

// Định nghĩa router
export const tRPCRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }).optional().default({ name: 'World' }))
    .query(({ input }) => {
      return { message: `Hello ${input.name}!` };
    }),
});

// Tạo ngữ cảnh
export const createContext = () => ({}); // Bạn có thể thêm logic để tạo ngữ cảnh ở đây

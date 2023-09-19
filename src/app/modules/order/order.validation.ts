import { z } from "zod";

const orderSchema = z.object({
  body: z.object({
    userId: z.string(),
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number(),
      })
    )
  })
});

export const orderValidation = { orderSchema };

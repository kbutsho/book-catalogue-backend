import { z } from 'zod';

const createCategory = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required!',
      })
  }),
});

export const CategoryValidation = {
  createCategory
};

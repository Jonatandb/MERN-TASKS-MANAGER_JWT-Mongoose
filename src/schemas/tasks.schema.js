import { z } from 'zod'

export const createTasksSchema = z.object({
  title: z
    .string({
      required_error: 'Title required',
    })
    .min(4, {
      message: 'Title must be at least 4 characters long',
    }),
  description: z
    .string({
      required_error: 'Description required',
    })
    .min(1, {
      message: 'Description must be at least 1 characters long',
    }),
  date: z.string().datetime().optional()
})

import { z } from 'zod'

export const taskEditSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
  status: z.enum(['todo', 'in-progress', 'done'], {
    required_error: 'Please select a status',
  }),
  price: z.number().int().min(0).max(1000),
  durationInHrs: z.number().int().min(1).max(8),
})

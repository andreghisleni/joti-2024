import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const envTrigger = createEnv({
  server: {
    EVOLUTION_API_URL: z.string().min(1),
    EVOLUTION_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    EVOLUTION_API_URL: process.env.EVOLUTION_API_URL,
    EVOLUTION_API_KEY: process.env.EVOLUTION_API_KEY,
  },
  emptyStringAsUndefined: true,
})

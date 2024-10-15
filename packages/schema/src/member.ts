import { z } from 'zod'

export const memberSchema = z
  .object({
    name: z.string().describe('Nome'),
    registerNumber: z.string().describe('Número de registro'),
    registerCode: z.string().describe('Código de registro'),
    phone: z.string().optional().describe('Telefone'),
    email: z.string().describe('E-mail'),
    responsibleName: z.string().describe('Nome do responsável'),
    responsiblePhone: z.string().describe('Telefone do responsável'),
  })
  .describe('Sessão')

export const memberUpdateSchema = memberSchema.merge(
  z.object({
    id: z.string().uuid(),
    sessionId: z.string().uuid(),
  }),
)

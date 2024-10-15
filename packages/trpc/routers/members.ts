import { env } from '@pizza/env'
import { prisma } from '@pizza/prisma'
import { memberSchema, memberUpdateSchema } from '@pizza/schema'
import { sendWhatsAppMessageTrigger } from '@pizza/trigger'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const membersRouter = createTRPCRouter({
  createMembers: protectedProcedure
    .input(
      z.object({
        data: z.array(memberSchema),
      }),
    )
    .mutation(async ({ input }) => {
      const members = await prisma.member.createMany({
        data: input.data.map((d) => ({
          name: d.name
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()),
          // cleanName: d.name
          //   .toLowerCase()
          //   .normalize('NFD')
          //   .replace(/[\u0300-\u036f]/g, ''),
          email: d.email.toLowerCase(),
          responsibleName: d.responsibleName
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()),
          responsiblePhone: d.responsiblePhone.replace(/\D/g, ''),

          phone: d.phone ? d.phone.replace(/\D/g, '') : null,

          registerCode: d.registerCode.toUpperCase(),
          registerNumber: d.registerNumber.toUpperCase(),
        })),
        skipDuplicates: true,
      })

      return { members }
    }),

  updateMember: protectedProcedure
    .input(memberUpdateSchema)
    .mutation(async ({ input }) => {
      const findMember = await prisma.member.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!findMember) {
        throw new Error('Member not found')
      }

      const member = await prisma.member.update({
        where: {
          id: input.id,
        },
        data: input,
      })

      return member
    }),

  getMember: protectedProcedure
    .input(memberUpdateSchema)
    .query(async ({ input }) => {
      const member = await prisma.member.findFirst({
        where: {
          id: input.id,
        },
      })

      return { member }
    }),

  getMembers: protectedProcedure.query(async () => {
    const members = await prisma.member.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return { members }
  }),

  getMemberByRegister: publicProcedure
    .input(
      z.object({
        register: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const member = await prisma.member.findFirst({
        where: {
          registerNumber: input.register,
        },
      })

      return { member }
    }),

  getTotalMembers: protectedProcedure.query(async () => {
    const totalMembers = await prisma.member.count()

    return { totalMembers }
  }),

  sendMessageForAllResponsible: protectedProcedure.mutation(async () => {
    const responsible = await prisma.member.findMany({ take: 1 })

    const taskResponse = await Promise.all(
      responsible.map((responsible) => {
        return sendWhatsAppMessageTrigger('send-whatsapp-message', {
          message: `Olá ${responsible.responsibleName}, como mencionado no grupo dos pais da tropa Soyuz, eu estou passando para confirmar se vocês ainda tem acesso ao email: ${responsible.email}, que está cadastrado no paxtu e é o email que será enviado a senha para acessar a plataforma do joti.
Vocês ainda tem acesso a esse email?`,
          phone:
            env.NODE_ENV === 'production'
              ? `55${responsible.responsiblePhone}`
              : '5549991991579',
        })
      }),
    )

    return { taskResponse, responsible }
  }),
})

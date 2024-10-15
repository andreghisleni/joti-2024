import { createAccount } from '@pizza/joti-api'
import { logger, task } from '@trigger.dev/sdk/v3'
import axios from 'axios'

import { envTrigger } from '../../env'
import { sendWhatsAppMessageTrigger } from '../tasks-trigger'

export const createAccountJotiTask = task({
  id: 'create-account-joti',
  maxDuration: 300, // 5 minutes
  queue: {
    concurrencyLimit: 1,
  },
  run: async (
    payload: { memberId: string; register: string; responsiblePhone: string },
    { ctx },
  ) => {
    logger.log('Create account', { payload, ctx })

    const response = await createAccount({
      register: payload.register,
    })

    logger.log('response', response)

    if (response.status !== 'account created') {
      throw new Error('Failed to create account')
    }

    if (!response.data) {
      throw new Error('Failed to create account')
    }

    await axios.post(`${envTrigger.API_URL}/api/create-account`, {
      memberId: payload.memberId,
      __id: response.data._id,
      date: response.data.date,
      password: response.data.password,
      role: response.data.role,
      email: response.data.email,
      groupName: response.data.groupName,
      groupNumber: response.data.groupNumber,
      name: response.data.name,
      region: response.data.region,
      lgpd: response.data.lgpd,
      register: response.data.register,
      session: response.data.session,
      association: response.data.association,
      active: response.data.active,
      __v: response.data.__v,
    })

    await sendWhatsAppMessageTrigger('send-whatsapp-message', {
      phone: payload.responsiblePhone,
      message: `Olá! Conta no Joti foi criada, verifique o email: ${response.data.email},\nlembrando que é necessário acessar a plataforma do joti o quanto ates para confirmar a conta.`,
    })

    return {
      message: 'Hello, world!',
      response,
    }
  },
})

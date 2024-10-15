import { sendWhatsAppMessage } from '@pizza/evolution-api'
import { logger, task } from '@trigger.dev/sdk/v3'

import { envTrigger } from '../../env'

export const sendWhatsAppMessageTask = task({
  id: 'send-whatsapp-message',
  maxDuration: 300, // 5 minutes
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: {phone: string, message: string}, { ctx }) => { // eslint-disable-line
    logger.log('Send Whatsapp Message', { payload, ctx })

    const response = await sendWhatsAppMessage({
      phone: payload.phone,
      message: payload.message,
      evolutionApi: {
        url: envTrigger.EVOLUTION_API_URL,
        key: envTrigger.EVOLUTION_API_KEY,
      },
    })

    return {
      message: 'Hello, world!',
      response,
    }
  },
})

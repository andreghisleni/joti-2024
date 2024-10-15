import axios from 'axios'
import { z } from 'zod'

const SendMessageResponseSchema = z.object({
  key: z.object({ remoteJid: z.string(), fromMe: z.boolean(), id: z.string() }),
  message: z.object({ extendedTextMessage: z.object({ text: z.string() }) }),
  messageTimestamp: z.string(),
  status: z.string(),
})

type SendMessageResponse = z.infer<typeof SendMessageResponseSchema>

export async function sendWhatsAppMessage({
  phone,
  message,
  evolutionApi,
}: {
  phone: string
  message: string
  evolutionApi: {
    url: string
    key: string
  }
}) {
  try {
    const response = await axios.post<SendMessageResponse>(
      `${evolutionApi.url}`,
      {
        number: phone,
        textMessage: {
          text: message,
        },
        options: {
          delay: 1200,
          presence: 'composing',
          linkPreview: true,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: evolutionApi.key,
        },
      },
    )

    if (response.status !== 201) {
      throw new Error('Failed to send WhatsApp message')
    }

    if (response.data.status !== 'PENDING') {
      throw new Error('Failed to send WhatsApp message')
    }

    return {
      status: 'message sended',
    }
  } catch (err) {
    return {
      status: 'message not sended',
      err,
    }
  }
}

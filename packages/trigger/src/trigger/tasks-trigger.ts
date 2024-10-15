import { tasks } from '@trigger.dev/sdk/v3'

import type { helloWorldTask } from './tasks/example'
import type { sendWhatsAppMessageTask } from './tasks/send-whatsapp-message'

export const helloWorldTrigger = tasks.trigger<typeof helloWorldTask>
export const sendWhatsAppMessageTrigger = tasks.trigger<
  typeof sendWhatsAppMessageTask
>

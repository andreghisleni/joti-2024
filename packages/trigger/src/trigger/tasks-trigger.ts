import { tasks } from '@trigger.dev/sdk/v3'

import { createAccountJotiTask } from './tasks/create-account-joti'
import type { helloWorldTask } from './tasks/example'
import type { sendWhatsAppMessageTask } from './tasks/send-whatsapp-message'
import { syncPaxtuJotiTask } from './tasks/sync-paxtu-joti'

export const helloWorldTrigger = tasks.trigger<typeof helloWorldTask>
export const sendWhatsAppMessageTrigger = tasks.trigger<
  typeof sendWhatsAppMessageTask
>

export const createAccountJotiTrigger = tasks.trigger<
  typeof createAccountJotiTask
>

export const syncPaxtuJotiTrigger = tasks.trigger<typeof syncPaxtuJotiTask>

import { createTRPCClient, httpBatchLink } from '@trpc/client'
import SuperJSON from 'superjson'

import { envTrigger } from './env'

export function getUrl() {
  return envTrigger.API_URL + '/api/trpc'
}

export const trpcLinks = [
  httpBatchLink({
    url: getUrl(),
    transformer: SuperJSON,
  }),
]

export const trpcClient = createTRPCClient({
  links: trpcLinks,
})

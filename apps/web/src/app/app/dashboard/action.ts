'use server'

import { helloWorldTrigger } from '@pizza/trigger'

export async function TestTrigger() {
  helloWorldTrigger('hello-world', { name: 'Teste' })
}

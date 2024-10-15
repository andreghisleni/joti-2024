'use server'

import { helloWorldTrigger } from '@/trigger/tasks-trigguer'

export async function TestTrigger() {
  helloWorldTrigger('hello-world', { name: 'Teste' })
}

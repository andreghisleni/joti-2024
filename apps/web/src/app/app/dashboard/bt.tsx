'use client'

import { Button } from '@/components/ui/button'

import { TestTrigger } from './action'

export function Bt() {
  return <Button onClick={() => TestTrigger()}>Teste</Button>
}

'use client'

import { ShowJson } from '@/components/show-json'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc/react'

import { TestTrigger } from './action'

export function Bt() {
  const { mutate, isPending, data } =
    trpc.sendMessageForAllResponsible.useMutation()

  return (
    <div>
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Carregando' : 'Enviar mensagens'}
      </Button>
      <ShowJson data={data || []} />

      <Button onClick={() => TestTrigger()}>{'Teste'}</Button>
    </div>
  )
}

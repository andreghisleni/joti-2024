'use client'

import { ShowJson } from '@/components/show-json'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc/react'

import { TestTrigger } from './action'

export function Bt() {
  const { mutate, isPending, data } =
    trpc.sendMessageForAllResponsible.useMutation()

  const createAllJotiAccounts = trpc.createAllJotiAccounts.useMutation()

  const members = trpc.getMembers.useQuery()

  return (
    <div>
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Carregando' : 'Enviar mensagens'}
      </Button>
      <ShowJson data={data || []} />

      <Button
        onClick={() => createAllJotiAccounts.mutate()}
        disabled={createAllJotiAccounts.isPending}
      >
        {createAllJotiAccounts.isPending ? 'Carregando' : 'Criar contas'}
      </Button>
      <ShowJson data={createAllJotiAccounts.data || []} />

      <Button onClick={() => TestTrigger()}>{'Teste'}</Button>

      <ShowJson
        data={members.data?.members.map((m) => m.registerNumber) || []}
      />
    </div>
  )
}

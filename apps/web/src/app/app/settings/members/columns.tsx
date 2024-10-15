'use client'

import { RouterOutput } from '@pizza/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { ShowJson } from '@/components/show-json'
import { tdb } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateAccountJotiButton } from './create-account-joti-button'
import { MemberForm } from './member-form'
import { SyncPaxtuJotiButton } from './sync-paxtu-joti-button'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = RouterOutput['getMembers']['members'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Member>[] => [
  tdb('name', 'Nome'),
  tdb('registerNumber', 'Registro'),
  tdb('registerCode', 'Código de registro'),
  tdb('phone', 'Celular'),
  tdb('email', 'E-mail'),
  tdb('responsibleName', 'Nome do responsável'),
  tdb('responsiblePhone', 'Celular do responsável'),
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <CreateAccountJotiButton id={row.original.id} />
        <SyncPaxtuJotiButton id={row.original.id} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ver</Button>
          </DialogTrigger>
          <DialogContent className="min-w-full">
            <ShowJson data={row.original} />
          </DialogContent>
        </Dialog>
        <MemberForm refetch={refetch} member={row.original} />,
      </div>
    ),
  },
]

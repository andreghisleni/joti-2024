'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

import { columns } from './columns'

export type Item = {
  name: string
  registerNumber: string
  registerCode: string
  phone?: string
  email: string

  responsibleName: string
  responsiblePhone: string
}

type ItemImport = {
  Registro: string
  'Nome do associado': string
  Equipe?: string
  Celular?: string
  'E-mail': string
  'Nome Responsável': string
  'Celular Responsável': string
}

export default function MyNextJsExcelSheet() {
  const [items, setItems] = useState<Item[]>([])

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        if (!e.target) {
          return
        }
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, {
          type: 'buffer',
        })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    promise.then((d) => {
      setItems(
        (d as ItemImport[]).map((i) => ({
          name: i['Nome do associado'],
          registerNumber: i.Registro.split(' - ')[0],
          registerCode: i.Registro.split(' - ')[1],
          phone: i.Celular,
          email: i['E-mail'],
          responsibleName: i['Nome Responsável'],
          responsiblePhone: i['Celular Responsável'],
        })),
      )
    })
  }

  const { toast } = useToast()

  const createMembers = trpc.createMembers.useMutation({
    onError: (error) => {
      console.log(error)
      toast({
        title: 'Erro ao cadastrar membros',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Membros cadastrados com sucesso',
      })
    },
  })

  const handleCreate = () => {
    createMembers.mutate({
      data: items.map((item) => ({
        name: item.name,
        email: item.email,
        phone: item.phone,
        registerNumber: item.registerNumber,
        registerCode: item.registerCode,
        responsibleName: item.responsibleName,
        responsiblePhone: item.responsiblePhone,
      })),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Importar membros</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-16">
        <div className="min-w-96">
          <input
            type="file"
            onChange={(e) => {
              if (!e.target.files) {
                return
              }

              const file = e.target.files[0]
              readExcel(file)
            }}
          />
          <ul>
            <li>
              <span>Total de registros: </span> {items.length}
            </li>
          </ul>

          <Button onClick={handleCreate}>Cadastrar membros</Button>
        </div>

        <div>
          <DataTable columns={columns} data={items} />
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import { ColumnDef } from '@tanstack/react-table'

import { tdb } from '@/components/TableDataButton'

import { Item } from './page'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Item>[] = [
  tdb('name', 'Nome'),
  tdb('registerNumber', 'Registro'),
  tdb('registerCode', 'Código de registro'),
  tdb('phone', 'Celular'),
  tdb('email', 'E-mail'),
  tdb('responsibleName', 'Nome do responsável'),
  tdb('responsiblePhone', 'Celular do responsável'),
]

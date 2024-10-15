import axios from 'axios'
import { z } from 'zod'

const dataResponseSchema = z.object({
  __id: z.string(),
  date: z.string(),
  password: z.string(),
  role: z.string(),
  email: z.string(),
  groupName: z.string(),
  groupNumber: z.string(),
  name: z.string(),
  region: z.string(),
  lgpd: z.boolean(),
  register: z.string(),
  session: z.string(),
  association: z.string(),
  active: z.boolean(),
  __v: z.number(),
})

type dataResponse = z.infer<typeof dataResponseSchema>

const dataResponseEmailSchema = z.object({
  email: z.string(),
})

type dataResponseEmail = z.infer<typeof dataResponseEmailSchema>

export async function createAccount({ register }: { register: string }) {
  try {
    const response = await axios.post<dataResponse>(
      `https://api.jotajoti.com.br/user/create/br`,
      {
        register,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status !== 200) {
      throw new Error('Failed to create account')
    }

    return {
      status: 'account created',
      data: response.data,
    }
  } catch (err) {
    return {
      status: 'error',
      err,
    }
  }
}

export async function resetPassword({ register }: { register: string }) {
  try {
    const response = await axios.post<dataResponseEmail>(
      'https://api.jotajoti.com.br/user/reset-password',
      {
        register,
      },
    )

    if (response.status !== 200) {
      throw new Error('Failed to reset password')
    }

    return {
      status: 'password reset',
      data: response.data,
    }
  } catch (err) {
    return {
      status: 'error',
      err,
    }
  }
}

export async function syncPaxtu({ register }: { register: string }) {
  try {
    const response = await axios.put<dataResponse>(
      `https://api.jotajoti.com.br/user/updatePaxtu/${register}`,
    )

    if (response.status !== 200) {
      throw new Error('Failed to sync paxtu')
    }

    return {
      status: 'paxtu synced',
      data: response.data,
    }
  } catch (err) {
    return {
      status: 'error',
      err,
    }
  }
}

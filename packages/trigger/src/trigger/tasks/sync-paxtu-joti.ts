import { syncPaxtu } from '@pizza/joti-api'
import { logger, task } from '@trigger.dev/sdk/v3'
import axios from 'axios'

import { envTrigger } from '../../env'

export const syncPaxtuJotiTask = task({
  id: 'sync-paxtu-joti',
  maxDuration: 300, // 5 minutes
  queue: {
    concurrencyLimit: 1,
  },
  run: async (payload: { memberId: string; register: string }, { ctx }) => {
    logger.log('Sync paxtu', { payload, ctx })

    const response = await syncPaxtu({
      register: payload.register,
    })

    if (response.status !== 'paxtu synced') {
      throw new Error('Failed to sync paxtu')
    }

    if (!response.data) {
      throw new Error('Failed to create account')
    }

    console.log('response', response)
    logger.log('response', response)

    await axios.post(`${envTrigger.API_URL}/api/create-account`, {
      memberId: payload.memberId,
      __id: response.data._id,
      date: response.data.date,
      password: response.data.password,
      role: response.data.role,
      email: response.data.email,
      groupName: response.data.groupName,
      groupNumber: response.data.groupNumber,
      name: response.data.name,
      region: response.data.region,
      lgpd: response.data.lgpd,
      register: response.data.register,
      session: response.data.session,
      association: response.data.association,
      active: response.data.active,
      __v: response.data.__v,
    })

    return {
      response,

      // save,
    }
  },
})

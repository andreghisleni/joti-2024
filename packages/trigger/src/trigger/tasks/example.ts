import { logger, task } from '@trigger.dev/sdk/v3'

import { trpcClient } from '../../client'

export const helloWorldTask = task({
  id: 'hello-world',
  maxDuration: 300, // 5 minutes
  run: async (payload: any, { ctx }) => { // eslint-disable-line
    logger.log('Hello, world!', { payload, ctx })

    // await wait.for({ seconds: 5 })

    // const members = await fetch('/api/trpc/getMembers')

    // const membersJson = await members.json()

    const getMember = await trpcClient.getMemberByRegister.query({
      register: '1374722',
    })

    logger.log('getMember', getMember)

    return {
      message: 'Hello, world!',

      getMember,

      // membersJson,
      ctx,
    }
  },
})

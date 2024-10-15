import { logger, task } from '@trigger.dev/sdk/v3'

export const helloWorldTask = task({
  id: 'hello-world',
  maxDuration: 300, // 5 minutes
  run: async (payload: any, { ctx }) => { // eslint-disable-line
    logger.log('Hello, world!', { payload, ctx })

    // await wait.for({ seconds: 5 })

    // const members = await fetch('/api/trpc/getMembers')

    // const membersJson = await members.json()

    return {
      message: 'Hello, world!',

      // membersJson,
      ctx,
    }
  },
})

import { tasks } from '@trigger.dev/sdk/v3'

import type { helloWorldTask } from './tasks/example'

export const helloWorldTrigger = tasks.trigger<typeof helloWorldTask>

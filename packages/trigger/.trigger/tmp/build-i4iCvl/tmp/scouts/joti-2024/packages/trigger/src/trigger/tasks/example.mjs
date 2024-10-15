import {
  logger,
  task
} from "../../../../../../../../chunk-7GF77YGS.mjs";
import {
  init_esm
} from "../../../../../../../../chunk-NYJOMUGH.mjs";

// src/trigger/tasks/example.ts
init_esm();
var helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  // 5 minutes
  run: async (payload, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });
    return {
      message: "Hello, world!",
      // membersJson,
      ctx
    };
  }
});
export {
  helloWorldTask
};
//# sourceMappingURL=example.mjs.map

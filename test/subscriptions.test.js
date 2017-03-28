import { app, h } from "../src"

test("subscriptions run sequentially on load", () => {
  app({
    model: 1,
    actions: {
      step: model => model + 1
    },
    subscriptions: [
      (_, actions) => actions.step(),
      (_, actions) => actions.step(),
      model => expect(model).toBe(3)
    ]
  })
})

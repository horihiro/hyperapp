import { app, h } from "../src"

test("DOMContentLoaded", done => {
  Object.defineProperty(document, "readyState", {
    writable: true
  })

  window.document.readyState = "loading"

  app({
    model: "foo",
    subscriptions: [
      model => {
        expect(model).toEqual("foo")
        done()
      }
    ]
  })

  window.document.readyState = "complete"

  const event = document.createEvent("Event")
  event.initEvent("DOMContentLoaded", true, true)
  window.document.dispatchEvent(event)
})

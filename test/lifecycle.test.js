import { app, h } from "../src"

test("onCreate", done => {
  app({
    model: 1,
    view: model => h("div", {
      onCreate: e => {
        expect(model).toBe(1)
        done()
      }
    })
  })
})

test("onUpdate", done => {
  app({
    model: 1,
    view: model => h("div", {
      onUpdate: e => {
        expect(model).toBe(2)
        done()
      }
    }),
    actions: {
      add: model => model + 1
    },
    subscriptions: [
      (_, actions) => actions.add()
    ]
  })
})

test("onRemove", done => {
  const treeA = h("ul", {},
    h("li", {}, "foo"),
    h("li", {
      onRemove: _ => {
        done()
      }
    }, "bar"))

  const treeB = h("ul", {}, h("li", {}, "foo"))

  app({
    model: true,
    view: _ => _ ? treeA : treeB,
    actions: {
      toggle: model => !model
    },
    subscriptions: [
      (_, actions) => actions.toggle()
    ]
  })
})

import { app, h } from "../src"

test("onAction/onUpdate/onRender", done => {
  app({
    model: "foo",
    view: model => h("div", {}, model),
    actions: {
      set: (_, data) => data
    },
    subscriptions: [
      (_, actions) => actions.set("bar")
    ],
    hooks: {
      onAction: (action, data) => {
        expect(action).toBe("set")
        expect(data).toBe("bar")
      },
      onUpdate: (oldModel, newModel, data) => {
        expect(oldModel).toBe("foo")
        expect(newModel).toBe("bar")
        expect(data).toBe("bar")
      },
      onRender: (model, view) => {
        if (model === "foo") {
          expect(view("bogus")).toEqual({
            tag: "div",
            data: {},
            children: ["bogus"]
          })

          return view

        } else {
          expect(model).toBe("bar")
          done()

          return view
        }
      }
    }
  })
})

test("onAction and nested actions", done => {
  app({
    model: "foo",
    actions: {
      foo: {
        bar: {
          baz: {
            set: (_, data) => data
          }
        }
      }
    },
    hooks: {
      onAction: (name, data) => {
        expect(name).toBe("foo.bar.baz.set")
        expect(data).toBe("baz")
        done()
      }
    },
    subscriptions: [
      (_, actions) => actions.foo.bar.baz.set("baz")
    ]
  })
})

test("onError", done => {
  app({
    hooks: {
      onError: err => {
        expect(err).toBe("foo")
        done()
      }
    },
    subscriptions: [
      (model, actions, error) => {
        error("foo")
      }
    ]
  })
})

test("throw without onError", () => {
  app({
    subscriptions: [
      (model, actions, error) => {
        try {
          error("foo")
        } catch (err) {
          expect(err).toBe("foo")
        }
      }
    ]
  })
})

test("allow multiple listeners on the same hook", () => {
  let count = 0

  const PluginA = _ => ({
    hooks: {
      onAction: (action, data) => {
        expect(action).toBe("foo")
        expect(data).toBe("bar")
        expect(++count).toBe(2)
      },
      onUpdate: (oldModel, newModel) => {
        expect(oldModel).toBe("foo")
        expect(newModel).toBe("foobar")
        expect(++count).toBe(5)
      }
    }
  })

  const PluginB = _ => ({
    hooks: {
      onAction: (action, data) => {
        expect(action).toBe("foo")
        expect(data).toBe("bar")
        expect(++count).toBe(3)
      },
      onUpdate: (oldModel, newModel) => {
        expect(oldModel).toBe("foo")
        expect(newModel).toBe("foobar")
        expect(++count).toBe(6)
      }
    }
  })

  app({
    model: "foo",
    plugins: [PluginA, PluginB],
    actions: {
      foo: (model, data) => model + data
    },
    hooks: {
      onAction: (action, data) => {
        expect(action).toBe("foo")
        expect(data).toBe("bar")
        expect(++count).toBe(1)
      },
      onUpdate: (oldModel, newModel) => {
        expect(oldModel).toBe("foo")
        expect(newModel).toBe("foobar")
        expect(++count).toBe(4)
      }
    },
    subscriptions: [
      (_, actions) => actions.foo("bar")
    ]
  })
})

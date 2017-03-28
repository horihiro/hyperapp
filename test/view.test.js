import { app, h } from "../src"
import { expectHTMLToBe } from "./util"

beforeEach(() => document.body.innerHTML = "")

test("inline styles", () => {
  app({
    view: model => h("div", {
      id: "foo",
      style: {
        backgroundColor: "red"
      }
    }, "foo")
  })

  expectHTMLToBe(`
    <div id="foo" style="background-color: red;">
      foo
    </div>
  `)
})

test("won't crash if data is null/undefined", () => {
  app({
    view: model => h("div", null, [
      h("div", undefined, "foo")
    ])
  })

  expectHTMLToBe(`
    <div>
      <div>
        foo
      </div>
    </div>
  `)
})

test("toggle class attributes", () => {
  app({
    model: true,
    view: model => h("div", model ? { class: "foo" } : {}, "bar"),
    actions: {
      toggle: model => !model
    },
    subscriptions: [
      (_, actions) => {
        expectHTMLToBe(`
          <div class="foo">
            bar
          </div>
        `)

        actions.toggle()

        expectHTMLToBe(`
          <div>
            bar
          </div>
        `)
      }
    ]
  })
})

test("update/remove element data", () => {
  app({
    model: false,
    view: model => h("div", model
      ?
      {
        id: "xuuq",
        foo: true,
        style: {
          width: "100px",
          height: "200px"
        }
      }
      :
      {
        id: "quux",
        class: "foo",
        style: {
          color: "red",
          height: "100px"
        },
        foo: true,
        baz: false
      }, "bar"
    ),
    actions: {
      toggle: model => !model
    },
    subscriptions: [
      (_, actions) => {
        expectHTMLToBe(`
          <div id="quux" class="foo" style="color: red; height: 100px;" foo="true">
            bar
          </div>
        `)

        actions.toggle()

        expectHTMLToBe(`
          <div id="xuuq" style="height: 200px; width: 100px;" foo="true">
            bar
          </div>
        `)
      }
    ]
  })
})

test("keep selectionStart/selectionEnd props on text inputs after update", () => {
  app({
    model: "foo",
    actions: {
      setText: model => "bar"
    },
    view: model => h("input", { id: "foo", value: model }),
    subscriptions: [
      (_, actions) => {
        const input = document.getElementById("foo")

        expect(input.selectionStart).toBe(0)
        expect(input.selectionEnd).toBe(0)

        input.setSelectionRange(2, 2)

        actions.setText()

        expect(input.selectionStart).toBe(2)
        expect(input.selectionEnd).toBe(2)
      }
    ]
  })
})

test("remove old node/s if missing in the new tree", () => {
  app({
    model: true,
    actions: {
      toggle: model => !model
    },
    view: model => model
      ? h("div", {}, h("h1", {}, "foo"), h("h2", {}, "bar"))
      : h("div", {}, h("h1", {}, "foo")),
    subscriptions: [(_, actions) => actions.toggle()]
  })

  expectHTMLToBe(`
    <div>
      <h1>foo</h1>
    </div>
  `)
})

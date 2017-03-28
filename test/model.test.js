import { app, h } from "../src"
import { expectHTMLToBe } from "./util"

beforeEach(() => document.body.innerHTML = "")

test("render a model", () => {
  app({
    model: "foo",
    view: model => h("div", {}, model)
  })

  expectHTMLToBe(`
    <div>
      foo
    </div>
  `)
})

test("render a model with a loop", () => {
  app({
    model: ["foo", "bar", "baz"],
    view: model => h("ul", {}, model.map(i => h("li", {}, i)))
  })

  expectHTMLToBe(`
    <ul>
      <li>foo</li>
      <li>bar</li>
      <li>baz</li>
    </ul>
  `)
})

test("render an svg element", () => {
  app({
    view: _ => h("svg", { id: "foo" }, "bar")
  })

  const elm = document.getElementById("foo")
  expect(elm.namespaceURI).toBe("http://www.w3.org/2000/svg")
})

test("render svg elements recursively", () => {
  const SVG_NS = "http://www.w3.org/2000/svg"

  app({
    view: _ => h("div", {}, [
      h("p", { id: "foo" }, "foo"),
      h("svg", { id: "bar" }, [
        h("quux", {}, [
          h("beep", {}, [
            h("ping", {}),
            h("pong", {})
          ]),
          h("bop", {}),
          h("boop", {}, [
            h("ping", {}),
            h("pong", {})
          ])
        ]),
        h("xuuq", {}, [
          h("beep", {}),
          h("bop", {}, [
            h("ping", {}),
            h("pong", {})
          ]),
          h("boop", {})
        ])
      ]),
      h("p", { id: "baz" }, "baz")
    ])
  })

  expect(document.getElementById("foo").namespaceURI).not.toBe(SVG_NS)
  expect(document.getElementById("baz").namespaceURI).not.toBe(SVG_NS)

  const svg = document.getElementById("bar")
  expect(svg.namespaceURI).toBe(SVG_NS)
  expectChildren(svg)

  function expectChildren(svgElement) {
    Array.from(svgElement.childNodes).forEach(node =>
      expectChildren(node, expect(node.namespaceURI).toBe(SVG_NS)))
  }
})

test("render conditionally / ignores bool/null children", () => {
  app({
    view: _ => h("div", {},
      h("h1", {}, true),
      h("h2", {}, false),
      h("h3", {}, null)
    )
  })

  expectHTMLToBe(`
    <div>
      <h1></h1>
      <h2></h2>
      <h3></h3>
    </div>
  `)
})

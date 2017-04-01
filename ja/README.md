# [hyperapp](https://hyperapp.glitch.me)

[![Travis CI](https://img.shields.io/travis/hyperapp/hyperapp/master.svg)](https://travis-ci.org/hyperapp/hyperapp)[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/hyperapp/master.svg)](https://codecov.io/gh/hyperapp/hyperapp)[![CDNJS](https://img.shields.io/cdnjs/v/hyperapp.svg?colorB=ff69b4)](https://cdnjs.com/libraries/hyperapp)[![npm](https://img.shields.io/npm/v/hyperapp.svg?colorB=ff69b4)](https://www.npmjs.org/package/hyperapp)[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

HyperApp は フロントエンドアプリケーション構築のためのJavaScript ライブラリです。 

- **宣言型**: HyperApp は [Elm Architecture](https://guide.elm-lang.org/architecture/)に基づいて設計されています。 関数型パラダイムを使ってスケーラブルなブラウザベースのアプリケーションを作れます。新たな言語を身に着ける必要がありません。
- **ステートレスなコンポーネント**: マイクロコンポーネントを積み上げることで、複雑なユーザインターフェースも構築できます。ステートレスなコンポーネントは、ふれーむわーくひいぞんで、再利用可能で、デバッグも容易です。
- **「バッテリー同梱」**:革新的なことに HyperApp は Elmのようなステート管理や仮想DOMエンジンを持ちながら、わずか`1kb`のサイズで、依存性もありません

[HyperAppを始めてみよう](https://github.com/hyperapp/hyperapp/wiki/Getting-Started).

## Hello World

[CodePen](http://codepen.io/jbucaran/pen/Qdwpxy?editors=0010) · [JSFiddle](https://jsfiddle.net/hyperapp/pwk0cp9u/)

```jsx
app({
  model: "Hello World",
  view: model => <h1 data-segment-id="106703">{model}</h1>
})
```

他の例は[こちら](https://hyperapp.glitch.me)。

## Issues

バグと無縁のソフトウェアはありません。もしバグかどうかわからない場合は、[issueを投稿](https://github.com/hyperapp/hyperapp/issues)してください。 質問、フィードバック、リクエストも歓迎です。

## ドキュメント

[Wiki](https://github.com/hyperapp/hyperapp/wiki)を参照。

## コミュニティ

- [Slack](https://hyperappjs.herokuapp.com)
- [/r/hyperapp](https://www.reddit.com/r/hyperapp)
- [Twitter](https://twitter.com/hyperappjs)

## ライセンス

HyperApp は[MITライセンス](LICENSE)にて公開しています。

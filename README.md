# Qiita記事
# はじめてのWebpack 
#js #webpack  #記事

## はじめに
この記事は初心者でもwebpackを用いて簡単な環境を構築できるように書いた記事です。
中級者以上でしたらおそらく物足りない記事になるかもしれませんが、初心者には十分な環境を整えることができると思います。

### 今回用いた環境
* macOS Sierra 10.12.2
* Node.js v6.9.1
入ってるかわからない人は `$ node -v`と打ってみてください。
`v6.9.1`などバージョンが表示されたらおっけーです。

node.jsをまだインストールしていない人は下記のリンク等などを見てインストールしてみてください。
 [5分で終了。node.jsの環境構築が拍子抜けするほど簡単だったのでサンプルプログラム付きでまとめてみました【Mac編】](http://www.tettori.net/post/293/)


## 準備
それでは、環境を作っていく流れをまずはざっくりと説明していきます。
ターミナルを開いて準備しましょう。

1. まずはディレクトリ作成。
普通に新しいフォルダーを作るのもok
`$ mkdir ディレクトリ名` で作るのもok
ちなみにmkdirはmake directoryの略だそうです。

2. 先ほど作成したディレクトリに移動してpackage.jsonの作成
ディレクトリの移動は`$ cd ディレクトリ名`でできます。
ちなみにcdはchange directoryの略だそうです。
package.jsonを作成するコマンドは
`$ npm init`
いろいろ表示されるけどすべてenterで大丈夫です。


## webpackを導入
### webpackとは
分かりやすい記事があったので引用しました。
>  Webpackとは、Webコンテンツを構成するファイルを「モジュール」という単位で取り扱い、最適な形に作り変える為のツール ( [JS開発で人気のWebpackとは!? 5分でわかる入門記事 - ICS MEDIA](https://ics.media/entry/12140) )
> 
> WebApp に必要なリソースの依存関係を解決し、アセット（配布物）を生成するビルドツール（要するにコンパイラ）( [webpack で始めるイマドキのフロントエンド開発 - Qiita](http://qiita.com/yosisa/items/61cfd3ede598e194813b) )
> 
とっても簡単に言えば、部品さえ作っておけばうまく適切な形に組み立ててくれるのがwebpackですかね。

### インストールの手順

パッケージをインストールするときは
グローバル
  `$ npm install -g パッケージ`
  ( permissionエラーでたら権限がないのでnpmの前にsudoつける)
現在のディレクトリ
  `$ npm install --save-dev パッケージ`
とコマンドを打ってインストールします。

今回はディレクトリにwebpackをインストールするので
  `$ npm install --save-dev webpack`
と打ちましょう。
そうすると、node_modulesというフォルダが出来上がります。
package.jsonを見ると
```JSON
"devDependencies": {
    "webpack": "^2.2.1"
  }
}
```
こんなのが増えてますね。

### webpack.config.jsの作成
まずはこんな感じにファイルを生成していきましょう。
webpack-demo
│  index.html
│  package.json
│  webpack.config.js
└─ src
  ─test.js
└─ node_modules

webpack.config.jsにプログラムを書いてみましょう。
webpack とは、コマンドを打っただけでコンパイルするように設定するファイルです。
loaderの中はあとからどんどん追加していきますので、まずはここまで。
```js
module.exports = {
  entry: __dirname + "/src/test.js", //ビルドするファイル
  output: {
    path: __dirname +'/dist', //ビルドしたファイルを吐き出す場所
    filename: 'bundle.js' //ビルドした後のファイル名
  },
  module: {
    loaders: [
      //loader
    ]
  }
};
```

### webpack-dev-serverをインストール
ローカルのサーバーをwebpackで立ち上げることができます。
インストール
`$ npm install --save-dev webpack-dev-server`
サーバーを立ち上げる
`$ webpack-dev-server`

なお、package.jsonのscriptの中を書き換えることでコマンドを省略することが可能です。
``` json
  "scripts": {
    "start": "webpack-dev-server"
  }
```

この場合は、`$ npm start` とコマンドを打つと `$ webpack-dev-server` を起動することができるようになります。install, start, testなどデフォルトのタスクの場合は runはいらない様子。


## babelを使ってES6をコンパイルする。
### babelとは
> babelとは次世代のJavaScriptの標準機能を、ブラウザのサポートを待たずに使えるようにするNode.js製のツール。 [Babelの手ほどき - Babelとは | CodeGrid](https://app.codegrid.net/entry/babel-1#toc-7)

### babelのパッケージをインストール
今回は、babel-core、babel-loader、babel-preset-es2015、babel-preset-stage-0 babel-polypillのプラグインをインストールします。

`npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 babel-polyfill` 
このようにパッケージは連続して書いてけば全部一気にインストールできます。

* babel-core
Babelのコンパイラのコア

* babel-loader (webpack.config.jsにコンパイラとして指定)
webpackでES2015構文で書いたファイルをトランスパイルするのに必要なローダー

* babel-preset-es2015
es2015をコンパイルしてくれる。

* babel-preset-stage-0
ステージを指定するもの。0は企画段階からの文法もかけちゃう。

* babel-polyfill
ES6の新しい機能などを利用するためのES5向けのライブラリ。
jsにインポートして使う。プリセットではない。

package.jsonをみると
```
"devDependencies": {
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-stage-0": "^6.22.0",
    "webpack": "^2.2.1"
  }

```
しっかり増えてますね。

### webpack.config.jsを書き換えてbabelでコンパイルできるようにする。

次は先ほど無視したlorderの中に追加していきます。

```js
loaders: [
      // {
      //   test: ビルド対象のファイルを指定
      //   includes: ビルド対象に含めるファイルを指定
      //   exclude: ビルド対象に除外するファイルを指定
      //   loader: loaderを指定
      //   query: loader に渡したいクエリパラメータを指定
      // },
      {
       test: /\.js$/,
       loader: 'babel-loader',
       exclude: /node_modules/,
       query://loaderに渡したいクエリパラメータを指定します
        {
          presets: ['es2015','stage-0']
        }
      }
    ]
```

これで、webpackとbabelの環境設定はokです。
仮にindex.htmlとtest.jsにES2015(ES6)で何か書いて見ましょう。

index.html 
```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="dist/bundle.js" charset="utf-8"></script>
  </body>
</html>
```

test.js (ES2015であればなんでもok !)
```js
import 'babel-polyfill'

let num = 1;
console.log(num); 
```

bundle.jsを確認してみて、let -> var になってたらコンパイルされています。


## scssをコンパイルする
もともとwebpack自体が、基本的に全てをjavascriptとして扱ってしまうため、cssを扱うことは少々難しく感じられた。
cssをwebpackで扱うことに関してわかりやすいと感じたのはこの記事なので、ぜひチェックを。
[なんとなくで理解しないWebpackのCSS周辺 - Qiita](http://qiita.com/inuscript/items/0574ab1ef358fecb55b9)

(今後追記していきます。)

## vue.js
今回、vue.jsを使うためにwebpackを導入したので、vue.jsもちらりと。
vue.jsは下の記事を参考にしました。
[参考](http://shigekitakeguchi.github.io/2016/08/10/1.html)
 [Introduction · GitBook](https://router.vuejs.org/ja/) 

### vue-router 2
* vue-routerとは
シングルアプリケーションの構築をするときに、Vue.jsのコンポーネントを使ってアプリケーションを構成しており、そのコンポーネントとルートをマッピングさせてvue-routerにどこでレンダリングするか知らせるものである。
    
## vue-cli
* vue-cliとは
シングルページアプリケーションを作成するのに必須なbabelやwebpackなど全てをインストールしてくれるフロントエンドのフレームワーク。オフィシャル。初心者のうちはあまり使わない方が良い。

* インストール
[インストール - Vue.js](https://jp.vuejs.org/v2/guide/installation.html)
`npm install -g vue-cli`

### Vuex
`npm i —save vuex@^2.0.0-rc.5`

### vue-loader
`npm install —save vue-loader`


### はまったこと

* 変更しても同じエラーが出続けるときに、npm自体がキャッシュを持っていることがある。
そのときは以下のコマンドを打つと良い。
`$npm cache clean`


* まさかのpackage.jsonでおこられました。笑
`Sorry, name can no longer contain capital letters.`
…名前に大文字を入れるなとおこられました、初歩的。

### 参考記事
 [webpack.config.jsの読み方、書き方](http://dackdive.hateblo.jp/entry/2016/04/13/123000)
[webpack で始めるイマドキのフロントエンド開発 - Qiita](http://qiita.com/yosisa/items/61cfd3ede598e194813b)
[step by stepで始めるweb pack - Qiita](http://qiita.com/howdy39/items/48d85c430f90a21075cd)
[JS開発で人気のWebpackとは!? 5分でわかる入門記事 - ICS MEDIA](https://ics.media/entry/12140)
[webpackを使った開発の効率化方法やloaderの種類をTLで話してきました【スライド付き】 | 株式会社LIG](https://liginc.co.jp/web/js/149577)

 
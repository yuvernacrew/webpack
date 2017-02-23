// const precss = require('precss');
// const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  // jsをコンパイル
  {
    entry: __dirname + "/src/test.js",//ビルドするファイル
    output: {
      path: __dirname + '/dist', //ビルドしたファイルを吐き出す場所
      filename: 'bundle.js' //ビルドした後のファイル名
    },
    module: {
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
         query:
          {
            presets: ['es2015','stage-0']
          }
        },
      ]
    },

  }
  // css
  {
    entry: __dirname + "/src/style.js",//ここにimportしてく
    output: {
      path: __dirname + '/dist', //ビルドしたファイルを吐き出す場所
      filename: '[name].css'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
          test: /\.scss$/,
          // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'sass-loader' })
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'sass-loader' })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
    ]
  }
];

//   {
//     entry: __dirname + "/src/style.scss",//ここにimportしてく
//     output: {
//       path: __dirname + '/dist', //ビルドしたファイルを吐き出す場所
//     filename: '[name].css'
//     },
//     module: {
//       loaders: [
//         {
//           test: /\.sass$/,
//           loaders: ['style', 'css', 'postcss?parser=sugarss'],
//         },
//       ],
//     },
//     postcss: [autoprefixer({ browsers: ['IE 9', 'IE 10', 'IE 11', 'last 2 versions'] }), precss],
// }
//
// ];


//
// {
//   test: /\.(jpg|png)$/,
//   loaders: 'url-loader'
// }

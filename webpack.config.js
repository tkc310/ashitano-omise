const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development';

  const pagesHtmlPlugins = [
    { name: 'index', type: 'single' },
    { name: 'tmp_detail', type: 'single' },
    { name: 'shops', type: 'collection', id: 1 },
  ].map(page => {
    const {
      type,
      name,
      id = null
    } = page;

    // TODO: srcはjson化する
    const src =  type === 'single' ? name : `${name}/${id}/index`;
    const dist = type === 'single' ? name : `${name}/${id}/index`;

    return new HtmlWebpackPlugin({
      template: `./src/${src}.ejs`,
      filename: `./${dist}.html`,
    });
  });

  const tsEmtries = glob.sync('./src/assets/ts/**/*.*')
    .map(file => {
      return file;
    });

  const scssEmtries = glob.sync('./src/assets/scss/**/*.*')
    .map(file => {
      return file;
    });

  const imagesEntries = glob.sync('./src/assets/images/**/*.*')
    .map(file => {
      return file;
    });

  let plugins = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ].concat(pagesHtmlPlugins);

  let devServer = {};

  if (IS_DEVELOPMENT) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // build cache
      new HardSourceWebpackPlugin({
        info: {
          mode: 'none',
          level: 'debug',
        },
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /mini-css-extract-plugin[\\/]dist[\\/]loader/ },
      ]),
    ]);

    devServer = {
      contentBase: path.join(__dirname, 'dist'),
      host: '0.0.0.0',
      port: 1234,
      inline: true,
      hot: true,
      progress: true,
      disableHostCheck: true,
      historyApiFallback: true,
      open: false,
    };
  }

  return {
    mode: argv.mode,

    entry: tsEmtries
      .concat(imagesEntries)
      .concat(scssEmtries),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: './assets/js/app.js',
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve('./dist'),
                hmr: true,
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(otf$|woff$|woff2$|ttf$|eot$|svg$|png$|jpg$|gif$)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (name, _path) => {
                return './assets/images/' + name
              },
              publicPath: (name, _path) => {
                return './assets/images/' + name
              }
            }
          },
        },
        {
          test: /\.ejs$/,
          exclude: /(node_modules)/,
          loader: 'compile-ejs-loader',
          // https://github.com/mde/ejs
          options: {
            'htmlmin': true,
            'htmlminOptions': {
              removeComments: true
            }
          }
        },
      ]
    },

    resolve: {
      extensions: ['.json', '.vue', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/assets/'),
        '@ts': path.resolve(__dirname, 'src/assets/ts/'),
        '@scss': path.resolve(__dirname, 'src/assets/scss/'),
        vue: 'vue/dist/vue.js',
      }
    },

    performance: {
      hints: false
    },

    devtool: IS_DEVELOPMENT ? 'cheap-eval-source-map' : false,

    optimization: {
      splitChunks: {
        // cacheGroups内にバンドルの設定を複数記述できる
        cacheGroups: {
          // 今回はvendorだが、任意の名前で問題ない
          vendor: {
            // node_modules配下のモジュールをバンドル対象とする
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          }
        }
      }
    },

    devServer,

    plugins
  };
};
